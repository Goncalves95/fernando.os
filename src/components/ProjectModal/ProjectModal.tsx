"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import { CATEGORY_META, STATUS_META } from "@/lib/project-meta";
import { getTechIcon } from "@/lib/tech-icons";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const MARKDOWN_COMPONENTS = {
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-sm leading-relaxed text-zinc-300" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-zinc-100" {...props} />
  ),
  em: (props: React.ComponentProps<"em">) => <em className="text-zinc-200" {...props} />,
  code: (props: React.ComponentProps<"code">) => (
    <code className="rounded bg-surface-panel px-1 py-0.5 font-mono text-xs text-accent" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-300" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="list-decimal space-y-1 pl-5 text-sm text-zinc-300" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-accent hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
  ),
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    setImageIndex(0);
    setFailedImages(new Set());
  }, [project?.id]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const images = project?.images?.length
    ? project.images
    : project?.imageUrl
      ? [project.imageUrl]
      : [];

  const categoryMeta = project ? CATEGORY_META[project.category] : null;
  const statusMeta = project ? STATUS_META[project.status] : null;
  const CategoryIcon = categoryMeta?.icon;
  const currentImage = images[imageIndex];
  const showImage = Boolean(currentImage) && !failedImages.has(currentImage);

  function handleImageError(src: string) {
    setFailedImages((failed) => new Set(failed).add(src));
  }

  function showPrevImage() {
    setImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  }

  function showNextImage() {
    setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  }

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            className="scrollbar-thin max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-surface-border bg-surface-raised shadow-glow"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-surface">
              {showImage ? (
                <Image
                  key={currentImage}
                  src={currentImage}
                  alt={project.displayName}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover"
                  onError={() => handleImageError(currentImage)}
                />
              ) : (
                categoryMeta &&
                CategoryIcon && (
                  <div
                    className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${categoryMeta.gradient}`}
                  >
                    <CategoryIcon className="h-14 w-14 text-zinc-500/60" />
                  </div>
                )
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={showPrevImage}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-zinc-200 hover:bg-black/70"
                  >
                    <FiChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={showNextImage}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-zinc-200 hover:bg-black/70"
                  >
                    <FiChevronRight className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((image, index) => (
                      <span
                        key={image}
                        className={`h-1.5 w-1.5 rounded-full ${
                          index === imageIndex ? "bg-accent" : "bg-zinc-500/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-zinc-200 hover:bg-black/70 hover:text-accent"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-mono text-xl text-accent text-glow">
                    {project.displayName}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">{project.description}</p>
                </div>
                {statusMeta && (
                  <span className="mt-1.5 flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                    <span className={`h-2 w-2 rounded-full ${statusMeta.dotClass}`} />
                    {statusMeta.label}
                  </span>
                )}
              </div>

              {project.longDescription && (
                <div className="mt-5 space-y-2">
                  <ReactMarkdown components={MARKDOWN_COMPONENTS}>
                    {project.longDescription}
                  </ReactMarkdown>
                </div>
              )}

              <div className="mt-5">
                <h3 className="font-mono text-xs uppercase tracking-wide text-zinc-500">
                  Tech stack
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.techs.map((tech) => {
                    const TechIcon = getTechIcon(tech);
                    return (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 rounded-full bg-surface-panel px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                      >
                        {TechIcon && <TechIcon className="h-3 w-3 text-accent" />}
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              {(project.githubUrl || project.liveUrl) && (
                <div className="mt-6 flex gap-3 font-mono text-sm">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded bg-accent px-4 py-2 font-semibold text-black hover:bg-accent-glow"
                    >
                      <FiExternalLink className="h-4 w-4" />
                      Live demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded border border-surface-border px-4 py-2 text-zinc-300 hover:border-accent/50 hover:text-accent"
                    >
                      <FiGithub className="h-4 w-4" />
                      Repository
                    </a>
                  )}
                </div>
              )}

              {!project.githubUrl && !project.liveUrl && (
                <p className="mt-6 font-mono text-xs text-zinc-500">
                  This is a private project — source and live links are not publicly
                  available.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
