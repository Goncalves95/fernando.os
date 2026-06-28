"use client";

import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { useRef } from "react";
import { FiTerminal, FiX } from "react-icons/fi";
import { Terminal } from "./Terminal";

interface TerminalWidgetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TerminalWidget({ isOpen, onOpenChange }: TerminalWidgetProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  return (
    <div ref={constraintsRef} className="pointer-events-none fixed inset-0 z-50">
      <button
        onClick={() => onOpenChange(!isOpen)}
        className="pointer-events-auto fixed bottom-6 right-6 flex items-center gap-2 rounded-full border border-accent/40 bg-surface-panel px-4 py-2.5 font-mono text-sm text-zinc-200 shadow-glow transition-colors hover:border-accent hover:text-accent"
      >
        <FiTerminal className="h-4 w-4" />
        Terminal
        <span className="inline-block h-3 w-1.5 animate-blink bg-accent" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            dragConstraints={constraintsRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="pointer-events-auto fixed bottom-24 right-6 flex h-[70vh] w-[92vw] max-w-[440px] flex-col overflow-hidden rounded-lg border border-surface-border bg-surface-raised shadow-glow sm:h-[480px]"
          >
            <div
              onPointerDown={(event) => dragControls.start(event)}
              className="flex cursor-grab items-center gap-2 border-b border-surface-border px-4 py-2.5 active:cursor-grabbing"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 font-mono text-xs text-zinc-400">terminal</span>
              <button
                onClick={() => onOpenChange(false)}
                aria-label="Close terminal"
                className="ml-auto text-zinc-500 hover:text-accent"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden p-3">
              <Terminal />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
