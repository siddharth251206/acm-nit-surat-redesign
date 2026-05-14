"use client";

import homepageData from "@/data/homepage.json";

export default function Testimonials() {
  const testimonials = homepageData.testimonials;

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="container-site section-padding">
      <span className="mono-label mb-4 block">// TESTIMONIALS</span>
      <h2
        className="font-display mb-12"
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
        }}
      >
        what they <span style={{ color: "var(--accent)" }}>say</span>
      </h2>

      <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="relative p-6 rounded-md border-subtle-hover"
            style={{
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            {/* Opening quote mark */}
            <span
              className="font-display absolute"
              style={{
                fontSize: "3rem",
                color: "var(--accent)",
                opacity: 0.3,
                top: "12px",
                left: "16px",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              &ldquo;
            </span>

            <p
              className="relative"
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                paddingTop: "1.5rem",
                fontStyle: "italic",
              }}
            >
              {t.quote}
            </p>

            {/* Author line */}
            <div className="mt-5 flex items-center gap-3">
              <div
                style={{
                  width: "28px",
                  height: "2px",
                  backgroundColor: "var(--accent)",
                  borderRadius: "1px",
                }}
              />
              <span
                className="font-display"
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {t.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
