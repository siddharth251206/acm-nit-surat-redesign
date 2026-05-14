"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

interface Milestone {
  year: number;
  title: string;
  description: string;
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.75rem", backgroundColor: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#f5f0e8", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" };
const btnStyle: React.CSSProperties = { padding: "0.5rem 1rem", borderRadius: "6px", border: "none", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.375rem" };

export default function TimelineAdmin() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [editing, setEditing] = useState<Milestone | null>(null);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isNew, setIsNew] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const { showToast } = useToast();

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/data?file=timeline");
    if (res.ok) {
      const data = await res.json();
      setMilestones(data.sort((a: Milestone, b: Milestone) => a.year - b.year));
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  const save = async (data: Milestone[]) => {
    const sorted = [...data].sort((a, b) => a.year - b.year);
    const res = await fetch("/api/admin/data?file=timeline", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sorted) });
    if (res.ok) { setMilestones(sorted); showToast("Timeline saved!"); } else showToast("Failed to save", "error");
  };

  const openNew = () => {
    setEditing({ year: new Date().getFullYear(), title: "", description: "" });
    setIsNew(true);
    setEditingIndex(-1);
  };

  const saveMilestone = () => {
    if (!editing || !editing.title) { showToast("Title is required", "error"); return; }
    const updated = isNew ? [...milestones, editing] : milestones.map((m, i) => (i === editingIndex ? editing : m));
    save(updated);
    setEditing(null);
    setIsNew(false);
    setEditingIndex(-1);
  };

  if (editing) {
    return (
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>{isNew ? "Add Milestone" : "Edit Milestone"}</h1>
        <div style={{ maxWidth: "480px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Year *</label><input type="number" style={inputStyle} value={editing.year} onChange={(e) => setEditing({ ...editing, year: parseInt(e.target.value) || 0 })} /></div>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Title *</label><input style={inputStyle} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
          </div>
          <div style={{ marginBottom: "1rem" }}><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Description</label><textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ ...btnStyle, backgroundColor: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }}>Cancel</button>
            <button onClick={saveMilestone} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Timeline</h1>
        <button onClick={openNew} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}><Plus size={14} /> Add Milestone</button>
      </div>
      {milestones.map((m, i) => (
        <div key={m.year + m.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", backgroundColor: "#111", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.04)", marginBottom: "0.5rem" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 500 }}><span style={{ color: "#E8593C", marginRight: "0.5rem" }}>{m.year}</span>{m.title}</p>
          </div>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <button onClick={() => { setEditing(m); setEditingIndex(i); setIsNew(false); }} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#888" }}><Pencil size={14} /></button>
            <button onClick={() => setDeleteIndex(i)} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#ef4444" }}><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <ConfirmDialog open={deleteIndex >= 0} message="Delete this milestone?" onConfirm={() => { save(milestones.filter((_, i) => i !== deleteIndex)); setDeleteIndex(-1); }} onCancel={() => setDeleteIndex(-1)} />
    </div>
  );
}
