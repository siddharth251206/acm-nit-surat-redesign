"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Calendar, Wrench, Globe, BookOpen, Settings, AlertTriangle } from "lucide-react";

interface Stats {
  teams: { years: number; members: number };
  events: number;
  projects: number;
  domains: number;
  timeline: number;
}

const cards = [
  { label: "Teams", icon: Users, href: "/admin/teams", key: "teams" as const },
  { label: "Events", icon: Calendar, href: "/admin/events", key: "events" as const },
  { label: "Projects", icon: Wrench, href: "/admin/projects", key: "projects" as const },
  { label: "Domains", icon: Globe, href: "/admin/domains", key: "domains" as const },
  { label: "Timeline", icon: BookOpen, href: "/admin/timeline", key: "timeline" as const },
  { label: "Settings", icon: Settings, href: "/admin/settings", key: "site" as const },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [teams, events, projects, domains, timeline] = await Promise.all([
          fetch("/api/admin/data?file=teams").then((r) => r.json()),
          fetch("/api/admin/data?file=events").then((r) => r.json()),
          fetch("/api/admin/data?file=projects").then((r) => r.json()),
          fetch("/api/admin/data?file=domains").then((r) => r.json()),
          fetch("/api/admin/data?file=timeline").then((r) => r.json()),
        ]);

        const totalMembers = Array.isArray(teams)
          ? teams.reduce(
              (sum: number, t: { members?: unknown[] }) =>
                sum + (t.members?.length || 0),
              0
            )
          : 0;

        setStats({
          teams: { years: Array.isArray(teams) ? teams.length : 0, members: totalMembers },
          events: Array.isArray(events) ? events.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
          domains: Array.isArray(domains) ? domains.length : 0,
          timeline: Array.isArray(timeline) ? timeline.length : 0,
        });
      } catch {
        // API not available
      }
    }
    loadStats();
  }, []);

  function getStatText(key: string) {
    if (!stats) return "Loading...";
    switch (key) {
      case "teams":
        return `${stats.teams.years} years • ${stats.teams.members} members`;
      case "events":
        return `${stats.events} events`;
      case "projects":
        return `${stats.projects} projects`;
      case "domains":
        return `${stats.domains} domains`;
      case "timeline":
        return `${stats.timeline} milestones`;
      case "site":
        return "Global configuration";
      default:
        return "";
    }
  }

  return (
    <div>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
        }}
      >
        Dashboard
      </h1>

      {/* Warning Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          padding: "1rem 1.25rem",
          borderRadius: "8px",
          backgroundColor: "rgba(234, 179, 8, 0.06)",
          border: "1px solid rgba(234, 179, 8, 0.2)",
          marginBottom: "2rem",
          fontSize: "0.85rem",
          color: "#eab308",
          lineHeight: 1.5,
        }}
      >
        <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
        <span>
          Admin panel is local-only. Changes write directly to{" "}
          <code style={{ backgroundColor: "rgba(255,255,255,0.06)", padding: "1px 4px", borderRadius: "3px" }}>
            /src/data/
          </code>{" "}
          JSON files. Rebuild or use <code style={{ backgroundColor: "rgba(255,255,255,0.06)", padding: "1px 4px", borderRadius: "3px" }}>next dev</code>{" "}
          for changes to reflect on the site.
        </span>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1.25rem",
              borderRadius: "10px",
              backgroundColor: "#111111",
              border: "1px solid rgba(255,255,255,0.06)",
              textDecoration: "none",
              color: "inherit",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
            }
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "rgba(232,89,60,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <card.icon size={18} style={{ color: "#E8593C" }} />
            </div>
            <div>
              <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>{card.label}</p>
              <p style={{ fontSize: "0.75rem", color: "#888780", marginTop: "2px" }}>
                {getStatText(card.key)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
