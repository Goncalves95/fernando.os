import { Suspense } from "react";
import { BootGate, Dashboard } from "@/components/Dashboard";
import { ContactSectionServer } from "@/components/ContactSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GitHubStatsServer, GitHubStatsSkeleton } from "@/components/GitHubStats";
import { ProjectsSectionServer, ProjectsSectionSkeleton } from "@/components/ProjectsSection";

function GitHubStatsError() {
  return (
    <p className="font-mono text-sm text-zinc-500">
      GitHub data is unavailable right now. Try refreshing in a bit.
    </p>
  );
}

function ProjectsSectionError() {
  return (
    <p className="font-mono text-sm text-zinc-500">
      Projects are unavailable right now. Try refreshing in a bit.
    </p>
  );
}

export default function HomePage() {
  return (
    <BootGate>
      <Dashboard
        projectsSlot={
          <ErrorBoundary fallback={<ProjectsSectionError />}>
            <Suspense fallback={<ProjectsSectionSkeleton />}>
              <ProjectsSectionServer />
            </Suspense>
          </ErrorBoundary>
        }
        githubStatsSlot={
          <ErrorBoundary fallback={<GitHubStatsError />}>
            <Suspense fallback={<GitHubStatsSkeleton />}>
              <GitHubStatsServer />
            </Suspense>
          </ErrorBoundary>
        }
        contactSlot={<ContactSectionServer />}
      />
    </BootGate>
  );
}
