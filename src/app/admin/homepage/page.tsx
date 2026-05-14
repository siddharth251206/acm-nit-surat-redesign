"use client";

import { useEffect, useState, useCallback } from "react";
import { useToast } from "../components/Toast";

interface EventItem { title: string; description: string; }
interface FAQItem { question: string; answer: string; }
interface BenefitItem { title: string; description: string; }
interface Testimonial { quote: string; name: string; }
interface HomepageData {
  whatWeDo: {
    events: EventItem[];
    faqs: FAQItem[];
    benefits: BenefitItem[];
  };
  testimonials: Testimonial[];
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.75rem", backgroundColor: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#f5f0e8", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" };
const textareaStyle: React.CSSProperties = { ...inputStyle, minHeight: "80px", resize: "vertical" as const };
const labelStyle: React.CSSProperties = { fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px", fontWeight: 500 };
const cardStyle: React.CSSProperties = { padding: "1rem", backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", marginBottom: "0.75rem" };
const deleteBtn: React.CSSProperties = { padding: "0.3rem 0.75rem", borderRadius: "4px", border: "1px solid rgba(255,80,80,0.3)", backgroundColor: "transparent", color: "#ff5050", fontSize: "0.75rem", cursor: "pointer" };
const addBtn: React.CSSProperties = { padding: "0.4rem 1rem", borderRadius: "6px", border: "1px dashed rgba(255,255,255,0.15)", backgroundColor: "transparent", color: "#888", fontSize: "0.8rem", cursor: "pointer", width: "100%" };

export default function HomepageAdmin() {
  const [data, setData] = useState<HomepageData | null>(null);
  const { showToast } = useToast();

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/data?file=homepage");
    if (res.ok) setData(await res.json());
  }, []);
  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!data) return;
    const res = await fetch("/api/admin/data?file=homepage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) showToast("Homepage data saved!");
    else showToast("Failed to save", "error");
  };

  if (!data) return <p style={{ color: "#888" }}>Loading...</p>;

  const updateEvent = (i: number, field: keyof EventItem, val: string) => {
    const events = [...data.whatWeDo.events];
    events[i] = { ...events[i], [field]: val };
    setData({ ...data, whatWeDo: { ...data.whatWeDo, events } });
  };
  const addEvent = () => {
    setData({ ...data, whatWeDo: { ...data.whatWeDo, events: [...data.whatWeDo.events, { title: "", description: "" }] } });
  };
  const removeEvent = (i: number) => {
    setData({ ...data, whatWeDo: { ...data.whatWeDo, events: data.whatWeDo.events.filter((_, idx) => idx !== i) } });
  };

  const updateFaq = (i: number, field: keyof FAQItem, val: string) => {
    const faqs = [...data.whatWeDo.faqs];
    faqs[i] = { ...faqs[i], [field]: val };
    setData({ ...data, whatWeDo: { ...data.whatWeDo, faqs } });
  };
  const addFaq = () => {
    setData({ ...data, whatWeDo: { ...data.whatWeDo, faqs: [...data.whatWeDo.faqs, { question: "", answer: "" }] } });
  };
  const removeFaq = (i: number) => {
    setData({ ...data, whatWeDo: { ...data.whatWeDo, faqs: data.whatWeDo.faqs.filter((_, idx) => idx !== i) } });
  };

  const updateBenefit = (i: number, field: keyof BenefitItem, val: string) => {
    const benefits = [...data.whatWeDo.benefits];
    benefits[i] = { ...benefits[i], [field]: val };
    setData({ ...data, whatWeDo: { ...data.whatWeDo, benefits } });
  };
  const addBenefit = () => {
    setData({ ...data, whatWeDo: { ...data.whatWeDo, benefits: [...data.whatWeDo.benefits, { title: "", description: "" }] } });
  };
  const removeBenefit = (i: number) => {
    setData({ ...data, whatWeDo: { ...data.whatWeDo, benefits: data.whatWeDo.benefits.filter((_, idx) => idx !== i) } });
  };

