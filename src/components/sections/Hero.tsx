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
          </div>

          {/* Quote placed below the image */}
          <div className="mt-10 flex flex-col items-center text-center px-4">
            <p
              className="font-display italic"
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
                fontWeight: 500,
                color: "var(--text-primary)",
                lineHeight: 1.4,
                maxWidth: "800px"
              }}
            >
              &ldquo;Learning never exhausts the mind.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-5">
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  backgroundColor: "var(--accent)",
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: "0.85rem",
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Leonardo Da Vinci
              </span>
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  backgroundColor: "var(--accent)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom spacing that blends into next section */}
        <div style={{ height: "4rem" }} />
      </section>
    </>
  );
}
