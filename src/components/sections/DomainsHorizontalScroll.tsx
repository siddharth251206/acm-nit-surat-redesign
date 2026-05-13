"use client";

import { useEffect, useRef } from "react";
import {
  Brain,
  Server,
  Globe,
  Code,
  Shield,
  GitBranch,
} from "lucide-react";
import domainsData from "@/data/domains.json";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Server,
  Globe,
  Code,
  Shield,
  GitBranch,
};

export default function DomainsHorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for touch device — fallback to vertical stack
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      try {
        const gsapModule = await import("gsap");
        const stModule = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.default;
        const ScrollTrigger = stModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
          if (!sectionRef.current || !trackRef.current) return;

          const track = trackRef.current;
          const scrollWidth = track.scrollWidth - window.innerWidth;

          gsap.to(track, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              scrub: 1.5,
              end: () => "+=" + track.scrollWidth,
              invalidateOnRefresh: true,
            },
          });
        }, sectionRef);

        cleanup = () => {
          ctx.revert();
        };
      } catch {
        // Fallback — no animation
      }
    };

    init();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--bg-primary)",
        minHeight: "100vh",
      }}
    >
      {/* Section Header */}
      <div className="container-site pt-16 tablet:pt-24 pb-8">
        <span className="mono-label mb-4 block">// DOMAINS</span>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
          }}
        >
          what we <span style={{ color: "var(--accent)" }}>explore</span>
        </h2>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="flex gap-6 px-[var(--gutter)] pb-16 tablet:pb-24"
        style={{ width: "max-content" }}
      >
        {domainsData.map((domain) => {
          const IconComp = iconMap[domain.icon] || Code;
          return (
            <div
              key={domain.id}
              className="flex-shrink-0 w-[320px] tablet:w-[400px] p-8 rounded-md border-subtle-hover group transition-all duration-300"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <IconComp
                size={40}
                className="mb-6 transition-colors duration-300 group-hover:text-accent"
                style={{ color: "var(--text-muted)" }}
              />
              <h3
                className="font-display mb-3"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {domain.name}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                }}
              >
                {domain.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {domain.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="tag" style={{ fontSize: "0.65rem" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
