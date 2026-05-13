"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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
          if (!leftRef.current || !rightRef.current || !sectionRef.current)
            return;

          gsap.fromTo(
            leftRef.current,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            }
          );

          gsap.fromTo(
            rightRef.current,
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            }
          );
        }, sectionRef);

        cleanup = () => {
          ctx.revert();
        };
      } catch {
        // Graceful degradation
        if (leftRef.current) leftRef.current.style.opacity = "1";
        if (rightRef.current) rightRef.current.style.opacity = "1";
      }
    };

    init();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container-site">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12 tablet:gap-16 items-start">
          {/* Left — Pull Quote */}
          <div ref={leftRef} style={{ opacity: 0 }}>
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
          <div ref={rightRef} style={{ opacity: 0 }}>
            <p className="mb-4">
              The ACM SVNIT Student Chapter is the official student chapter of
              the Association for Computing Machinery at NIT Surat. Since 2012,
              we have been the driving force behind technical culture on campus.
            </p>
            <p className="mb-8">
              From hackathons and guest lectures to open-source sprints and
              competitive programming contests — we build, we learn, and we
              push boundaries.
            </p>
            <Link href="/about" className="btn-outline">
              Read More <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
