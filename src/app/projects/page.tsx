"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Users } from "lucide-react";
import PageTransition from "@/components/motion/PageTransition";
import projectsData from "@/data/projects.json";

function GitHubSmallIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const allDomains = [
  "All",
  ...Array.from(new Set(projectsData.map((p) => p.domain))),
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((p) => p.domain === activeFilter);
  }, [activeFilter]);

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
          <span className="mono-label mb-4">// PROJECTS</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            what we&apos;ve{" "}
            <span style={{ color: "var(--accent)" }}>built</span>
          </h1>
          <p
            className="mt-4"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "480px",
            }}
          >
            From CLI tools to ML models — our students don&apos;t just learn,
            they ship.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div
        className="sticky top-[72px] z-30 border-b"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border)",
        }}
      >
        <div className="container-site flex gap-2 py-4 overflow-x-auto">
          {allDomains.map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveFilter(domain)}
              className="px-4 py-2 text-sm font-body font-medium rounded-full whitespace-nowrap transition-all duration-200"
              style={{
                backgroundColor:
                  activeFilter === domain
                    ? "var(--accent)"
                    : "transparent",
                color:
                  activeFilter === domain
                    ? "var(--bg-primary)"
                    : "var(--text-secondary)",
                border:
                  activeFilter === domain
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border)",
              }}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <section className="container-site section-padding">
        <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <article
              key={project.id}
              className="group p-6 rounded-md border-subtle-hover transition-all duration-300 hover:-translate-y-2 flex flex-col"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              {/* Domain badge */}
              <span className="tag mb-4 self-start">{project.domain}</span>

              {/* Name */}
              <h3
                className="font-display mb-2"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {project.name}
              </h3>

              {/* Description */}
              <p
                className="mb-4 flex-1"
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                }}
              >
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-full text-xs font-mono"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                      fontSize: "0.7rem",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bottom Row */}
              <div
                className="flex items-center justify-between pt-4 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono transition-colors duration-200"
                    style={{ color: "var(--text-secondary)" }}
                    aria-label={`${project.name} GitHub`}
                  >
                    <GitHubSmallIcon /> Source
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono transition-colors duration-200"
                      style={{ color: "var(--accent)" }}
                    >
                      <ExternalLink size={12} /> Demo
                    </a>
                  )}
                </div>
                <span
                  className="flex items-center gap-1 text-xs font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Users size={12} />
                  {project.contributors}
                </span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p style={{ color: "var(--text-muted)" }}>
              No projects found for this domain.
            </p>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
