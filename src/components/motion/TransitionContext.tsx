"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionContextType {
  animateOut: (href: string) => void;
  isAnimating: boolean;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const animateOut = useCallback(
    (href: string) => {
      // Don't animate same-page or anchor links
      if (href === pathname || isAnimating) return;
      if (href.startsWith("#")) {
        router.push(href);
        return;
      }

      setIsAnimating(true);

      // Wait for the cover animation to finish (5 columns × 50ms stagger + 500ms duration)
      // Total ≈ 750ms, but we only need the first columns to finish
      setTimeout(() => {
        router.push(href);
        // Small delay to let the route swap before revealing
        setTimeout(() => {
          setIsAnimating(false);
        }, 150);
      }, 600);
    },
    [pathname, isAnimating, router]
  );

  return (
    <TransitionContext.Provider value={{ animateOut, isAnimating }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
