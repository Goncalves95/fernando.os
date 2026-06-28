"use client";

import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { CATEGORY_FILTERS } from "@/lib/project-meta";
import { Project, ProjectCategory } from "@/types";

const GITHUB_PROFILE_URL = "https://github.com/Goncalves95";

type SourceMode = "all" | "featured";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | "all">("all");
  const [sourceMode, setSourceMode] = useState<SourceMode>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => categoryFilter === "all" || project.category === categoryFilter)
      .filter((project) => sourceMode === "all" || project.featured)
      .sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, categoryFilter, sourceMode]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_FILTERS.map((filter) => {
            const isActive = categoryFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setCategoryFilter(filter.value)}
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                  isActive
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-surface-border text-zinc-400 hover:border-accent/40 hover:text-zinc-200"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="flex shrink-0 rounded-full border border-surface-border p-0.5 font-mono text-xs">
          <button
            onClick={() => setSourceMode("all")}
            className={`rounded-full px-3 py-1 transition-colors ${
              sourceMode === "all" ? "bg-accent text-black" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            GitHub Projects
          </button>
          <button
            onClick={() => setSourceMode("featured")}
            className={`rounded-full px-3 py-1 transition-colors ${
              sourceMode === "featured"
                ? "bg-accent text-black"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Featured Only
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <p className="mt-6 font-mono text-sm text-zinc-500">
          No projects match this filter yet.
        </p>
      )}

      <div className="mt-6 flex justify-center border-t border-surface-border pt-5">
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-sm text-accent hover:underline"
        >
          View all repositories
          <FiArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
