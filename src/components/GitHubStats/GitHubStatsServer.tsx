import { fetchGitHubActivity, fetchGitHubRepos, fetchGitHubUser } from "@/lib/github";
import { GitHubStats } from "./GitHubStats";

export async function GitHubStatsServer() {
  const [user, repos, activity] = await Promise.all([
    fetchGitHubUser(),
    fetchGitHubRepos(),
    fetchGitHubActivity(),
  ]);

  return <GitHubStats user={user} repos={repos} activity={activity} />;
}
