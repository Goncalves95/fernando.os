import { featuredProjects } from "@/data/featured-projects";
import { mapRepoToProject } from "@/lib/github";
import { GitHubRepo, Project } from "@/types";

const MAX_GITHUB_PROJECTS = 6;

export function getManualProjects(): Project[] {
  return featuredProjects;
}

export function mergeProjects(
  manualProjects: Project[],
  githubRepos: GitHubRepo[],
  maxGithubProjects = MAX_GITHUB_PROJECTS,
): Project[] {
  const manualNames = new Set(manualProjects.map((project) => project.name.toLowerCase()));

  const githubProjects = githubRepos
    .filter((repo) => !repo.fork)
    .filter((repo) => !manualNames.has(repo.name.toLowerCase()))
    .slice(0, maxGithubProjects)
    .map(mapRepoToProject);

  return [...manualProjects, ...githubProjects];
}
