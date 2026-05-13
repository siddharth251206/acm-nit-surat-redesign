"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTransition } from "./TransitionContext";

const COLUMNS = 5;

/**
 * PageCurtain — cinematic multi-column wipe transition.
 *
 * Uses raw DOM animation (Web Animations API) instead of framer-motion
 * to completely eliminate hydration risk. The curtain columns are
 * rendered off-screen (top: -100%) by default and only animate
 * when triggered by the transition context.
 */
export default function PageCurtain() {
  const { isAnimating } = useTransition();
  const pathname = usePathname();
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hasEnteredRef = useRef(false);

  // Animate columns: slide them from startPos to endPos with stagger
  const animateColumns = useCallback(
    (startTop: string, endTop: string, onDone?: () => void) => {
      const cols = columnsRef.current.filter(Boolean) as HTMLDivElement[];
      let finished = 0;

      cols.forEach((col, i) => {
        col.style.top = startTop;
        const anim = col.animate(
          [{ top: startTop }, { top: endTop }],
          {
            duration: 500,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            delay: i * 50,
            fill: "forwards",
          }
        );
        anim.onfinish = () => {
          col.style.top = endTop;
          finished++;
          if (finished === cols.length && onDone) onDone();
        };
      });
    },
    []
  );

  // On first mount + every pathname change: reveal (slide columns away)
  useEffect(() => {
    if (!hasEnteredRef.current) {
      // First load — just mark as entered, columns start off-screen
      hasEnteredRef.current = true;
      return;
    }

    // After a route change, reveal the page by sliding columns down
    animateColumns("0%", "100%");
  }, [pathname, animateColumns]);

  // When isAnimating becomes true: cover the page
  useEffect(() => {
    if (isAnimating) {
      animateColumns("-100%", "0%");
    }
  }, [isAnimating, animateColumns]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex overflow-hidden pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
      aria-hidden="true"
    >
      {Array.from({ length: COLUMNS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { columnsRef.current[i] = el; }}
          className="h-full flex-1 absolute"
          style={{
            top: "-100%",
            left: `${(i / COLUMNS) * 100}%`,
            width: `${100 / COLUMNS}%`,
            height: "100%",
            backgroundColor: "var(--bg-primary)",
            borderRight:
              i < COLUMNS - 1 ? "1px solid var(--border)" : "none",
          }}
        />
      ))}
    </div>
  );
}
