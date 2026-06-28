"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CHAR_MS, DESKTOP_LINES, getExitMs, MOBILE_LINES } from "./boot-lines";
import { getRevealedRuns, isLineFullyTyped } from "./typewriter";

interface BootScreenProps {
  onComplete: () => void;
}

const MOBILE_BREAKPOINT_PX = 640;
const TONE_CLASS: Record<string, string> = {
  default: "text-zinc-300",
  accent: "text-accent text-glow",
  success: "text-[#00ff88]",
};

function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT_PX;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [isMobile, setIsMobile] = useState(isMobileViewport);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const rafRef = useRef<number>();
  const startedAtRef = useRef<number>();

  const lines = isMobile ? MOBILE_LINES : DESKTOP_LINES;
  const exitMs = getExitMs(lines);
  const lastLine = lines[lines.length - 1];
  const cursorVisible = elapsedMs >= lastLine.startMs;

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileViewport());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function tick(now: number) {
      if (startedAtRef.current === undefined) startedAtRef.current = now;
      const elapsed = now - startedAtRef.current;
      setElapsedMs(elapsed);

      if (elapsed >= exitMs) {
        setIsExiting(true);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [exitMs]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          key="boot-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0d0d] px-6 font-mono text-sm text-zinc-300 sm:text-base"
        >
          <div className="w-full max-w-xl">
            {lines.map((line, index) => {
              if (elapsedMs < line.startMs) return null;

              const runs = getRevealedRuns(line, elapsedMs, CHAR_MS);
              const isLastLine = index === lines.length - 1;
              const showCursorHere =
                isLastLine && cursorVisible && isLineFullyTyped(line, elapsedMs, CHAR_MS);

              return (
                <p key={index} className="leading-relaxed">
                  {runs.map((run, runIndex) => (
                    <span key={runIndex} className={TONE_CLASS[run.tone]}>
                      {run.text}
                    </span>
                  ))}
                  {showCursorHere && (
                    <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />
                  )}
                </p>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
