"use client";

import { useEffect, useState } from "react";

const BOTTOM_OF_PAGE_THRESHOLD_PX = 2;

/** Tracks which of the given section ids is currently in the "active" band
 * near the top of the viewport, for scroll-spy style nav highlighting. */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const lastId = elements[elements.length - 1].id;

    function isAtBottomOfPage() {
      return (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - BOTTOM_OF_PAGE_THRESHOLD_PX
      );
    }

    function handleScroll() {
      if (isAtBottomOfPage()) setActiveId(lastId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isAtBottomOfPage()) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ids]);

  return activeId;
}
