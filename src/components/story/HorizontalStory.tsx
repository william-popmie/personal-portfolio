"use client";

import { Children, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll vertically → the page travels sideways through full-screen panels.
 * On mobile / reduced-motion it gracefully becomes a vertical stack.
 */
function useHorizontalMode() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOn(wide.matches && !reduce.matches);
    update();
    wide.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);
  return on;
}

export default function HorizontalStory({ children }: { children: ReactNode }) {
  const panels = Children.toArray(children);
  const count = panels.length;
  const horizontal = useHorizontalMode();

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((count - 1) / count) * 100}%`]
  );
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  if (!horizontal) {
    return (
      <div>
        {panels.map((p, i) => (
          <div key={i} className="min-h-screen">
            {p}
          </div>
        ))}
      </div>
    );
  }

  return (
    <section ref={ref} style={{ height: `${count * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x, width: `${count * 100}vw` }}
        >
          {panels.map((p, i) => (
            <div key={i} className="h-screen w-screen shrink-0">
              {p}
            </div>
          ))}
        </motion.div>

        {/* progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 z-30 h-[3px] w-full origin-left bg-accent"
          style={{ scaleX: progress }}
        />
      </div>
    </section>
  );
}
