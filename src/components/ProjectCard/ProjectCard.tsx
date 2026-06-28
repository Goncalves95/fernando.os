"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { forwardRef, useState } from "react";
import { FiExternalLink, FiGithub, FiStar } from "react-icons/fi";
import { CATEGORY_META, STATUS_META } from "@/lib/project-meta";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const SOURCE_BADGE: Record<Project["source"], { label: string; className: string }> = {
  github: { label: "GitHub", className: "bg-sky-500/15 text-sky-400 border-sky-500/30" },
  manual: { label: "Featured", className: "bg-accent/15 text-accent border-accent/30" },
};

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(function ProjectCard(
  { project, onSelect },
  ref,
) {
  const [imageFailed, setImageFailed] = useState(false);
  const categoryMeta = CATEGORY_META[project.category];
  const statusMeta = STATUS_META[project.status];
  const sourceBadge = SOURCE_BADGE[project.source];
  const CategoryIcon = categoryMeta.icon;
  const showImage = Boolean(project.imageUrl) && !imageFailed;
  const visibleTechs = project.techs.slice(0, 4);
  const remainingTechs = project.techs.length - visibleTechs.length;

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(project);
    }
  }

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-surface-border bg-surface-panel text-left transition-colors hover:border-accent hover:shadow-glow"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        {showImage && (
          <Image
            src={project.imageUrl as string}
            alt={project.displayName}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}

        {!showImage && (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${categoryMeta.gradient}`}
          >
            <CategoryIcon className="h-10 w-10 text-zinc-500/60" />
          </div>
        )}

        <span
          className={`absolute left-2 top-2 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${sourceBadge.className}`}
        >
          {sourceBadge.label}
        </span>

        {project.featured && (
          <span
            title="Featured project"
            className="absolute right-2 top-2 flex items-center justify-center rounded-full border border-accent/40 bg-surface/80 p-1 text-accent"
          >
            <FiStar className="h-3 w-3" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-base text-zinc-100 group-hover:text-accent">
            {project.displayName}
          </h3>
          <span
            title={statusMeta.label}
            className="mt-1.5 flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-zinc-500"
          >
            <span className={`h-2 w-2 rounded-full ${statusMeta.dotClass}`} />
          </span>
        </div>

        <p className="mt-2 text-sm text-zinc-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {visibleTechs.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-[11px] text-zinc-400"
            >
              {tech}
            </span>
          ))}
          {remainingTechs > 0 && (
            <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-[11px] text-zinc-500">
              +{remainingTechs}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View repository"
                onClick={(event) => event.stopPropagation()}
                className="text-zinc-500 hover:text-accent"
              >
                <FiGithub className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live site"
                onClick={(event) => event.stopPropagation()}
                className="text-zinc-500 hover:text-accent"
              >
                <FiExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <span className="font-mono text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
            view details →
          </span>
        </div>
      </div>
    </motion.div>
  );
});
