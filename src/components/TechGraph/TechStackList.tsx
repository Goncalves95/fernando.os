"use client";

import { useState } from "react";
import { featuredProjects } from "@/data/featured-projects";
import { CATEGORY_META, findProjectsUsingTech, techStackNodes } from "./tech-stack-data";

export function TechStackList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = Object.entries(CATEGORY_META) as Array<
    [keyof typeof CATEGORY_META, (typeof CATEGORY_META)[keyof typeof CATEGORY_META]]
  >;

  return (
    <div className="scrollbar-thin h-full space-y-5 overflow-y-auto pr-1">
      {categories.map(([category, meta]) => (
        <div key={category}>
          <h3
            className="font-mono text-xs uppercase tracking-wide"
            style={{ color: meta.color }}
          >
            {meta.label}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {techStackNodes
              .filter((node) => node.category === category)
              .map((node) => {
                const isExpanded = expandedId === node.id;
                const usedIn = findProjectsUsingTech(node.label, featuredProjects);

                return (
                  <button
                    key={node.id}
                    onClick={() => setExpandedId(isExpanded ? null : node.id)}
                    className="rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors"
                    style={{
                      borderColor: isExpanded ? meta.color : "#2a2a2a",
                      color: isExpanded ? meta.color : "#a1a1aa",
                      backgroundColor: isExpanded ? `${meta.color}1a` : "transparent",
                    }}
                  >
                    {node.label}
                    {isExpanded && (
                      <span className="ml-1.5 text-zinc-500">
                        · {usedIn.length > 0 ? usedIn.map((p) => p.displayName).join(", ") : "—"}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
