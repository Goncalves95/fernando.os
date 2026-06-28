export type ProjectCategory = "fullstack" | "ml" | "mobile" | "ecommerce" | "saas";

export type ProjectStatus = "live" | "development" | "archived";

export type ProjectSource = "github" | "manual";

export interface Project {
  id: string;
  name: string;
  displayName: string;
  description: string;
  longDescription?: string;
  techs: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  images?: string[];
  featured: boolean;
  source: ProjectSource;
  category: ProjectCategory;
  status: ProjectStatus;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

export interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface TerminalCommandResult {
  output: string[];
  clear?: boolean;
}

export type TerminalCommandHandler = (args: string[]) => TerminalCommandResult | Promise<TerminalCommandResult>;

export interface TerminalCommand {
  name: string;
  description: string;
  handler: TerminalCommandHandler;
}

export interface TerminalHistoryEntry {
  id: string;
  input: string;
  output: string[];
}

export type DashboardWindowId =
  | "home"
  | "about"
  | "projects"
  | "skills"
  | "github-stats"
  | "contact";
