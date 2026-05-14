"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

interface Project {
  id: string;
  name: string;
  domain: string;
  description: string;
  techStack: string[];
  github: string;
  demo: string | null;
  contributors: number;
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.75rem", backgroundColor: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#f5f0e8", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" };
const btnStyle: React.CSSProperties = { padding: "0.5rem 1rem", borderRadius: "6px", border: "none", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.375rem" };

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");
  const { showToast } = useToast();

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/data?file=projects");
    if (res.ok) setProjects(await res.json());
  }, []);
  useEffect(() => { load(); }, [load]);

  const save = async (data: Project[]) => {
    const res = await fetch("/api/admin/data?file=projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { setProjects(data); showToast("Projects saved!"); } else showToast("Failed to save", "error");
  };

  const openNew = () => {
    setEditing({ id: `proj-${Date.now()}`, name: "", domain: "", description: "", techStack: [], github: "", demo: null, contributors: 1 });
    setIsNew(true);
    setTechInput("");
  };

  const saveProject = () => {
    if (!editing || !editing.name || !editing.domain) { showToast("Name and Domain required", "error"); return; }
    const updated = isNew ? [...projects, editing] : projects.map((p) => (p.id === editing.id ? editing : p));
    save(updated);
    setEditing(null);
    setIsNew(false);
  };

  const deleteProject = () => {
    if (!deleteId) return;
    save(projects.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  if (editing) {
    return (
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>{isNew ? "Add Project" : "Edit Project"}</h1>
        <div style={{ maxWidth: "640px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Name *</label><input style={inputStyle} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Domain *</label><input style={inputStyle} value={editing.domain} onChange={(e) => setEditing({ ...editing, domain: e.target.value })} placeholder="e.g. Web Development" /></div>
          </div>
          <div style={{ marginBottom: "0.75rem" }}><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Description *</label><textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Tech Stack</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.5rem" }}>
              {editing.techStack.map((t, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "4px", backgroundColor: "rgba(232,89,60,0.1)", color: "#E8593C", fontSize: "0.75rem" }}>
                  {t} <X size={12} style={{ cursor: "pointer" }} onClick={() => setEditing({ ...editing, techStack: editing.techStack.filter((_, j) => j !== i) })} />
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input style={{ ...inputStyle, flex: 1 }} value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Add tech..." onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (techInput.trim()) { setEditing({ ...editing, techStack: [...editing.techStack, techInput.trim()] }); setTechInput(""); } } }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>GitHub URL</label><input style={inputStyle} value={editing.github} onChange={(e) => setEditing({ ...editing, github: e.target.value })} /></div>
            <div><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Demo URL</label><input style={inputStyle} value={editing.demo || ""} onChange={(e) => setEditing({ ...editing, demo: e.target.value || null })} /></div>
          </div>
          <div style={{ marginBottom: "1rem" }}><label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Contributors</label><input type="number" style={{ ...inputStyle, width: "100px" }} value={editing.contributors} onChange={(e) => setEditing({ ...editing, contributors: parseInt(e.target.value) || 0 })} /></div>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ ...btnStyle, backgroundColor: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }}>Cancel</button>
            <button onClick={saveProject} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}>Save Project</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Projects</h1>
        <button onClick={openNew} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}><Plus size={14} /> Add Project</button>
      </div>
      {projects.map((project) => (
        <div key={project.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", backgroundColor: "#111", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.04)", marginBottom: "0.5rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 500 }}>{project.name}</p>
            <p style={{ fontSize: "0.7rem", color: "#888" }}>{project.domain} • {project.techStack.slice(0, 3).join(", ")}</p>
          </div>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <button onClick={() => { setEditing(project); setIsNew(false); setTechInput(""); }} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#888" }}><Pencil size={14} /></button>
            <button onClick={() => setDeleteId(project.id)} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#ef4444" }}><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <ConfirmDialog open={!!deleteId} message="Are you sure you want to delete this project?" onConfirm={deleteProject} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
