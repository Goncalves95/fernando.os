"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useMemo, useState } from "react";
import { featuredProjects } from "@/data/featured-projects";
import { CATEGORY_META, findProjectsUsingTech, getNodePosition, techStackEdges, techStackNodes } from "./tech-stack-data";
import { TechStackList } from "./TechStackList";

const MOBILE_BREAKPOINT_PX = 640;

function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT_PX;
}

export function TechGraph() {
  const [isMobile, setIsMobile] = useState(isMobileViewport);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileViewport());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const connectedIds = useMemo(() => {
    if (!hoveredId) return new Set<string>();

    const ids = new Set<string>();
    for (const edge of techStackEdges) {
      if (edge.source === hoveredId) ids.add(edge.target);
      if (edge.target === hoveredId) ids.add(edge.source);
    }
    return ids;
  }, [hoveredId]);

  const hoveredNode = techStackNodes.find((node) => node.id === hoveredId) ?? null;
  const usedInProjects = hoveredNode
    ? findProjectsUsingTech(hoveredNode.label, featuredProjects)
    : [];

  const nodes: Node[] = useMemo(
    () =>
      techStackNodes.map((node) => {
        const color = CATEGORY_META[node.category].color;
        const isHovered = node.id === hoveredId;
        const isDimmed = hoveredId !== null && !isHovered && !connectedIds.has(node.id);

        return {
          id: node.id,
          position: getNodePosition(node),
          data: { label: node.label },
          style: {
            background: isHovered ? `${color}33` : "#1a1a1a",
            border: `1.5px solid ${color}`,
            borderRadius: 8,
            color: isDimmed ? "#71717a" : "#e4e4e7",
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: 12,
            width: 150,
            padding: "8px 10px",
            opacity: isDimmed ? 0.35 : 1,
            boxShadow: isHovered ? `0 0 14px ${color}66` : "none",
            transition: "opacity 150ms, box-shadow 150ms, background 150ms",
          },
        };
      }),
    [hoveredId, connectedIds],
  );

  const edges: Edge[] = useMemo(
    () =>
      techStackEdges.map((edge) => {
        const isHighlighted = edge.source === hoveredId || edge.target === hoveredId;
        const isDimmed = hoveredId !== null && !isHighlighted;

        return {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          style: {
            stroke: isHighlighted ? "#FF4500" : "#3f3f46",
            strokeWidth: isHighlighted ? 2 : 1,
            opacity: isDimmed ? 0.2 : 0.8,
            transition: "opacity 150ms, stroke 150ms",
          },
        };
      }),
    [hoveredId],
  );

  if (isMobile) {
    return <TechStackList />;
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="relative flex-1 overflow-hidden rounded-md border border-surface-border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeMouseEnter={(_, node) => setHoveredId(node.id)}
          onNodeMouseLeave={() => setHoveredId(null)}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.4}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} color="#2a2a2a" gap={18} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <div className="font-mono text-xs text-zinc-500">
        {hoveredNode ? (
          <span>
            <span style={{ color: CATEGORY_META[hoveredNode.category].color }}>
              {hoveredNode.label}
            </span>{" "}
            · {CATEGORY_META[hoveredNode.category].label} · Used in:{" "}
            {usedInProjects.length > 0
              ? usedInProjects.map((p) => p.displayName).join(", ")
              : "—"}
          </span>
        ) : (
          <span>hover a node to inspect its connections</span>
        )}
      </div>
    </div>
  );
}
