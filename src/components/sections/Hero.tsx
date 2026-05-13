"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import WireframeBackground from "@/components/three/WireframeBackground";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax on scroll using GSAP
    let cleanup: (() => void) | undefined;

    const initGSAP = async () => {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
          if (!heroRef.current || !textRef.current) return;

          // Parallax: hero text moves up at 0.4x speed
          gsap.to(textRef.current, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }, heroRef);

        cleanup = () => {
          ctx.revert();
        };
      } catch {
        // GSAP not available — graceful degradation
      }
    };

    initGSAP();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Three.js Wireframe Background */}
      <WireframeBackground opacity={0.35} speed={1} />

      {/* Hero Content */}
      <div
        ref={textRef}
        className="relative z-10 container-site flex flex-col justify-center"
        style={{
          minHeight: "100vh",
          paddingTop: "var(--navbar-height)",
        }}
      >
        {/* Top-right CTA */}
        <div className="absolute top-[100px] right-[var(--gutter)] hidden tablet:block">
          <a href="#explore" className="btn-primary">
            Explore <ArrowRight size={14} />
          </a>
        </div>

        {/* Main Headline */}
        <div className="max-w-[900px]">
          <h1
            className="font-display leading-[0.95] tracking-tight"
            style={{
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
              fontWeight: 800,
            }}
          >
            <span style={{ color: "var(--accent)" }}>we are</span>{" "}
            <span className="text-text-primary">the</span>
            <br />
            <span className="text-text-primary">association for</span>
            <br />
            <span className="text-text-primary">computing machinery</span>
          </h1>
        </div>

        {/* Bottom Subtexts */}
        <div className="absolute bottom-12 left-[var(--gutter)] right-[var(--gutter)] flex flex-col mobile:flex-row justify-between items-end gap-6">
          {/* Bottom-left */}
          <p
            className="font-body max-w-[280px]"
            style={{
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              lineHeight: 1.5,
            }}
          >
            Established in 2012. <br />
            Evolving ever since.
          </p>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="mono-label"
              style={{ fontSize: "0.65rem", letterSpacing: "0.15em" }}
            >
              SCROLL
            </span>
            <ChevronDown
              size={16}
              className="animate-bounce"
              style={{ color: "var(--text-muted)" }}
            />
          </div>

          {/* Bottom-right */}
          <p
            className="font-body max-w-[280px] text-right hidden mobile:block"
            style={{
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              lineHeight: 1.5,
            }}
          >
            We&apos;re not just another tech chapter.
            <br />
            We&apos;re the chapter that actually builds.
          </p>
        </div>
      </div>
    </section>
  );
}
