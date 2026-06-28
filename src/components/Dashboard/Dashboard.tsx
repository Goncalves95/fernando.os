"use client";

import { ReactNode, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { TechGraph } from "@/components/TechGraph";
import { TerminalWidget } from "@/components/Terminal";
import { useActiveSection } from "@/lib/use-active-section";
import { DashboardWindowId } from "@/types";
import { Window } from "./Window";

const SECTION_IDS: DashboardWindowId[] = [
  "home",
  "about",
  "projects",
  "skills",
  "github-stats",
  "contact",
];

interface DashboardProps {
  projectsSlot: ReactNode;
  githubStatsSlot: ReactNode;
  contactSlot: ReactNode;
}

export function Dashboard({ projectsSlot, githubStatsSlot, contactSlot }: DashboardProps) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const activeWindow = useActiveSection(SECTION_IDS) as DashboardWindowId | null;

  function handleNavigate(id: DashboardWindowId) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen">
      <Navigation activeWindow={activeWindow} onNavigate={handleNavigate} />

      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <section id="home" className="flex flex-col gap-4 py-6">
          <h1 className="font-mono text-3xl text-zinc-100 sm:text-4xl">
            Fernando<span className="text-accent">.</span>
          </h1>
          <p className="max-w-2xl font-mono text-sm text-zinc-400 sm:text-base">
            Full Stack Software Engineer — Java, Spring Boot &amp; Angular by day,
            Python ML by choice. Based in Zürich, Switzerland.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleNavigate("projects")}
              className="rounded bg-accent px-4 py-2 font-mono text-sm font-semibold text-black hover:bg-accent-glow"
            >
              View projects
            </button>
            <button
              onClick={() => handleNavigate("contact")}
              className="rounded border border-surface-border px-4 py-2 font-mono text-sm text-zinc-300 hover:border-accent/50 hover:text-accent"
            >
              Contact me
            </button>
          </div>
        </section>

        <Window
          id="about"
          title="about.md"
          isActive={activeWindow === "about"}
        >
          <h2 className="font-mono text-2xl text-zinc-100">
            About<span className="text-accent">.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Full Stack Software Engineer who builds complete products — from data
            models and APIs to the interfaces people actually touch. This site is
            itself one of those products: a small, terminal-flavored operating
            system instead of a static page.
          </p>
        </Window>

        <Window id="projects" title="projects/" isActive={activeWindow === "projects"}>
          {projectsSlot}
        </Window>

        <Window
          id="skills"
          title="stack.graph"
          isActive={activeWindow === "skills"}
          className="h-[560px]"
        >
          <TechGraph />
        </Window>

        <Window
          id="github-stats"
          title="github.stats"
          isActive={activeWindow === "github-stats"}
        >
          {githubStatsSlot}
        </Window>

        <Window id="contact" title="contact.sh" isActive={activeWindow === "contact"}>
          {contactSlot}
        </Window>
      </main>

      <TerminalWidget isOpen={terminalOpen} onOpenChange={setTerminalOpen} />
    </div>
  );
}
