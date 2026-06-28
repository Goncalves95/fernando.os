import { FiArrowUpRight } from "react-icons/fi";
import { getTopLanguage } from "@/lib/github";
import { GitHubRepo, GitHubUser } from "@/types";
import { CountUp } from "./CountUp";
import { Sparkline } from "./Sparkline";

interface GitHubStatsProps {
  user: GitHubUser;
  repos: GitHubRepo[];
  activity: number[];
}

const GITHUB_PROFILE_URL = "https://github.com/Goncalves95";

export function GitHubStats({ user, repos, activity }: GitHubStatsProps) {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const topLanguage = getTopLanguage(repos);
  const topRepos = [...repos]
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);
  const memberSince = user.created_at ? new Date(user.created_at).getFullYear() : null;

  return (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-sm text-zinc-100">@Goncalves95</p>
        {memberSince && (
          <p className="font-mono text-xs text-zinc-500">on GitHub since {memberSince}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-center font-mono sm:grid-cols-4">
        <StatBlock label="repos" value={<CountUp value={user.public_repos} />} />
        <StatBlock label="followers" value={<CountUp value={user.followers} />} />
        <StatBlock label="stars" value={<CountUp value={totalStars} />} />
        <StatBlock label="top language" value={topLanguage ?? "—"} />
      </div>

      {activity.length > 1 && (
        <div>
          <h3 className="font-mono text-xs uppercase tracking-wide text-zinc-500">
            Commit activity · last {activity.length} days
          </h3>
          <Sparkline data={activity} className="mt-2 h-10 w-full" />
        </div>
      )}

      <div>
        <h3 className="font-mono text-xs uppercase tracking-wide text-zinc-500">
          Top repositories
        </h3>
        <ul className="mt-2 space-y-2">
          {topRepos.map((repo) => (
            <li key={repo.id}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded border border-surface-border px-3 py-2 text-sm hover:border-accent/50"
              >
                <span className="truncate text-zinc-300">{repo.name}</span>
                <span className="shrink-0 font-mono text-xs text-zinc-500">
                  ★ {repo.stargazers_count}
                </span>
              </a>
            </li>
          ))}
          {topRepos.length === 0 && (
            <li className="font-mono text-xs text-zinc-500">No public repositories found.</li>
          )}
        </ul>
      </div>

      <a
        href={GITHUB_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 border-t border-surface-border pt-4 font-mono text-sm text-accent hover:underline"
      >
        View full profile on GitHub
        <FiArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded border border-surface-border bg-surface-panel py-2">
      <p className="truncate px-1 text-lg text-accent">{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-zinc-500">{label}</p>
    </div>
  );
}
