import React from "react";

interface MobileHeroPillsProps {
  pills: string[];
  descriptor: string;
  cta?: { label: string; href: string };
}

const pillStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  color: "var(--text-secondary)",
  border: "1px solid var(--border)",
  borderRadius: "20px",
  padding: "6px 14px",
  whiteSpace: "nowrap",
  display: "inline-flex",
  fontFamily: "var(--font-mono)",
};

export default function MobileHeroPills({ pills, descriptor, cta }: MobileHeroPillsProps) {
  return (
    <div className="md:hidden mt-6">
      {/* Stat pills */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "4px",
          scrollbarWidth: "none",
        }}
      >
        {pills.map((pill) => (
          <span key={pill} style={pillStyle}>{pill}</span>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: "40px",
          height: "1px",
          backgroundColor: "var(--border)",
          margin: "1.5rem auto",
        }}
      />

      {/* Descriptor */}
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          textAlign: "center",
          maxWidth: "280px",
          margin: "0 auto",
          fontFamily: "var(--font-body)",
        }}
      >
        {descriptor}
      </p>

      {/* Optional CTA */}
      {cta && (
        <a
          href={cta.href}
          style={{
            display: "block",
            margin: "1.5rem auto 0",
            width: "fit-content",
            padding: "10px 20px",
            backgroundColor: "var(--accent)",
            color: "#fff",
            borderRadius: "100px",
            fontSize: "0.8rem",
            fontWeight: 600,
            textDecoration: "none",
            textAlign: "center",
            fontFamily: "var(--font-body)",
          }}
        >
          {cta.label}
        </a>
      )}
    </div>
  );
}
