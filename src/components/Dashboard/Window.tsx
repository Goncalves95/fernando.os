"use client";

import { motion } from "framer-motion";
import { DashboardWindowId } from "@/types";

interface WindowProps {
  id: DashboardWindowId;
  title: string;
  isActive: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Window({ id, title, isActive, className, onClick, children }: WindowProps) {
  return (
    <motion.section
      id={id}
      layout
      onClick={onClick}
      animate={{
        borderColor: isActive ? "#FF4500" : "#2a2a2a",
        boxShadow: isActive ? "0 0 20px rgba(255, 69, 0, 0.35)" : "none",
      }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col rounded-lg border bg-surface-raised ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 border-b border-surface-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-2 font-mono text-xs text-zinc-400">{title}</span>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </motion.section>
  );
}
