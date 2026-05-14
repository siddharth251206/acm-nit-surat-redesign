"use client";

import { useState } from "react";
import homepageData from "@/data/homepage.json";

const tabs = ["Events", "FAQs", "Benefits"] as const;
type Tab = (typeof tabs)[number];

export default function WhatWeDo() {
  const [activeTab, setActiveTab] = useState<Tab>("Events");

  return (
    <section
      className="section-padding border-t"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container-site">
        <span className="mono-label mb-4 block">// WHAT WE DO</span>
        <h2
          className="font-display mb-12"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
          }}
        >
          what we <span style={{ color: "var(--accent)" }}>do</span>
        </h2>

        {/* Tab Buttons */}
        <div
          className="flex mb-8"
          style={{
            borderBottom: "1px solid var(--border)",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="font-body transition-all duration-200"
                style={{
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  backgroundColor: isActive
                    ? "rgba(232,89,60,0.08)"
                    : "transparent",
                  border: "none",
                  borderBottom: isActive
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div
          style={{
            minHeight: "280px",
          }}
        >
          {/* Events Tab */}
          {activeTab === "Events" && (
            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
              {homepageData.whatWeDo.events.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-md border-subtle-hover"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                  }}
                >
                  <h3
                    className="font-display mb-3"
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === "FAQs" && (
            <div className="flex flex-col gap-3">
              {homepageData.whatWeDo.faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === "Benefits" && (
            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
              {homepageData.whatWeDo.benefits.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-md border-subtle-hover"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                  }}
                >
                  <div
                    className="mb-4"
                    style={{
                      width: "36px",
                      height: "3px",
                      backgroundColor: "var(--accent)",
                      borderRadius: "2px",
                    }}
                  />
                  <h3
                    className="font-display mb-3"
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ Accordion Item ── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-md overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left transition-colors duration-200"
        style={{
          padding: "1rem 1.25rem",
          cursor: "pointer",
          border: "none",
          backgroundColor: "transparent",
          color: "var(--text-primary)",
        }}
      >
        <span
          className="font-display"
          style={{ fontSize: "0.95rem", fontWeight: 500 }}
        >
          {question}
        </span>
        <span
          className="transition-transform duration-300"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: "var(--accent)",
            fontSize: "1.2rem",
            flexShrink: 0,
            marginLeft: "1rem",
          }}
        >
          ↓
        </span>
      </button>
      <div
        className="transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: open ? "300px" : "0",
          opacity: open ? 1 : 0,
        }}
      >
        <p
          style={{
            padding: "0 1.25rem 1rem 1.25rem",
            fontSize: "0.85rem",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}
