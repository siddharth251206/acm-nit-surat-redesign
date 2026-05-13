"use client";

import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown } from "lucide-react";

// Dynamic import with SSR disabled — Three.js never runs on server,
// so there's zero hydration mismatch risk. No server HTML to conflict with.
const WireframeBackground = dynamic(
  () => import("@/components/three/WireframeBackground"),
  { ssr: false }
);

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Three.js Wireframe Background — client-only */}
      <WireframeBackground opacity={0.35} speed={1} />

      {/* Hero Content */}
      <div
        className="relative z-10 container-site flex flex-col justify-center"
        style={{
          minHeight: "100vh",
          paddingTop: "var(--navbar-height)",
        }}
      >
        {/* Top-right CTA */}
        <div className="absolute top-[100px] right-[var(--gutter)] hidden tablet:block">
          <a href="#stats-bar" className="btn-primary">
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
