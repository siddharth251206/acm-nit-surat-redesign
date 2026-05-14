"use client";

import { useEffect, useRef } from "react";
import TransitionLink from "@/components/motion/TransitionLink";
import { ArrowRight } from "lucide-react";

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const children = sectionRef.current.querySelectorAll(".reveal-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12 tablet:gap-16 items-start">
          {/* Left — Pull Quote */}
          <div className="reveal-item">
            <span className="mono-label mb-6 block">// ABOUT US</span>
            <p
              className="font-display"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Advancing computing as a science &amp; a profession —{" "}
              <span style={{ color: "var(--accent)" }}>empowering</span> the
              next generation of engineers.
            </p>
          </div>

          {/* Right — Description + CTA */}
          <div className="reveal-item" style={{ transitionDelay: "0.15s" }}>
            <p className="mb-4">
              The ACM SVNIT Student Chapter is the official student chapter of
              the Association for Computing Machinery at NIT Surat. Since 2005,
              we have been the driving force behind technical culture on campus.
            </p>
            <p className="mb-8">
              From hackathons and guest lectures to open-source sprints and
              competitive programming contests — we build, we learn, and we
              push boundaries.
            </p>
            <TransitionLink href="/about" className="btn-outline">
              Read More <ArrowRight size={14} />
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
