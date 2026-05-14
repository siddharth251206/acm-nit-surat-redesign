"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import PageTransition from "@/components/motion/PageTransition";
import eventsData from "@/data/events.json";

interface EventItem {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  description: string;
  coverGradient?: string;
  image?: string;
  registrationUrl?: string;
  tags?: string[];
}

const typedEventsData = eventsData as EventItem[];

const WireframeBackground = dynamic(
  () => import("@/components/three/WireframeBackground"),
  { ssr: false }
);

const eventTypes = ["All", "Workshop", "Hackathon", "Talk", "Competition"];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    const sorted = [...typedEventsData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (activeFilter === "All") return sorted;
    return sorted.filter((e) => e.type === activeFilter);
  }, [activeFilter]);

  return (
    <PageTransition>
      <section
        className="relative w-full"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <WireframeBackground opacity={0.2} speed={0.4} />
        <div
          className="container-site flex flex-col justify-center"
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
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border)",
        }}
      >
        <div className="container-site flex gap-2 py-4 overflow-x-auto">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className="px-4 py-2 text-sm font-body font-medium rounded-full whitespace-nowrap transition-all duration-200"
              style={{
                backgroundColor:
                  activeFilter === type
                    ? "var(--accent)"
                    : "transparent",
                color:
                  activeFilter === type
                    ? "var(--bg-primary)"
                    : "var(--text-secondary)",
                border:
                  activeFilter === type
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border)",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <section className="container-site section-padding">
        <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <article
              key={event.id}
              className="group rounded-md overflow-hidden border-subtle-hover transition-all duration-300 hover:-translate-y-2"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              {/* Cover */}
              {event.image ? (
                <div className="relative h-44 w-full">
                  <Image src={event.image} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              ) : (
                <div
                  className="h-44 w-full"
                  style={{ background: event.coverGradient }}
                />
              )}

              {/* Content */}
              <div className="p-6">
                <span className="tag mb-3">{event.type}</span>
                <h3
                  className="font-display mt-3 mb-2"
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {event.title}
                </h3>
                <div
                  className="flex items-center gap-4 mb-3"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                  }}
                >
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {event.location}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {event.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p style={{ color: "var(--text-muted)" }}>
              No events found for this filter.
            </p>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
