"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Slide = { id: string; label: string };

/**
 * Vertical slide deck: full-height sections that snap into place, plus a
 * right-rail dot navigation, arrow-key support, and active-slide tracking.
 * Snapping/observing read the [data-slide] sections rendered by the panels.
 */
export default function SlideDeck({ children }: { children: ReactNode }) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-slide]")
    );
    setSlides(
      els.map((e) => ({ id: e.id, label: e.dataset.label ?? "" }))
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement));
        });
      },
      { threshold: 0.55 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const go = useCallback((i: number) => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-slide]")
    );
    const t = Math.min(Math.max(i, 0), els.length - 1);
    els[t]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        go(active + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  return (
    <>
      {children}

      <nav
        aria-label="Sections"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 sm:flex"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(i)}
            aria-label={s.label}
            aria-current={i === active}
            className="group flex items-center gap-2"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-widest transition-all ${
                i === active
                  ? "text-accent opacity-100"
                  : "text-muted opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-px transition-all ${
                i === active
                  ? "w-8 bg-accent"
                  : "w-4 bg-muted group-hover:w-6 group-hover:bg-foreground"
              }`}
            />
          </button>
        ))}
      </nav>
    </>
  );
}
