"use client";

/**
 * PageTransition — lightweight CSS-only fade-in wrapper.
 *
 * We intentionally avoid framer-motion here because:
 *  1. Next.js 14 App Router does NOT support AnimatePresence exit
 *     animations (there's no layout-level outlet to intercept).
 *  2. motion.div with `initial` props causes a hydration mismatch:
 *     the server renders with defaults, but the client immediately
 *     sets opacity:0 / y:20, so React sees a DOM diff and throws
 *     "removeChild on Node" when it tries to reconcile.
 *
 * The page curtain (PageCurtain.tsx) handles the cinematic exit
 * transition. This component only handles the entrance fade-in
 * using a plain CSS animation — zero hydration risk.
 */

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="page-enter">
      {children}
    </div>
  );
}
