"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import siteData from "@/data/site.json";

const WireframeBackground = dynamic(
  () => import("@/components/three/WireframeBackground"),
  { ssr: false }
);

export default function Hero() {
  return (
    <>
      {/* ── Main Hero ── */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--bg-primary)",
        }}
      >
        <WireframeBackground opacity={0.35} speed={1} />

        <div
          className="relative z-10 container-site flex flex-col justify-center"
          style={{
            minHeight: "100vh",
            paddingTop: "var(--navbar-height)",
          }}
        >
          <div className="absolute top-[100px] right-[var(--gutter)] hidden tablet:block">
            <a href="#stats-bar" className="btn-primary">
              Explore <ArrowRight size={14} />
            </a>
          </div>

          <div className="max-w-[900px] -mt-[15vh] tablet:-mt-[5vh]">
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

          <div className="absolute bottom-12 left-[var(--gutter)] right-[var(--gutter)] flex flex-col mobile:flex-row justify-between items-end gap-6">
            <p
              className="font-body max-w-[280px]"
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                lineHeight: 1.5,
              }}
            >
              {siteData.heroSubLeft.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </p>

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

            <p
              className="font-body max-w-[280px] text-right hidden mobile:block"
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                lineHeight: 1.5,
              }}
            >
              {siteData.heroSubRight.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ── Team Photo Showcase ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        {/* Photo container with cinematic aspect ratio */}
        <div
          className="relative container-site"
          style={{ padding: "0 var(--gutter)" }}
        >
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{
              aspectRatio: "21/9",
              maxHeight: "520px",
            }}
          >
            <Image
              src="/team/2025/acm-group-photo25.jpg"
              alt="ACM NIT Surat — Team 2025"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 90vw"
            />

            {/* Dark gradient overlay — bottom heavy for text */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.05) 70%, rgba(10,10,10,0.15) 100%)",
              }}
            />

            {/* Accent glow line at top */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: "2px",
                background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                opacity: 0.6,
              }}
            />

            {/* Quote overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6 tablet:p-10 flex flex-col tablet:flex-row items-end justify-between gap-4"
            >
              <div style={{ maxWidth: "600px" }}>
                <p
                  className="font-display italic"
                  style={{
                    fontSize: "clamp(0.9rem, 2.5vw, 1.35rem)",
                    fontWeight: 500,
                    color: "#f5f0e8",
                    lineHeight: 1.4,
                    textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                  }}
                >
                  &ldquo;We&rsquo;re not just another tech chapter. We&rsquo;re the chapter that actually builds.&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div
                    style={{
                      width: "32px",
                      height: "2px",
                      backgroundColor: "var(--accent)",
                    }}
                  />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--accent)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Team 2025
                  </span>
                </div>
              </div>

              {/* Subtle badge */}
              <span
                className="font-mono hidden mobile:block"
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(245,240,232,0.5)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                ACM NIT Surat • Est. {siteData.founded}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom spacing that blends into next section */}
        <div style={{ height: "2rem" }} />
      </section>
    </>
  );
}
