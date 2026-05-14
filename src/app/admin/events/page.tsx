"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

interface Event {
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

const EVENT_TYPES = ["Workshop", "Hackathon", "Talk", "Competition", "Other"];
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.75rem", backgroundColor: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#f5f0e8", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" };
const btnStyle: React.CSSProperties = { padding: "0.5rem 1rem", borderRadius: "6px", border: "none", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.375rem" };

export default function EventsAdmin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const { showToast } = useToast();

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/data?file=events");
    if (res.ok) setEvents(await res.json());
  }, []);
  useEffect(() => { load(); }, [load]);

  const save = async (data: Event[]) => {
    const res = await fetch("/api/admin/data?file=events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { setEvents(data); showToast("Events saved!"); } else showToast("Failed to save", "error");
  };

  const openNew = () => {
    setEditing({ id: `event-${Date.now()}`, title: "", type: "Workshop", date: new Date().toISOString().split("T")[0], location: "SVNIT Campus", description: "", coverGradient: "linear-gradient(135deg, #1a1a2e, #e8593c22)", tags: [] });
    setIsNew(true);
    setTagInput("");
  };

  const saveEvent = () => {
    if (!editing || !editing.title || !editing.date) { showToast("Title and Date required", "error"); return; }
    const updated = isNew ? [editing, ...events] : events.map((e) => (e.id === editing.id ? editing : e));
    save(updated);
    setEditing(null);
    setIsNew(false);
  };

  const deleteEvent = () => {
    if (!deleteId) return;
    save(events.filter((e) => e.id !== deleteId));
    setDeleteId(null);
  };

  const addTag = () => {
    if (!editing || !tagInput.trim()) return;
    setEditing({ ...editing, tags: [...(editing.tags || []), tagInput.trim()] });
    setTagInput("");
  };

  const removeTag = (index: number) => {
    if (!editing) return;
    setEditing({ ...editing, tags: (editing.tags || []).filter((_, i) => i !== index) });
  };

  if (editing) {
    return (
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>{isNew ? "Add Event" : "Edit Event"}</h1>
        <div style={{ maxWidth: "640px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Title *</label><input style={inputStyle} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Type *</label><select style={{ ...inputStyle, cursor: "pointer" }} value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}>{EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Date *</label><input type="date" style={inputStyle} value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></div>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Location *</label><input style={inputStyle} value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></div>
          </div>
          <div style={{ marginBottom: "0.75rem" }}><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Description *</label><textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Cover Gradient</label><input style={inputStyle} value={editing.coverGradient || ""} onChange={(e) => setEditing({ ...editing, coverGradient: e.target.value })} /></div>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Image URL</label><input style={inputStyle} value={editing.image || ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="/images/event.jpg" /></div>
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Registration URL</label><input style={inputStyle} value={editing.registrationUrl || ""} onChange={(e) => setEditing({ ...editing, registrationUrl: e.target.value })} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Tags</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.5rem" }}>
              {(editing.tags || []).map((tag, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "4px", backgroundColor: "rgba(232,89,60,0.1)", color: "#E8593C", fontSize: "0.75rem" }}>
                  {tag} <X size={12} style={{ cursor: "pointer" }} onClick={() => removeTag(i)} />
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input style={{ ...inputStyle, flex: 1 }} value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add tag..." onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} />
              <button onClick={addTag} style={{ ...btnStyle, backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#888" }}>Add</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ ...btnStyle, backgroundColor: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }}>Cancel</button>
            <button onClick={saveEvent} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}>Save Event</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Events</h1>
        <button onClick={openNew} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}><Plus size={14} /> Add Event</button>
      </div>
      {events.map((event) => (
        <div key={event.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", backgroundColor: "#111", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.04)", marginBottom: "0.5rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 500 }}>{event.title}</p>
            <p style={{ fontSize: "0.7rem", color: "#888" }}>{event.type} • {event.date} • {event.location}</p>
          </div>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <button onClick={() => { setEditing(event); setIsNew(false); setTagInput(""); }} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#888" }}><Pencil size={14} /></button>
            <button onClick={() => setDeleteId(event.id)} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#ef4444" }}><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <ConfirmDialog open={!!deleteId} message="Are you sure you want to delete this event? This cannot be undone." onConfirm={deleteEvent} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
