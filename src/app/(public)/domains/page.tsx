"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
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
import MobileHeroPills from "@/components/sections/MobileHeroPills";

interface DomainItem {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  description: string;
  image?: string;
  projects: string[];
  technologies: string[];
}

const typedDomainsData = domainsData as DomainItem[];

const WireframeBackground = dynamic(
  () => import("@/components/three/WireframeBackground"),
  { ssr: false }
);

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Server,
  Globe,
  Code,
  Shield,
  GitBranch,
};

export default function DomainsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const items = pageRef.current.querySelectorAll(".reveal-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition>
      <div ref={pageRef}>
        <section
          className="relative w-full"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <WireframeBackground opacity={0.2} speed={0.4} />
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
            <MobileHeroPills
              pills={["6 Domains", "Research Driven", "ACM SVNIT"]}
              descriptor="Six verticals. One community."
            />
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
        {typedDomainsData.map((domain, index) => {
          const IconComp = iconMap[domain.icon] || Code;
          const isEven = index % 2 === 0;

          return (
            <section
              key={domain.id}
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
                className={`container-site relative z-10 grid grid-cols-1 tablet:grid-cols-2 gap-12 items-center py-16`}
                style={{
                  direction: isEven ? "ltr" : "rtl",
                }}
              >
                <div style={{ direction: "ltr" }}>
                  <div className="reveal-item" style={{ transitionDelay: "0s" }}>
                    <IconComp
                      size={48}
                      style={{ color: "var(--accent)" }}
                      className="mb-6"
                    />
                  </div>
                  <div className="reveal-item" style={{ transitionDelay: "0.1s" }}>
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
                  <div className="reveal-item" style={{ transitionDelay: "0.2s" }}>
                    <p className="mb-6" style={{ maxWidth: "520px" }}>
                      {domain.description}
                    </p>
                  </div>
                  <div className="reveal-item" style={{ transitionDelay: "0.3s" }}>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {domain.technologies.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="reveal-item" style={{ transitionDelay: "0.4s" }}>
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
                  className="flex items-center justify-center relative mt-8 tablet:mt-0"
                  style={{ direction: "ltr" }}
                >
                  {domain.image ? (
                    <div className="relative w-full aspect-square max-w-[400px] rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                      <Image
                        src={domain.image}
                        alt={domain.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 400px"
                      />
                    </div>
                  ) : (
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
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </PageTransition>
  );
}
