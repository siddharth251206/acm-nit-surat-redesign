"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TransitionProvider } from "@/components/motion/TransitionContext";
import PageCurtain from "@/components/motion/PageCurtain";

const WireframeBackground = dynamic(
  () => import("@/components/three/WireframeBackground"),
  { ssr: false }
);

export default function NotFound() {
  return (
    <TransitionProvider>
      <PageCurtain />
      <Navbar />
      <main
        className="relative w-full flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--bg-primary)",
        }}
      >
        <WireframeBackground opacity={0.4} speed={0.3} />

        <div className="container-site relative z-10 flex flex-col items-center text-center px-4 pt-16 pb-20">
          <span
            className="font-mono mb-6"
            style={{
              color: "var(--accent)",
              letterSpacing: "0.2em",
              fontSize: "1rem",
            }}
          >
            // 404 ERROR
          </span>

          <h1
            className="font-display tracking-tight mb-8"
            style={{
              fontSize: "clamp(4rem, 15vw, 10rem)",
              fontWeight: 800,
              lineHeight: 0.9,
              color: "var(--text-primary)",
            }}
          >
            PAGE NOT
            <br />
            <span style={{ color: "var(--text-muted)", opacity: 0.5 }}>FOUND</span>
          </h1>

          <p
            className="font-body mb-10"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              color: "var(--text-secondary)",
              maxWidth: "500px",
            }}
          >
            The page you're looking for seems to have vanished into the digital void.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 group"
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              letterSpacing: "0.05em",
            }}
          >
            RETURN HOME
            <ArrowRight
              size={18}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </main>
      <Footer />
    </TransitionProvider>
  );
}
