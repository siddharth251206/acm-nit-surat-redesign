"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import PageTransition from "@/components/motion/PageTransition";
import siteData from "@/data/site.json";
import timelineData from "@/data/timeline.json";
import MobileHeroPills from "@/components/sections/MobileHeroPills";

const WireframeBackground = dynamic(
  () => import("@/components/three/WireframeBackground"),
  { ssr: false }
);

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const items = timelineRef.current.querySelectorAll(".timeline-item");
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

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".reveal-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition>
      <div ref={sectionRef}>
        {/* Hero */}
        <section
          className="relative w-full overflow-hidden"
          style={{
            minHeight: "60vh",
            backgroundColor: "var(--bg-primary)",
          }}
        >
          <WireframeBackground opacity={0.4} speed={0.4} />
          <div
            className="relative z-10 container-site flex flex-col justify-center"
            style={{ minHeight: "60vh", paddingTop: "var(--navbar-height)" }}
          >
            <span className="mono-label mb-4">// ABOUT</span>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              about{" "}
              <span style={{ color: "var(--accent)" }}>acm svnit</span>
            </h1>
            <MobileHeroPills
              pills={["Est. 2005", "NIT Surat", "ACM Chapter"]}
              descriptor="Building engineers since 2005."
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="container-site section-padding">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12 tablet:gap-16">
            {/* Pull Quote */}
            <div className="reveal-item">
              <p
                className="font-display italic"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                }}
              >
                &ldquo;Advancing computing as a science and a profession,
                empowering the next generation of engineers at NIT Surat.&rdquo;
              </p>
            </div>

            {/* Body Text — from site.json */}
            <div className="reveal-item" style={{ transitionDelay: "0.15s" }}>
              <p className="mb-4" style={{ lineHeight: 1.7 }}>
                {siteData.aboutDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section
          className="section-padding border-t"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <div className="container-site">
            <span className="mono-label mb-4 block">// MILESTONES</span>
            <h2
              className="font-display mb-16"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
              }}
            >
              our <span style={{ color: "var(--accent)" }}>journey</span>
            </h2>

            <div ref={timelineRef} className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[20px] tablet:left-1/2 top-0 bottom-0 w-px"
                style={{ backgroundColor: "var(--border)" }}
              />

              {timelineData.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={milestone.year}
                    className="timeline-item reveal-item relative mb-16 last:mb-0"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    {/* Desktop layout — alternating sides */}
                    <div
                      className={`tablet:grid tablet:grid-cols-2 tablet:gap-12 items-start`}
                      style={{ direction: isEven ? "ltr" : "rtl" }}
                    >
                      {/* Content side */}
                      <div
                        className={`pl-12 tablet:pl-0 ${
                          isEven
                            ? "tablet:text-right tablet:pr-12"
                            : "tablet:text-left tablet:pl-12"
                        }`}
                        style={{ direction: "ltr" }}
                      >
                        <span
                          className="font-mono inline-block mb-2"
                          style={{
                            color: "var(--accent)",
                            fontSize: "1rem",
                            fontWeight: 600,
                          }}
                        >
                          {milestone.year}
                        </span>
                        <h3
                          className="font-display mb-2"
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: 600,
                            lineHeight: 1.3,
                          }}
                        >
                          {milestone.title}
                        </h3>
                        <p style={{ fontSize: "0.9rem" }}>
                          {milestone.description}
                        </p>
                      </div>

                      {/* Empty side (for alignment) */}
                      <div className="hidden tablet:block" />
                    </div>

                    {/* Dot on timeline */}
                    <div
                      className="absolute left-[14px] tablet:left-1/2 tablet:-translate-x-1/2 top-1 w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: "var(--accent)",
                        border: "2px solid var(--bg-secondary)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container-site section-padding">
          <span className="mono-label mb-4 block">// VALUES</span>
          <h2
            className="font-display mb-12"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            what drives <span style={{ color: "var(--accent)" }}>us</span>
          </h2>

          <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 gap-6">
            {[
              {
                title: "Build First",
                description:
                  "We believe in learning by building. Theory is important, but shipping real projects is where growth happens. Every member is encouraged to build, break, and iterate.",
              },
              {
                title: "Open Knowledge",
                description:
                  "Knowledge should be shared, not hoarded. Our workshops, resources, and mentorship programs are designed to uplift every member, regardless of their starting point.",
              },
              {
                title: "Technical Excellence",
                description:
                  "We hold ourselves to a high standard. From clean code to polished presentations, we believe that how you do anything is how you do everything.",
              },
              {
                title: "Community Over Competition",
                description:
                  "The best engineers are built in communities, not silos. We celebrate collaboration, peer learning, and collective achievement over individual glory.",
              },
              {
                title: "Innovation Culture",
                description:
                  "We encourage experimentation and embrace failure as a stepping stone. The most impactful projects often start as wild ideas discussed over chai.",
              },
              {
                title: "Industry Readiness",
                description:
                  "Beyond academics, we prepare members for the real world — through mock interviews, resume reviews, industry talks, and hands-on experience with production tools.",
              },
            ].map((value, i) => (
              <div
                key={value.title}
                className="reveal-item p-6 rounded-md border-subtle-hover"
                style={{
                  backgroundColor: "transparent",
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <h3
                  className="font-display mb-3"
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                  }}
                >
                  {value.title}
                </h3>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
