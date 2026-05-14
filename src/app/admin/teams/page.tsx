"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, ChevronLeft, Upload, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

interface Member {
  name: string;
  role: string;
  roleGroup: string;
  photo: string;
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

interface TeamYear {
  year: string;
  label?: string;
  isCurrent: boolean;
  members: Member[];
}

const ROLE_GROUPS = ["Executive", "Technical", "Creative", "Operations"];

const btnStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  border: "none",
  fontSize: "0.8rem",
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.75rem",
  backgroundColor: "#1A1A1A",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "6px",
  color: "#f5f0e8",
  fontSize: "0.85rem",
  outline: "none",
  fontFamily: "inherit",
};

export default function TeamsAdmin() {
  const [teams, setTeams] = useState<TeamYear[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [addingMember, setAddingMember] = useState(false);
  const [addingYear, setAddingYear] = useState(false);
  const [newYear, setNewYear] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ type: "year" | "member"; year: string; index?: number; name?: string } | null>(null);
  const { showToast } = useToast();

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/data?file=teams");
    if (res.ok) setTeams(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (data: TeamYear[]) => {
    const res = await fetch("/api/admin/data?file=teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setTeams(data);
      showToast("Teams saved!", "success");
    } else {
      showToast("Failed to save", "error");
    }
  };

  const selectedTeam = teams.find((t) => t.year === selectedYear);

  // ── Year operations ──
  const addYear = () => {
    if (!newYear.trim()) return;
    if (teams.some((t) => t.year === newYear.trim())) {
      showToast("Year already exists", "error");
      return;
    }
    const updated = [
      { year: newYear.trim(), label: `Team of ${newYear.trim()}`, isCurrent: false, members: [] },
      ...teams,
    ];
    save(updated);
    setAddingYear(false);
    setNewYear("");
  };

  const toggleCurrent = (year: string) => {
    const updated = teams.map((t) => ({
      ...t,
      isCurrent: t.year === year ? !t.isCurrent : false,
    }));
    save(updated);
  };

  const deleteYear = () => {
    if (!deleteTarget || deleteTarget.type !== "year") return;
    const updated = teams.filter((t) => t.year !== deleteTarget.year);
    save(updated);
    setDeleteTarget(null);
    if (selectedYear === deleteTarget.year) setSelectedYear(null);
  };

  // ── Member operations ──
  const emptyMember = (): Member => ({
    name: "",
    role: "",
    roleGroup: "Technical",
    photo: "",
    email: "",
    linkedin: "",
    github: "",
    twitter: "",
  });

  const saveMember = (member: Member) => {
    if (!selectedYear) return;
    const updated = teams.map((t) => {
      if (t.year !== selectedYear) return t;
      const members = [...t.members];
      if (editingIndex >= 0) {
        members[editingIndex] = member;
      } else {
        members.push(member);
      }
      return { ...t, members };
    });
    save(updated);
    setEditingMember(null);
    setEditingIndex(-1);
    setAddingMember(false);
  };

  const deleteMember = () => {
    if (!deleteTarget || deleteTarget.type !== "member" || deleteTarget.index === undefined) return;
    const updated = teams.map((t) => {
      if (t.year !== deleteTarget.year) return t;
      const members = t.members.filter((_, i) => i !== deleteTarget.index);
      return { ...t, members };
    });
    save(updated);
    setDeleteTarget(null);
  };

  const moveMember = (index: number, direction: "up" | "down") => {
    if (!selectedYear) return;
    const updated = teams.map((t) => {
      if (t.year !== selectedYear) return t;
      const members = [...t.members];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= members.length) return t;
      [members[index], members[target]] = [members[target], members[index]];
      return { ...t, members };
    });
    save(updated);
  };

  const handlePhotoUpload = async (index: number, file: File) => {
    if (!selectedYear) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("dir", `team/${selectedYear}`);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { path } = await res.json();
      const updated = teams.map((t) => {
        if (t.year !== selectedYear) return t;
        const members = [...t.members];
        members[index] = { ...members[index], photo: path };
        return { ...t, members };
      });
      save(updated);
      showToast("Photo uploaded!", "success");
    } else {
      showToast("Upload failed", "error");
    }
  };

  // ── Member form ──
  const MemberForm = ({ member, onSave, onCancel }: { member: Member; onSave: (m: Member) => void; onCancel: () => void }) => {
    const [form, setForm] = useState<Member>(member);
    const slug = form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    useEffect(() => {
      if (!form.photo && slug && selectedYear) {
        setForm((prev) => ({ ...prev, photo: `/team/${selectedYear}/${slug}.jpg` }));
      }
    }, [slug]);

    return (
      <div style={{ backgroundColor: "#111", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem", marginBottom: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Name *</label>
            <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" />
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Role *</label>
            <input style={inputStyle} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Developer" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Role Group *</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.roleGroup} onChange={(e) => setForm({ ...form, roleGroup: e.target.value })}>
              {ROLE_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Photo path</label>
            <input style={inputStyle} value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} placeholder="/team/2025/name.jpg" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Email</label>
            <input style={inputStyle} value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>LinkedIn URL</label>
            <input style={inputStyle} value={form.linkedin || ""} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>GitHub URL</label>
            <input style={inputStyle} value={form.github || ""} onChange={(e) => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/..." />
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px" }}>Twitter URL</label>
            <input style={inputStyle} value={form.twitter || ""} onChange={(e) => setForm({ ...form, twitter: e.target.value })} placeholder="https://twitter.com/..." />
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ ...btnStyle, backgroundColor: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }}>Cancel</button>
          <button onClick={() => { if (form.name && form.role) onSave(form); else showToast("Name and Role are required", "error"); }} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}>Save Member</button>
        </div>
      </div>
    );
  };

  // ── Render ──
  if (selectedYear && selectedTeam) {
    return (
      <div>
        <button onClick={() => { setSelectedYear(null); setAddingMember(false); setEditingMember(null); }} style={{ ...btnStyle, backgroundColor: "transparent", color: "#888", border: "none", padding: "0", marginBottom: "1rem" }}>
          <ChevronLeft size={16} /> Back to Years
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Team of {selectedYear}</h1>
          <button onClick={() => { setAddingMember(true); setEditingMember(emptyMember()); setEditingIndex(-1); }} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}>
            <Plus size={14} /> Add Member
          </button>
        </div>

        {addingMember && editingMember && editingIndex === -1 && (
          <MemberForm member={editingMember} onSave={saveMember} onCancel={() => { setAddingMember(false); setEditingMember(null); }} />
        )}

        {/* Member list */}
        <div>
          {selectedTeam.members.map((member, i) => (
            <div key={member.name + i}>
              {editingIndex === i && editingMember ? (
                <MemberForm member={editingMember} onSave={saveMember} onCancel={() => { setEditingMember(null); setEditingIndex(-1); }} />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    backgroundColor: "#111",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "#1A1A1A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#E8593C",
                      overflow: "hidden",
                    }}
                  >
                    {member.photo ? (
                      <img src={member.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    ) : (
                      member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 500 }}>{member.name}</p>
                    <p style={{ fontSize: "0.7rem", color: "#888" }}>{member.role} • {member.roleGroup}</p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
                    <button onClick={() => moveMember(i, "up")} disabled={i === 0} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: i === 0 ? "#333" : "#888", cursor: i === 0 ? "default" : "pointer" }}><ArrowUp size={14} /></button>
                    <button onClick={() => moveMember(i, "down")} disabled={i === selectedTeam.members.length - 1} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: i === selectedTeam.members.length - 1 ? "#333" : "#888", cursor: i === selectedTeam.members.length - 1 ? "default" : "pointer" }}><ArrowDown size={14} /></button>
                    <label style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#888", cursor: "pointer" }}>
                      <Upload size={14} />
                      <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) handlePhotoUpload(i, e.target.files[0]); }} />
                    </label>
                    <button onClick={() => { setEditingMember(member); setEditingIndex(i); }} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#888" }}><Pencil size={14} /></button>
                    <button onClick={() => setDeleteTarget({ type: "member", year: selectedYear, index: i, name: member.name })} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#ef4444" }}><Trash2 size={14} /></button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {selectedTeam.members.length === 0 && !addingMember && (
            <p style={{ color: "#888", fontSize: "0.85rem", textAlign: "center", padding: "2rem 0" }}>
              No members yet. Click &quot;Add Member&quot; to get started.
            </p>
          )}
        </div>

        <ConfirmDialog
          open={deleteTarget?.type === "member"}
          message={<>Are you sure you want to remove <strong>{deleteTarget?.name}</strong>? This cannot be undone.</>}
          onConfirm={deleteMember}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    );
  }

  // ── Year list ──
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Teams</h1>
        <button onClick={() => setAddingYear(true)} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}>
          <Plus size={14} /> Add Year
        </button>
      </div>

      {addingYear && (
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", alignItems: "center" }}>
          <input style={{ ...inputStyle, width: "120px" }} value={newYear} onChange={(e) => setNewYear(e.target.value)} placeholder="e.g. 2026" />
          <button onClick={addYear} style={{ ...btnStyle, backgroundColor: "#E8593C", color: "#fff" }}>Add</button>
          <button onClick={() => { setAddingYear(false); setNewYear(""); }} style={{ ...btnStyle, backgroundColor: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }}>Cancel</button>
        </div>
      )}

      <div>
        {teams.map((team) => (
          <div
            key={team.year}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              backgroundColor: "#111",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.04)",
              marginBottom: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{team.year}</span>
              {team.isCurrent && (
                <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 6px", borderRadius: "3px", backgroundColor: "rgba(232,89,60,0.15)", color: "#E8593C" }}>CURRENT</span>
              )}
              <span style={{ fontSize: "0.75rem", color: "#888" }}>{team.members.length} members</span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button onClick={() => toggleCurrent(team.year)} style={{ ...btnStyle, padding: "4px 8px", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#888", fontSize: "0.7rem" }}>
                {team.isCurrent ? "Unset Current" : "Set Current"}
              </button>
              <button onClick={() => setSelectedYear(team.year)} style={{ ...btnStyle, padding: "4px 8px", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#E8593C", fontSize: "0.7rem" }}>
                <Pencil size={12} /> Edit
              </button>
              <button onClick={() => setDeleteTarget({ type: "year", year: team.year })} style={{ ...btnStyle, padding: "4px", backgroundColor: "transparent", border: "none", color: "#ef4444" }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={deleteTarget?.type === "year"}
        message={<>Are you sure you want to delete team year <strong>{deleteTarget?.year}</strong> and all its members? This cannot be undone.</>}
        onConfirm={deleteYear}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
