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

/**
 * DomainsHorizontalScroll
 *
 * NO GSAP. NO ScrollTrigger. NO pin.
 *
 * GSAP ScrollTrigger pin: true literally reparents DOM elements into
 * wrapper divs. React doesn't know about these wrapper divs, so when
 * React tries to reconcile or unmount, it can't find nodes where it
 * expects them → "removeChild" error. The pin also miscalculates
 * spacer height, which causes all content below to disappear.
 *
 * This version uses:
 * - CSS overflow-x: auto + scroll-snap for native horizontal scrolling
 * - IntersectionObserver for fade-in reveals
 * - A responsive grid fallback on mobile/tablet
 */
export default function DomainsHorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".domain-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Section Header */}
      <div className="container-site pt-16 tablet:pt-24 pb-8 flex items-end justify-between">
        <div>
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

        {/* Navigation Controls */}
        <div className="hidden tablet:flex gap-3">
          <button onClick={scrollLeft} className="p-2 rounded-full transition-colors" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--accent)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }} aria-label="Scroll left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={scrollRight} className="p-2 rounded-full transition-colors" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--accent)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }} aria-label="Scroll right">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      {/* Mobile Swipe Instruction */}
      <div className="container-site tablet:hidden mb-4">
        <p className="flex items-center gap-2 font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          Swipe left to explore <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </p>
      </div>

      {/* Cards — horizontal scroll on desktop, grid on mobile */}
      <div
        ref={scrollTrackRef}
        className="domains-scroll-track"
        style={{
          display: "flex",
          gap: "1.5rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)",
          paddingBottom: "3rem",
          /* Hide scrollbar but keep functionality */
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {domainsData.map((domain, i) => {
          const IconComp = iconMap[domain.icon] || Code;
          return (
            <div
              key={domain.id}
              className="domain-card reveal-item"
              style={{
                transitionDelay: `${i * 0.08}s`,
                flex: "0 0 auto",
                width: "min(85vw, 380px)",
                scrollSnapAlign: "start",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "2rem",
                transition: "border-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <IconComp
                size={36}
                className="mb-5"
                style={{ color: "var(--text-muted)" }}
              />
              <h3
                className="font-display mb-3"
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {domain.name}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                  marginBottom: "1.25rem",
                }}
              >
                {domain.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {domain.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="tag"
                    style={{ fontSize: "0.65rem" }}
                  >
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