  const updateTestimonial = (i: number, field: keyof Testimonial, val: string) => {
    const t = [...data.testimonials];
    t[i] = { ...t[i], [field]: val };
    setData({ ...data, testimonials: t });
  };
  const addTestimonial = () => {
    setData({ ...data, testimonials: [...data.testimonials, { quote: "", name: "" }] });
  };
  const removeTestimonial = (i: number) => {
    setData({ ...data, testimonials: data.testimonials.filter((_, idx) => idx !== i) });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Homepage Content</h1>
        <button onClick={save} style={{ padding: "0.5rem 1.25rem", borderRadius: "6px", border: "none", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", backgroundColor: "#E8593C", color: "#fff" }}>
          Save Changes
        </button>
      </div>

      <div style={{ maxWidth: "720px" }}>
        {/* ── Events ── */}
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#888", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          Events (What We Do)
        </h2>
        {data.whatWeDo.events.map((item, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label style={labelStyle}>Event {i + 1}</label>
              <button style={deleteBtn} onClick={() => removeEvent(i)}>Remove</button>
            </div>
            <div style={{ marginBottom: "0.5rem" }}><label style={labelStyle}>Title</label><input style={inputStyle} value={item.title} onChange={(e) => updateEvent(i, "title", e.target.value)} /></div>
            <div><label style={labelStyle}>Description</label><textarea style={textareaStyle} value={item.description} onChange={(e) => updateEvent(i, "description", e.target.value)} /></div>
          </div>
        ))}
        <button style={addBtn} onClick={addEvent}>+ Add Event</button>

        {/* ── FAQs ── */}
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#888", marginTop: "2rem", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          FAQs
        </h2>
        {data.whatWeDo.faqs.map((faq, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label style={labelStyle}>FAQ {i + 1}</label>
              <button style={deleteBtn} onClick={() => removeFaq(i)}>Remove</button>
            </div>
            <div style={{ marginBottom: "0.5rem" }}><label style={labelStyle}>Question</label><input style={inputStyle} value={faq.question} onChange={(e) => updateFaq(i, "question", e.target.value)} /></div>
            <div><label style={labelStyle}>Answer</label><textarea style={textareaStyle} value={faq.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)} /></div>
          </div>
        ))}
        <button style={addBtn} onClick={addFaq}>+ Add FAQ</button>

        {/* ── Benefits ── */}
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#888", marginTop: "2rem", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          Benefits
        </h2>
        {data.whatWeDo.benefits.map((item, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label style={labelStyle}>Benefit {i + 1}</label>
              <button style={deleteBtn} onClick={() => removeBenefit(i)}>Remove</button>
            </div>
            <div style={{ marginBottom: "0.5rem" }}><label style={labelStyle}>Title</label><input style={inputStyle} value={item.title} onChange={(e) => updateBenefit(i, "title", e.target.value)} /></div>
            <div><label style={labelStyle}>Description</label><textarea style={textareaStyle} value={item.description} onChange={(e) => updateBenefit(i, "description", e.target.value)} /></div>
          </div>
        ))}
        <button style={addBtn} onClick={addBenefit}>+ Add Benefit</button>

        {/* ── Testimonials ── */}
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#888", marginTop: "2rem", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          Testimonials
        </h2>
        {data.testimonials.map((t, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label style={labelStyle}>Testimonial {i + 1}</label>
              <button style={deleteBtn} onClick={() => removeTestimonial(i)}>Remove</button>
            </div>
            <div style={{ marginBottom: "0.5rem" }}><label style={labelStyle}>Name</label><input style={inputStyle} value={t.name} onChange={(e) => updateTestimonial(i, "name", e.target.value)} /></div>
            <div><label style={labelStyle}>Quote</label><textarea style={textareaStyle} value={t.quote} onChange={(e) => updateTestimonial(i, "quote", e.target.value)} /></div>
          </div>
        ))}
        <button style={addBtn} onClick={addTestimonial}>+ Add Testimonial</button>

        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "2rem", paddingBottom: "2rem" }}>
          <button onClick={save} style={{ padding: "0.5rem 1.25rem", borderRadius: "6px", border: "none", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", backgroundColor: "#E8593C", color: "#fff" }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
