"use client";

import { useEffect, useRef } from "react";
import {
  Brain,
  Server,
  Globe,
  Code,
  Shield,
  GitBranch,
  ExternalLink,
} from "lucide-react";
import PageTransition from "@/components/motion/PageTransition";
import domainsData from "@/data/domains.json";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Server,
  Globe,
  Code,
  Shield,
  GitBranch,
};

export default function DomainsPage() {
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async () => {
      try {
        const gsapModule = await import("gsap");
        const stModule = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.default;
        const ScrollTrigger = stModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
          sectionsRef.current.forEach((section) => {
            if (!section) return;
            const content = section.querySelector(".domain-content");
            if (!content) return;

            gsap.fromTo(
              content.children,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 70%",
                },
              }
            );
          });
        });

        cleanup = () => {
          ctx.revert();
        };
      } catch {
        // Graceful degradation — make content visible
        sectionsRef.current.forEach((section) => {
          if (!section) return;
          const content = section.querySelector(".domain-content");
          if (content) {
            Array.from(content.children).forEach((child) => {
              (child as HTMLElement).style.opacity = "1";
            });
          }
        });
      }
    };

    init();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section
        className="relative w-full"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div
          className="container-site flex flex-col justify-center"
          style={{ minHeight: "50vh", paddingTop: "var(--navbar-height)" }}
        >
          <span className="mono-label mb-4">// DOMAINS</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            our{" "}
            <span style={{ color: "var(--accent)" }}>domains</span>
          </h1>
          <p
            className="mt-4"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "480px",
            }}
          >
            Six specialized verticals. One shared mission — advancing computing
            as a science and a profession.
          </p>
        </div>
      </section>

      {/* Domain Sections */}
      {domainsData.map((domain, index) => {
        const IconComp = iconMap[domain.icon] || Code;
        const isEven = index % 2 === 0;

        return (
          <section
            key={domain.id}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className="relative overflow-hidden border-t"
            style={{
              minHeight: "100vh",
              backgroundColor:
                index % 2 === 0
                  ? "var(--bg-primary)"
                  : "var(--bg-secondary)",
              borderColor: "var(--border)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Watermark */}
            <div
              className="absolute inset-0 flex items-center pointer-events-none select-none"
              style={{
                justifyContent: isEven ? "flex-end" : "flex-start",
                paddingLeft: isEven ? 0 : "var(--gutter)",
                paddingRight: isEven ? "var(--gutter)" : 0,
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: "clamp(6rem, 15vw, 14rem)",
                  fontWeight: 800,
                  color: "var(--accent)",
                  opacity: 0.04,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {domain.name}
              </span>
            </div>

            {/* Content */}
            <div
              className={`container-site relative z-10 grid grid-cols-1 tablet:grid-cols-2 gap-12 items-center py-16 ${
                isEven ? "" : "tablet:direction-rtl"
              }`}
              style={{
                direction: isEven ? "ltr" : "rtl",
              }}
            >
              <div
                className="domain-content"
                style={{ direction: "ltr" }}
              >
                <div style={{ opacity: 0 }}>
                  <IconComp
                    size={48}
                    style={{ color: "var(--accent)" }}
                    className="mb-6"
                  />
                </div>
                <div style={{ opacity: 0 }}>
                  <h2
                    className="font-display mb-4"
                    style={{
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                    }}
                  >
                    {domain.name}
                  </h2>
                </div>
                <div style={{ opacity: 0 }}>
                  <p className="mb-6" style={{ maxWidth: "520px" }}>
                    {domain.description}
                  </p>
                </div>
                <div style={{ opacity: 0 }}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {domain.technologies.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ opacity: 0 }}>
                  <h4
                    className="font-display mb-3"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                    }}
                  >
                    Related Projects
                  </h4>
                  <ul className="space-y-2">
                    {domain.projects.map((project) => (
                      <li key={project} className="flex items-center gap-2">
                        <ExternalLink
                          size={12}
                          style={{ color: "var(--accent)" }}
                        />
                        <span
                          className="font-body text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {project}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual placeholder for right/left column */}
              <div
                className="hidden tablet:flex items-center justify-center"
                style={{ direction: "ltr" }}
              >
                <div
                  className="w-full aspect-square max-w-[400px] rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, var(--bg-tertiary), var(--bg-primary))`,
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconComp
                    size={80}
                    style={{ color: "var(--text-muted)", opacity: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </PageTransition>
  );
}
