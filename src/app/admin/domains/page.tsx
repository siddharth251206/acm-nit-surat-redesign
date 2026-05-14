"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

interface Domain {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  description: string;
  projects: string[];
  technologies: string[];
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.75rem", backgroundColor: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#f5f0e8", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" };
const btnStyle: React.CSSProperties = { padding: "0.5rem 1rem", borderRadius: "6px", border: "none", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.375rem" };

export default function DomainsAdmin() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [editing, setEditing] = useState<Domain | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/data?file=domains");
    if (res.ok) setDomains(await res.json());
  }, []);
  useEffect(() => { load(); }, [load]);

  const save = async (data: Domain[]) => {
    const res = await fetch("/api/admin/data?file=domains", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { setDomains(data); showToast("Domains saved!"); } else showToast("Failed to save", "error");
  };

  const move = (index: number, dir: "up" | "down") => {
    const target = dir === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= domains.length) return;
    const updated = [...domains];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    save(updated);
  };

  const openNew = () => {
    setEditing({ id: `domain-${Date.now()}`, name: "", icon: "Code", shortDescription: "", description: "", projects: [], technologies: [] });
    setIsNew(true);
  };

  const saveDomain = () => {
    if (!editing || !editing.name) { showToast("Name is required", "error"); return; }
    const updated = isNew ? [...domains, editing] : domains.map((d) => (d.id === editing.id ? editing : d));
    save(updated);
    setEditing(null);
    setIsNew(false);
  };

  if (editing) {
    return (
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>{isNew ? "Add Domain" : "Edit Domain"}</h1>
        <div style={{ maxWidth: "640px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Name *</label><input style={inputStyle} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Icon name (Lucide)</label><input style={inputStyle} value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="e.g. Brain, Globe, Shield" /></div>
          </div>
          <div style={{ marginBottom: "0.75rem" }}><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Short Description</label><input style={inputStyle} value={editing.shortDescription} onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })} /></div>
          <div style={{ marginBottom: "0.75rem" }}><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Full Description</label><textarea style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div style={{ marginBottom: "0.75rem" }}><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Technologies (comma-separated)</label><input style={inputStyle} value={editing.technologies.join(", ")} onChange={(e) => setEditing({ ...editing, technologies: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} /></div>
          <div style={{ marginBottom: "1rem" }}><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Projects (comma-separated)</label><input style={inputStyle} value={editing.projects.join(", ")} onChange={(e) => setEditing({ ...editing, projects: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} /></div>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ ...btnStyle, backgroundColor: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }}>Cancel</button>
            <button onClick={saveDomain} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}>Save Domain</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Domains</h1>
        <button onClick={openNew} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}><Plus size={14} /> Add Domain</button>
      </div>
      {domains.map((domain, i) => (
        <div key={domain.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", backgroundColor: "#111", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.04)", marginBottom: "0.5rem" }}>
          <div style={{ flex: 1 }}><p style={{ fontSize: "0.85rem", fontWeight: 500 }}>{domain.name}</p><p style={{ fontSize: "0.7rem", color: "#888" }}>Icon: {domain.icon}</p></div>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <button onClick={() => move(i, "up")} disabled={i === 0} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: i === 0 ? "#333" : "#888" }}><ArrowUp size={14} /></button>
            <button onClick={() => move(i, "down")} disabled={i === domains.length - 1} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: i === domains.length - 1 ? "#333" : "#888" }}><ArrowDown size={14} /></button>
            <button onClick={() => { setEditing(domain); setIsNew(false); }} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#888" }}><Pencil size={14} /></button>
            <button onClick={() => setDeleteId(domain.id)} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#ef4444" }}><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <ConfirmDialog open={!!deleteId} message="Delete this domain?" onConfirm={() => { save(domains.filter((d) => d.id !== deleteId)); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
