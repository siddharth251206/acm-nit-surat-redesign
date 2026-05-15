"use client";

import TransitionLink from "@/components/motion/TransitionLink";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import eventsData from "@/data/events.json";

export default function EventsTeaser() {
  const recentEvents = eventsData.slice(0, 3);

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col mobile:flex-row items-start mobile:items-end justify-between gap-4 mb-12">
          <div>
            <span className="mono-label mb-4 block">// EVENTS</span>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
              }}
            >
              recent <span style={{ color: "var(--accent)" }}>events</span>
            </h2>
          </div>
          <TransitionLink href="/events" className="btn-outline">
            View all events <ArrowRight size={14} />
          </TransitionLink>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start mt-8">
          {recentEvents.map((event: any) => (
            <div key={event.id} className="relative transition-all duration-300">
              <TransitionLink
                href={`/events`}
                className="polaroid-card block"
              >
                {/* The tape element */}
                <div className="polaroid-tape" />

                {/* Thumbnail Area */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", backgroundColor: "var(--bg-tertiary)", overflow: "hidden", borderRadius: "2px" }}>
                  
                  {/* Cool Professional ACM Letterboxing Background */}
                  <div style={{ position: "absolute", inset: 0, opacity: 0.2, backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)", backgroundSize: "12px 12px", zIndex: 0 }} />
                  <div style={{ position: "absolute", inset: "-50%", display: "flex", flexWrap: "wrap", alignContent: "center", justifyContent: "center", gap: "1rem", opacity: 0.08, pointerEvents: "none", zIndex: 0, transform: "rotate(-30deg)" }}>
                    {Array.from({ length: 40 }).map((_, i) => (
                      <span key={i} className="font-display" style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent)", whiteSpace: "nowrap", letterSpacing: "0.1em" }}>
                        ACM SVNIT
                      </span>
                    ))}
                  </div>

                  {event.image ? (
                    <Image src={event.image} alt={event.title} fill style={{ objectFit: "contain", zIndex: 1 }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, background: event.coverGradient || "linear-gradient(135deg, #111, #222)", zIndex: 1 }} />
                  )}
                  
                  {/* Floating Type Badge */}
                  <div style={{ position: "absolute", bottom: "12px", right: "12px", zIndex: 10, backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", padding: "4px 8px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <span className="font-mono" style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{event.type}</span>
                  </div>
                </div>

                {/* Polaroid Caption / Plaque */}
                <div style={{ paddingTop: "1.25rem", paddingBottom: "0.25rem", paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
                  <h3
                    className="font-display mb-1"
                    style={{ fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.2, color: "var(--text-primary)" }}
                  >
                    {event.title}
                  </h3>
                  <div
                    className="font-mono mb-2 flex items-center flex-wrap gap-x-3 gap-y-1"
                    style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}
                  >
                    <span className="flex items-center gap-1">
                      <Calendar size={10} /> {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={10} /> {event.location}
                    </span>
                  </div>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.85rem", lineHeight: 1.5, color: "var(--text-secondary)",
                      overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    }}
                  >
                    {event.description}
                  </p>
                  {event.instagramUrl && (
                    <div className="mt-4">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(event.instagramUrl, "_blank", "noopener,noreferrer"); }}
                        className="inline-flex items-center gap-1.5 font-mono px-3 py-1.5 rounded bg-black/40 border border-white/10 hover:border-accent hover:text-accent transition-colors duration-200" 
                        style={{ fontSize: "0.7rem", color: "var(--text-secondary)", letterSpacing: "0.05em" }}
                      >
                        <span className="flex items-center gap-1.5 font-display tracking-wider font-bold">EXPLORE <ArrowRight size={14} /></span>
                      </button>
                    </div>
                  )}
                </div>
              </TransitionLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
