"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Calendar, MapPin, X, ArrowRight } from "lucide-react";
import PageTransition from "@/components/motion/PageTransition";
import eventsData from "@/data/events.json";
import MobileHeroPills from "@/components/sections/MobileHeroPills";

interface EventItem {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  description: string;
  fullDescription?: string;
  images?: string[];
  coverGradient?: string;
  image?: string;
  registrationUrl?: string;
  tags?: string[];
  isUpcoming?: boolean;
  instagramUrl?: string;
}

const typedEventsData = eventsData as EventItem[];

const WireframeBackground = dynamic(
  () => import("@/components/three/WireframeBackground"),
  { ssr: false }
);

const eventTypes = ["All", "Workshop", "Hackathon", "Talk", "Competition"];

/* ── Event Detail Modal (Portal) ── */
function EventModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const hasImages = event.images && event.images.length > 0;
  const hasRegUrl = event.registrationUrl && event.registrationUrl.trim() !== "";

  const modalContent = (
    /* Overlay */
    <div
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh", zIndex: 999999,
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.25s ease-out",
      }}
      onClick={onClose}
    >
      {/* Panel */}
      <div
        data-modal-panel
        style={{
          maxWidth: "680px", width: "90vw",
          maxHeight: "85vh", overflowY: "auto",
          backgroundColor: "#111111",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "8px",
          padding: "2.5rem",
          animation: "slideUp 0.25s ease-out",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
          <div style={{ flex: 1, paddingRight: "1rem" }}>
            <span
              className="font-mono"
              style={{ fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              {event.type}
            </span>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.4rem, 4vw, 1.75rem)", fontWeight: 700, lineHeight: 1.15, marginTop: "6px", color: "var(--text-primary)" }}
            >
              {event.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text-muted)", fontSize: "1.2rem", lineHeight: 1,
              flexShrink: 0, padding: "4px",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Meta Row */}
        <div
          className="font-mono"
          style={{
            display: "flex", gap: "2rem", flexWrap: "wrap",
            fontSize: "0.8rem", color: "var(--text-muted)",
            paddingBottom: "1rem",
            borderBottom: "1px solid var(--border)",
            marginBottom: "1.5rem",
          }}
        >
          <span className="flex items-center gap-2">
            <Calendar size={13} /> {formattedDate}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={13} /> {event.location}
          </span>
        </div>

        {/* Image Strip */}
        {hasImages && (
          <div
            style={{
              display: "flex", gap: "0.75rem",
              overflowX: "auto", marginBottom: "1.5rem",
              scrollbarWidth: "none",
            }}
          >
            {event.images!.map((src, i) => (
              <div key={i} style={{ position: "relative", height: "180px", minWidth: "240px", flexShrink: 0, borderRadius: "6px", overflow: "hidden" }}>
                <Image src={src} alt={`${event.title} photo ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="240px" />
              </div>
            ))}
          </div>
        )}

        {/* About */}
        <div>
          <span
            className="font-mono"
            style={{ fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}
          >
            About the event
          </span>
          <p
            className="font-body"
            style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "var(--text-secondary)" }}
          >
            {event.fullDescription || event.description}
          </p>
        </div>

        {/* Register Button */}
        {hasRegUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", marginTop: "2rem",
              backgroundColor: "var(--accent)", color: "#fff",
              textAlign: "center", borderRadius: "6px",
              padding: "12px", fontWeight: 600, fontSize: "0.875rem",
              fontFamily: "var(--font-display)",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            Register Now →
          </a>
        )}
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.body);
}

/* ── Main Page ── */
export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filtered = useMemo(() => {
    // Sort descending (latest first)
    const sorted = [...typedEventsData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (activeFilter === "All") return sorted;
    return sorted.filter((e) => e.type === activeFilter);
  }, [activeFilter]);

  const upcomingEvents = useMemo(() => filtered.filter((e) => e.isUpcoming), [filtered]);
  const pastEvents = useMemo(() => filtered.filter((e) => !e.isUpcoming), [filtered]);

  const renderCard = (event: EventItem) => (
    <div key={event.id} className="relative transition-all duration-300">
      <div
        className="polaroid-card cursor-pointer"
        onClick={() => setSelectedEvent(event)}
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
      </div>
    </div>
  );

  return (
    <PageTransition>
      {/* Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {/* Hero */}
      <section
        className="relative w-full"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <WireframeBackground opacity={0.4} speed={0.4} />
        <div
          className="relative z-10 container-site flex flex-col justify-center"
          style={{ minHeight: "50vh", paddingTop: "var(--navbar-height)" }}
        >
          <span className="mono-label mb-4">// EVENTS</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: "var(--accent)" }}>events</span>
          </h1>
          <MobileHeroPills
            pills={["20+ Events", "Since 2005", "Open to All"]}
            descriptor="Workshops, hackathons, and competitions."
          />
          <p
            className="mt-4"
            style={{ color: "var(--text-secondary)", maxWidth: "480px" }}
          >
            {typedEventsData.length} events hosted and counting. Workshops,
            hackathons, guest lectures, and more.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div
        className="sticky top-[72px] z-30 border-b"
        style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border)" }}
      >
        <div className="container-site flex gap-2 py-4 overflow-x-auto">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className="px-4 py-2 text-sm font-body font-medium rounded-full whitespace-nowrap transition-all duration-200"
              style={{
                backgroundColor: activeFilter === type ? "var(--accent)" : "transparent",
                color: activeFilter === type ? "var(--bg-primary)" : "var(--text-secondary)",
                border: activeFilter === type ? "1px solid var(--accent)" : "1px solid var(--border)",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Gallery */}
      <section className="container-site section-padding">
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p style={{ color: "var(--text-muted)" }}>No events found for this filter.</p>
          </div>
        )}

        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display mb-8" style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--accent)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "var(--accent)", display: "inline-block", boxShadow: "0 0 10px var(--accent)" }}></span>
              Upcoming
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {upcomingEvents.map(renderCard)}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div>
            {upcomingEvents.length > 0 && (
              <h2 className="font-display mb-8" style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text-primary)" }}>
                Past Events
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {pastEvents.map(renderCard)}
            </div>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
