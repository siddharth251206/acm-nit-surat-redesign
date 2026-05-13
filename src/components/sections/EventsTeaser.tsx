"use client";

import TransitionLink from "@/components/motion/TransitionLink";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
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
        <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 gap-6">
          {recentEvents.map((event) => (
            <article
              key={event.id}
              className="group rounded-md overflow-hidden border-subtle-hover transition-transform duration-300 hover:-translate-y-2"
              style={{ backgroundColor: "var(--bg-tertiary)" }}
            >
              {/* Cover */}
              <div
                className="h-40 w-full"
                style={{ background: event.coverGradient }}
              />

              {/* Content */}
              <div className="p-5">
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
                  style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}
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
                    lineHeight: 1.5,
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
      </div>
    </section>
  );
}
