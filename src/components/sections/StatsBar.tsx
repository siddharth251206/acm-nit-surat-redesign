"use client";

import { useEffect, useRef, useState } from "react";
import siteData from "@/data/site.json";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const yearsRunning = new Date().getFullYear() - parseInt(siteData.founded);

const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Members Active" },
  { value: 40, suffix: "+", label: "Events Hosted" },
  { value: yearsRunning, suffix: "", label: "Years Running" },
  { value: 25, suffix: "+", label: "Projects Shipped" },
];

function CountUpNumber({
  target,
  suffix,
  triggered,
}: {
  target: number;
  suffix: string;
  triggered: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!triggered || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    const duration = 2000;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [triggered, target]);

  return (
    <span
      className="font-mono"
      style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        fontWeight: 700,
        color: "var(--text-primary)",
      }}
    >
      {current}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTriggered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="stats-bar"
      className="w-full border-t border-b"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container-site py-12 tablet:py-16">
        <div className="grid grid-cols-2 tablet:grid-cols-4 gap-8 tablet:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center gap-2"
            >
              <CountUpNumber
                target={stat.value}
                suffix={stat.suffix}
                triggered={triggered}
              />
              <span className="mono-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
