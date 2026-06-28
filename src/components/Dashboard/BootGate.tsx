"use client";

import { useEffect, useState } from "react";
import { BootScreen } from "@/components/BootScreen";

const HAS_BOOTED_KEY = "hasBooted";

type BootState = "pending" | "booting" | "done";

export function BootGate({ children }: { children: React.ReactNode }) {
  const [bootState, setBootState] = useState<BootState>("pending");

  useEffect(() => {
    const hasBooted = sessionStorage.getItem(HAS_BOOTED_KEY) === "true";
    setBootState(hasBooted ? "done" : "booting");
  }, []);

  function handleComplete() {
    sessionStorage.setItem(HAS_BOOTED_KEY, "true");
    setBootState("done");
  }

  if (bootState === "pending") return null;

  return (
    <>
      {bootState === "booting" && <BootScreen onComplete={handleComplete} />}
      {bootState === "done" && children}
    </>
  );
}
