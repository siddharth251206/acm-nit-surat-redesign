"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Eye } from "lucide-react";
import { useToast } from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

interface Event {
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
}

const EVENT_TYPES = ["Workshop", "Hackathon", "Talk", "Competition", "Other"];
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.75rem", backgroundColor: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#f5f0e8", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" };
const btnStyle: React.CSSProperties = { padding: "0.5rem 1rem", borderRadius: "6px", border: "none", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.375rem" };
const labelStyle: React.CSSProperties = { fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" };

export default function EventsAdmin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleFileUpload = async (file: File, type: "thumbnail" | "gallery", index?: number) => {
    if (!editing) return;
    setUploading(true);
    showToast("Uploading image...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dir", "events");

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      
      if (res.ok && data.success) {
        if (type === "thumbnail") {
          setEditing({ ...editing, image: data.path });
        } else if (type === "gallery" && typeof index === "number") {
          const updated = [...(editing.images || [])];
          updated[index] = data.path;
          setEditing({ ...editing, images: updated });
        }
        showToast("Upload successful!");
      } else {
        showToast(data.error || "Upload failed", "error");
      }
    } catch (err) {
      showToast("Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const openNew = () => {
    setEditing({ id: `event-${Date.now()}`, title: "", type: "Workshop", date: new Date().toISOString().split("T")[0], location: "SVNIT Campus", description: "", fullDescription: "", images: [], coverGradient: "linear-gradient(135deg, #1a1a2e, #e8593c22)", registrationUrl: "", tags: [] });
    setIsNew(true);
    setTagInput("");
    setNewImageUrl("");
    setShowPreview(false);
  };

  const saveEvent = () => {
    if (!editing || !editing.title || !editing.date) { showToast("Title and Date required", "error"); return; }
    const updated = isNew ? [editing, ...events] : events.map((e) => (e.id === editing.id ? editing : e));
    save(updated);
    setEditing(null);
    setIsNew(false);
    setShowPreview(false);
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

  const addImageUrl = () => {
    if (!editing || !newImageUrl.trim()) return;
    setEditing({ ...editing, images: [...(editing.images || []), newImageUrl.trim()] });
    setNewImageUrl("");
  };

  const removeImage = (index: number) => {
    if (!editing) return;
    setEditing({ ...editing, images: (editing.images || []).filter((_, i) => i !== index) });
  };

  const updateImageUrl = (index: number, value: string) => {
    if (!editing) return;
    const updated = [...(editing.images || [])];
    updated[index] = value;
    setEditing({ ...editing, images: updated });
  };

  /* ── Preview modal ── */
  if (showPreview && editing) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Modal Preview</h2>
          <button onClick={() => setShowPreview(false)} style={{ ...btnStyle, backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#888" }}>← Back to Edit</button>
        </div>
        <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "2.5rem", backgroundColor: "#111", maxWidth: "680px" }}>
          <span style={{ fontSize: "0.7rem", color: "#E8593C", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>{editing.type}</span>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.15, marginTop: "6px", marginBottom: "1rem", color: "#f5f0e8" }}>{editing.title || "(No title)"}</h2>
          <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem", color: "#888", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
            <span>📅 {editing.date}</span>
            <span>📍 {editing.location}</span>
          </div>
          {(editing.images || []).length > 0 && (
            <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", marginBottom: "1.5rem" }}>
              {(editing.images || []).map((src, i) => (
                <div key={i} style={{ height: "180px", minWidth: "240px", flexShrink: 0, borderRadius: "6px", backgroundColor: "#222", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#888" }}>
                  {src ? src : "Image URL"}
                </div>
              ))}
            </div>
          )}
          <span style={{ fontSize: "0.7rem", color: "#E8593C", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>About the event</span>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "#888" }}>{editing.fullDescription || editing.description || "(No description)"}</p>
          {editing.registrationUrl && (
            <div style={{ marginTop: "2rem", padding: "12px", backgroundColor: "#E8593C", borderRadius: "6px", textAlign: "center", fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}>Register Now →</div>
          )}
        </div>
      </div>
    );
  }

  /* ── Edit form ── */
  if (editing) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{isNew ? "Add Event" : "Edit Event"}</h1>
          <button onClick={() => setShowPreview(true)} style={{ ...btnStyle, backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#aaa" }}>
            <Eye size={14} /> Preview Modal
          </button>
        </div>
        <div style={{ maxWidth: "640px" }}>
          {/* Title + Type */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div><label style={labelStyle}>Title *</label><input style={inputStyle} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
            <div><label style={labelStyle}>Type *</label><select style={{ ...inputStyle, cursor: "pointer" }} value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}>{EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
          </div>

          {/* Date + Location */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div><label style={labelStyle}>Date *</label><input type="date" style={inputStyle} value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></div>
            <div><label style={labelStyle}>Location *</label><input style={inputStyle} value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></div>
          </div>

          {/* Short Description */}
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Short Description * (shown in list, max 2 lines)</label>
            <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </div>

          {/* Full Description */}
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Full Description (shown in modal)</label>
            <textarea style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }} value={editing.fullDescription || ""} onChange={(e) => setEditing({ ...editing, fullDescription: e.target.value })} placeholder="Detailed description for the event modal. Leave blank to use short description." />
          </div>

          {/* Cover Gradient */}
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Cover Gradient (CSS gradient for fallback)</label>
            <input style={inputStyle} value={editing.coverGradient || ""} onChange={(e) => setEditing({ ...editing, coverGradient: e.target.value })} />
          </div>

          {/* Registration URL */}
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Registration URL (leave blank to hide button in modal)</label>
            <input style={inputStyle} value={editing.registrationUrl || ""} onChange={(e) => setEditing({ ...editing, registrationUrl: e.target.value })} placeholder="https://..." />
          </div>

          {/* Thumbnail Image (Primary Image) */}
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Thumbnail Image URL (primary card image)</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input style={{ ...inputStyle, flex: 1 }} value={editing.image || ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="/events/thumb.jpg" />
              <input type="file" id="thumb-upload" style={{ display: "none" }} accept="image/*" onChange={(e) => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "thumbnail"); }} />
              <button type="button" onClick={() => document.getElementById("thumb-upload")?.click()} disabled={uploading} style={{ ...btnStyle, backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#aaa", whiteSpace: "nowrap" }}>
                {uploading ? "..." : "Upload"}
              </button>
            </div>
          </div>

          {/* Event Images (Gallery) */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Event Images (shown in modal image strip — max 10)</label>
            <p style={{ fontSize: "0.7rem", color: "#666", marginBottom: "0.5rem" }}>Add URLs of event photos. Leave empty if none. Images are displayed in a horizontal scroll strip.</p>
            {(editing.images || []).map((url, i) => (
              <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.375rem" }}>
                <input
                  style={{ ...inputStyle, flex: 1 }}
                  value={url}
                  onChange={(e) => updateImageUrl(i, e.target.value)}
                  placeholder="/events/event-id/photo.jpg"
                />
                <input type="file" id={`gallery-upload-${i}`} style={{ display: "none" }} accept="image/*" onChange={(e) => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "gallery", i); }} />
                <button type="button" onClick={() => document.getElementById(`gallery-upload-${i}`)?.click()} disabled={uploading} style={{ ...btnStyle, backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#aaa", whiteSpace: "nowrap" }}>
                  {uploading ? "..." : "Upload"}
                </button>
                <button type="button" onClick={() => removeImage(i)} style={{ ...btnStyle, padding: "6px", backgroundColor: "transparent", border: "1px solid rgba(255,0,0,0.2)", color: "#ef4444" }}>
                  <X size={14} />
                </button>
              </div>
            ))}
            {(editing.images || []).length < 10 && (
              <button
                type="button"
                onClick={() => setEditing({ ...editing, images: [...(editing.images || []), ""] })}
                style={{ ...btnStyle, marginTop: "0.375rem", backgroundColor: "transparent", border: "1px dashed rgba(255,255,255,0.2)", color: "#aaa", width: "100%", justifyContent: "center" }}
              >
                + Add Image Field
              </button>
            )}
          </div>

          {/* Tags */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Tags</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.5rem" }}>
              {(editing.tags || []).map((tag, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "4px", backgroundColor: "rgba(232,89,60,0.1)", color: "#E8593C", fontSize: "0.75rem" }}>
                  {tag} <X size={12} style={{ cursor: "pointer" }} onClick={() => removeTag(i)} />
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input style={{ ...inputStyle, flex: 1 }} value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add tag..." onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} />
              <button type="button" onClick={addTag} style={{ ...btnStyle, backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#888" }}>Add</button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => { setEditing(null); setIsNew(false); setShowPreview(false); }} style={{ ...btnStyle, backgroundColor: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }}>Cancel</button>
            <button type="button" onClick={saveEvent} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}>Save Event</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── List view ── */
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
            <p style={{ fontSize: "0.7rem", color: "#888" }}>{event.type} · {event.date} · {event.location}</p>
            {(event.images || []).length > 0 && <p style={{ fontSize: "0.65rem", color: "#555", marginTop: "2px" }}>{(event.images || []).length} image{(event.images || []).length !== 1 ? "s" : ""} attached</p>}
          </div>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <button onClick={() => { setEditing(event); setIsNew(false); setTagInput(""); setNewImageUrl(""); setShowPreview(false); }} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#888" }}><Pencil size={14} /></button>
            <button onClick={() => setDeleteId(event.id)} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#ef4444" }}><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <ConfirmDialog open={!!deleteId} message="Are you sure you want to delete this event? This cannot be undone." onConfirm={deleteEvent} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
