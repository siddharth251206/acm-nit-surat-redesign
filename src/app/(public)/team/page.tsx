"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import PageTransition from "@/components/motion/PageTransition";
import teamsData from "@/data/teams.json";

interface Member {
  name: string;
  role: string;
  roleGroup: string;
  photo: string;
  email?: boolean | string;
  linkedin?: boolean | string;
  github?: boolean | string;
  twitter?: boolean | string;
  facebook?: boolean | string;
}

interface TeamYear {
  year: string;
  label?: string;
  isCurrent: boolean;
  members: Member[];
}

const teams = teamsData as TeamYear[];

/* ── Helpers ───────────────────────── */
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ── Social SVGs (15px for display) ── */
function LinkedInIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* ── Social icon wrapper ── */
function SocialBadge({ href, children, label }: { href?: string; children: React.ReactNode; label: string }) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "26px",
    height: "26px",
    borderRadius: "4px",
    color: "var(--text-secondary)",
    transition: "color 0.2s ease",
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} aria-label={label}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
      >
        {children}
      </a>
    );
  }

  return <span style={style}>{children}</span>;
}

/* ── Member Card with Photo Fallback ───────────────────────── */
function TeamCard({ member }: { member: Member }) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = member.photo && member.photo.trim() !== "";
  const showPhoto = hasPhoto && !imgError;

  // Build social items — only show icons when we have a real URL (string), not boolean flags
  const socials: { key: string; icon: React.ReactNode; href: string }[] = [];
  if (typeof member.linkedin === "string" && member.linkedin) socials.push({ key: "li", icon: <LinkedInIcon />, href: member.linkedin });
  if (typeof member.github === "string" && member.github) socials.push({ key: "gh", icon: <GitHubIcon />, href: member.github });
  if (typeof member.email === "string" && member.email) socials.push({ key: "em", icon: <MailIcon />, href: `mailto:${member.email}` });
  if (typeof member.facebook === "string" && member.facebook) socials.push({ key: "fb", icon: <FacebookIcon />, href: member.facebook });
  if (typeof member.twitter === "string" && member.twitter) socials.push({ key: "tw", icon: <TwitterIcon />, href: member.twitter });

  return (
    <div className="border-subtle-hover rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Photo / Initials Fallback */}
      <div
        className="aspect-square w-full relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))",
        }}
      >
        {showPhoto ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: "2px solid var(--border)",
              }}
            >
              <span
                className="font-display text-xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                {getInitials(member.name)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info + Social Icons */}
      <div className="p-3 sm:p-4">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "4px" }}>
          <div style={{ minWidth: 0, flex: "1 1 auto" }}>
            <p
              className="font-display"
              style={{ fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)", fontWeight: 500, lineHeight: 1.3, wordBreak: "break-word" }}
            >
              {member.name}
            </p>
            <p
              className="font-mono mt-0.5 sm:mt-1"
              style={{
                fontSize: "clamp(0.6rem, 2vw, 0.75rem)",
                color: "var(--accent)",
                letterSpacing: "0.02em",
              }}
            >
              {member.role}
            </p>
          </div>
          {socials.length > 0 && (
            <div className="flex items-center flex-wrap" style={{ gap: "2px", flexShrink: 0 }}>
              {socials.map((s) => (
                <SocialBadge key={s.key} href={s.href} label={`${member.name} ${s.key}`}>
                  {s.icon}
                </SocialBadge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Year Selector ─────────────────────── */
function YearSelector({
  years,
  selectedYear,
  onSelect,
}: {
  years: { year: string; isCurrent: boolean }[];
  selectedYear: string;
  onSelect: (year: string) => void;
}) {
  return (
    <div
      className="sticky top-[72px] z-30 border-b overflow-x-auto"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container-site flex gap-0">
        {years.map((y) => (
          <button
            key={y.year}
            onClick={() => onSelect(y.year)}
            className="relative px-5 py-4 font-mono text-sm transition-colors duration-200 whitespace-nowrap"
            style={{
              color:
                selectedYear === y.year
                  ? "var(--accent)"
                  : "var(--text-secondary)",
              fontWeight: selectedYear === y.year ? 600 : 400,
            }}
          >
            {y.year}
            {y.isCurrent && (
              <span
                className="ml-2 text-[0.6rem] font-bold px-1.5 py-0.5 rounded-sm"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                CURRENT
              </span>
            )}
            {selectedYear === y.year && (
              <span
                className="absolute bottom-0 left-0 w-full h-[2px]"
                style={{ backgroundColor: "var(--accent)" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main Team Content (uses searchParams) ─ */
function TeamContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTeam = teams.find((t) => t.isCurrent);
  const defaultYear = currentTeam?.year || teams[0]?.year || "2025";
  const yearParam = searchParams.get("year");
  const [selectedYear, setSelectedYear] = useState(yearParam || defaultYear);

  useEffect(() => {
    if (yearParam && yearParam !== selectedYear) {
      setSelectedYear(yearParam);
    }
  }, [yearParam, selectedYear]);

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    router.push(`/team?year=${year}`, { scroll: false });
  };

  const selectedTeam = useMemo(() => {
    return teams.find((t) => t.year === selectedYear);
  }, [selectedYear]);

  const grouped = useMemo(() => {
    if (!selectedTeam || selectedTeam.members.length === 0) return {};
    const groups: Record<string, Member[]> = {};
    const order = ["Executive", "Technical", "Creative", "Operations"];
    for (const g of order) {
      const members = selectedTeam.members.filter((m) => m.roleGroup === g);
      if (members.length > 0) groups[g] = members;
    }
    return groups;
  }, [selectedTeam]);

  const years = teams.map((t) => ({ year: t.year, isCurrent: t.isCurrent }));
  const hasMembers = selectedTeam && selectedTeam.members.length > 0;

  return (
    <>
      {/* Hero */}
      <section
        className="relative w-full"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div
          className="container-site flex flex-col justify-center"
          style={{ minHeight: "50vh", paddingTop: "var(--navbar-height)" }}
        >
          <span className="mono-label mb-4">// TEAM</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            the <span style={{ color: "var(--accent)" }}>people</span>
          </h1>
          <p
            className="mt-4"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "480px",
            }}
          >
            Every version of this chapter. Every person who built it.
          </p>
        </div>
      </section>

      {/* Year Selector */}
      <YearSelector
        years={years}
        selectedYear={selectedYear}
        onSelect={handleYearSelect}
      />

      {/* Team Grid */}
      <section className="container-site section-padding">
        {hasMembers ? (
          Object.entries(grouped).map(([group, members]) => (
            <div key={group} className="mb-12 last:mb-0">
              <h3
                className="font-display mb-6 pb-3 border-b"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                {group}
              </h3>
              <div className="grid grid-cols-2 mobile:grid-cols-3 tablet:grid-cols-4 gap-6">
                {members.map((member) => (
                  <TeamCard key={member.name + member.role} member={member} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <p
              className="font-display text-lg mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              No team data for this year yet.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              Team data for {selectedYear} will be added through the admin panel.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

/* ── Page (Suspense for searchParams) ──── */
export default function TeamPage() {
  return (
    <PageTransition>
      <Suspense
        fallback={
          <div
            className="container-site flex items-center justify-center"
            style={{ minHeight: "100vh", paddingTop: "var(--navbar-height)" }}
          >
            <span className="mono-label">Loading team...</span>
          </div>
        }
      >
        <TeamContent />
      </Suspense>
    </PageTransition>
  );
}
