import { GitHubRepo, GitHubUser, Project, ProjectCategory } from "@/types";

const GITHUB_USERNAME = "Goncalves95";
const GITHUB_API = "https://api.github.com";

const ML_HINTS = ["python", "ml", "machine-learning", "xgboost", "mlflow", "data-science"];
const MOBILE_HINTS = ["react-native", "flutter", "android", "ios", "mobile", "kotlin", "swift"];
const ECOMMERCE_HINTS = ["ecommerce", "e-commerce", "shop", "stripe", "checkout"];
const SAAS_HINTS = ["saas", "multi-tenant", "subscription"];

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) return [];

  return res.json();
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return { public_repos: 0, followers: 0, following: 0, created_at: "" };
  }

  return res.json();
}

interface GitHubEvent {
  type: string;
  created_at: string;
  payload?: { commits?: unknown[] };
}

const ACTIVITY_WINDOW_DAYS = 14;

/** Best-effort daily push-commit counts for the last 14 days, oldest first.
 * Returns an empty array if the public events feed is unavailable or empty —
 * callers should treat the sparkline as optional ("if available"). */
export async function fetchGitHubActivity(): Promise<number[]> {
  const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=100`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const events: GitHubEvent[] = await res.json();
  const pushEvents = events.filter((event) => event.type === "PushEvent");

  if (pushEvents.length === 0) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayBuckets = new Array<number>(ACTIVITY_WINDOW_DAYS).fill(0);

  for (const event of pushEvents) {
    const eventDate = new Date(event.created_at);
    eventDate.setHours(0, 0, 0, 0);

    const daysAgo = Math.round((today.getTime() - eventDate.getTime()) / 86_400_000);
    const bucketIndex = ACTIVITY_WINDOW_DAYS - 1 - daysAgo;

    if (bucketIndex >= 0 && bucketIndex < ACTIVITY_WINDOW_DAYS) {
      dayBuckets[bucketIndex] += event.payload?.commits?.length ?? 1;
    }
  }

  return dayBuckets;
}

export function getTopLanguage(repos: GitHubRepo[]): string | null {
  const counts = new Map<string, number>();

  for (const repo of repos) {
    if (!repo.language || repo.fork) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  let topLanguage: string | null = null;
  let topCount = 0;

  for (const [language, count] of counts) {
    if (count > topCount) {
      topLanguage = language;
      topCount = count;
    }
  }

  return topLanguage;
}

function inferCategory(repo: GitHubRepo): ProjectCategory {
  const haystack = [repo.language, ...repo.topics]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.toLowerCase());

  if (haystack.some((value) => ML_HINTS.includes(value))) return "ml";
  if (haystack.some((value) => MOBILE_HINTS.includes(value))) return "mobile";
  if (haystack.some((value) => ECOMMERCE_HINTS.includes(value))) return "ecommerce";
  if (haystack.some((value) => SAAS_HINTS.includes(value))) return "saas";

  return "fullstack";
}

function toDisplayName(repoName: string): string {
  return repoName
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function mapRepoToProject(repo: GitHubRepo): Project {
  return {
    id: `github-${repo.id}`,
    name: repo.name,
    displayName: toDisplayName(repo.name),
    description: repo.description ?? "",
    techs: [repo.language, ...repo.topics].filter((value): value is string => Boolean(value)),
    githubUrl: repo.html_url,
    liveUrl: repo.homepage || undefined,
    featured: false,
    source: "github",
    category: inferCategory(repo),
    status: "live",
  };
}
