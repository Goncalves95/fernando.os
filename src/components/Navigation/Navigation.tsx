"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { DashboardWindowId } from "@/types";

interface NavigationProps {
  activeWindow: DashboardWindowId | null;
  onNavigate: (window: DashboardWindowId) => void;
}

const NAV_ITEMS: { id: DashboardWindowId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navigation({ activeWindow, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleSelect(id: DashboardWindowId) {
    onNavigate(id);
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-mono text-sm text-zinc-300">
          <span className="inline-block h-2 w-2 animate-blink rounded-full bg-accent" />
          <span>
            fernando<span className="text-accent">@</span>os
          </span>
        </div>

        <ul className="hidden items-center gap-1 font-mono text-xs sm:flex sm:text-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeWindow === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleSelect(item.id)}
                  className={`relative rounded px-3 py-1.5 transition-colors ${
                    isActive ? "text-accent" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded bg-accent/10"
                      transition={{ type: "spring", duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          className="text-zinc-300 hover:text-accent sm:hidden"
        >
          {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-surface-border font-mono text-sm sm:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeWindow === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelect(item.id)}
                    className={`block w-full px-6 py-3 text-left transition-colors ${
                      isActive ? "text-accent" : "text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
