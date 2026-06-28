import { fetchGitHubRepos } from "@/lib/github";
import { getManualProjects, mergeProjects } from "@/lib/projects";
import { ProjectsSection } from "./ProjectsSection";

export async function ProjectsSectionServer() {
  // Manual projects are curated and always shown; GitHub-sourced ones are a
  // bonus, so a GitHub API outage degrades to manual-only instead of an error.
  const githubRepos = await fetchGitHubRepos().catch(() => []);
  const projects = mergeProjects(getManualProjects(), githubRepos);

  return <ProjectsSection projects={projects} />;
}
