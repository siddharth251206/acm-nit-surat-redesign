"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Wrench,
  Globe,
  BookOpen,
  Settings,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Teams", href: "/admin/teams", icon: Users },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Projects", href: "/admin/projects", icon: Wrench },
  { label: "Domains", href: "/admin/domains", icon: Globe },
  { label: "Timeline", href: "/admin/timeline", icon: BookOpen },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "#0F0F0F",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#f5f0e8",
            letterSpacing: "-0.01em",
          }}
        >
          ⚙ ACM Admin
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0.75rem 0" }}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.625rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#E8593C" : "#888780",
                textDecoration: "none",
                borderLeft: isActive
                  ? "3px solid #E8593C"
                  : "3px solid transparent",
                transition: "all 0.15s ease",
                backgroundColor: isActive
                  ? "rgba(232,89,60,0.06)"
                  : "transparent",
              }}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* View Site */}
      <div
        style={{
          padding: "1rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8rem",
            color: "#888780",
            textDecoration: "none",
          }}
        >
          <ExternalLink size={14} />
          View Site
        </a>
      </div>
    </aside>
  );
}
