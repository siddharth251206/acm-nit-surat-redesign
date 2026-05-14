"use client";

import { useEffect, useState, useCallback } from "react";
import { useToast } from "../components/Toast";

interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  founded: string;
  email: string;
  phone: string;
  address: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
  };
  heroHeadline: string;
  heroSubLeft: string;
  heroSubRight: string;
  aboutDescription: string;
  copyright: string;
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.75rem", backgroundColor: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "#f5f0e8", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" };
const labelStyle: React.CSSProperties = { fontSize: "0.75rem", color: "#888", display: "block", marginBottom: "4px", fontWeight: 500 };

export default function SettingsAdmin() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const { showToast } = useToast();

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/data?file=site");
    if (res.ok) setConfig(await res.json());
  }, []);
  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!config) return;
    const res = await fetch("/api/admin/data?file=site", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(config) });
    if (res.ok) showToast("Settings saved!");
    else showToast("Failed to save", "error");
  };

  if (!config) return <p style={{ color: "#888" }}>Loading...</p>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Site Settings</h1>
        <button onClick={save} style={{ padding: "0.5rem 1.25rem", borderRadius: "6px", border: "none", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", backgroundColor: "#E8593C", color: "#fff" }}>
          Save Changes
        </button>
      </div>

      <div style={{ maxWidth: "640px" }}>
        {/* Chapter Info */}
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#888", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Chapter Info</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div><label style={labelStyle}>Chapter Name</label><input style={inputStyle} value={config.name} onChange={(e) => setConfig({ ...config, name: e.target.value })} /></div>
          <div><label style={labelStyle}>Short Name</label><input style={inputStyle} value={config.shortName} onChange={(e) => setConfig({ ...config, shortName: e.target.value })} /></div>
        </div>
        <div style={{ marginBottom: "0.75rem" }}><label style={labelStyle}>Tagline</label><input style={inputStyle} value={config.tagline} onChange={(e) => setConfig({ ...config, tagline: e.target.value })} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div><label style={labelStyle}>Founded Year</label><input style={inputStyle} value={config.founded} onChange={(e) => setConfig({ ...config, founded: e.target.value })} /></div>
          <div><label style={labelStyle}>Email</label><input style={inputStyle} value={config.email} onChange={(e) => setConfig({ ...config, email: e.target.value })} /></div>
          <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={config.phone} onChange={(e) => setConfig({ ...config, phone: e.target.value })} /></div>
        </div>
        <div style={{ marginBottom: "1.5rem" }}><label style={labelStyle}>Address</label><input style={inputStyle} value={config.address} onChange={(e) => setConfig({ ...config, address: e.target.value })} /></div>

        {/* Hero Section */}
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#888", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Hero Section</h2>
        <div style={{ marginBottom: "0.75rem" }}><label style={labelStyle}>Hero Headline</label><input style={inputStyle} value={config.heroHeadline} onChange={(e) => setConfig({ ...config, heroHeadline: e.target.value })} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <div><label style={labelStyle}>Sub Left</label><textarea style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} value={config.heroSubLeft} onChange={(e) => setConfig({ ...config, heroSubLeft: e.target.value })} /></div>
          <div><label style={labelStyle}>Sub Right</label><textarea style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} value={config.heroSubRight} onChange={(e) => setConfig({ ...config, heroSubRight: e.target.value })} /></div>
        </div>

        {/* About */}
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#888", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>About</h2>
        <div style={{ marginBottom: "1.5rem" }}><label style={labelStyle}>About Description</label><textarea style={{ ...inputStyle, minHeight: "160px", resize: "vertical" }} value={config.aboutDescription} onChange={(e) => setConfig({ ...config, aboutDescription: e.target.value })} /></div>

        {/* Socials */}
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#888", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Social Links</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div><label style={labelStyle}>GitHub</label><input style={inputStyle} value={config.socials.github} onChange={(e) => setConfig({ ...config, socials: { ...config.socials, github: e.target.value } })} /></div>
          <div><label style={labelStyle}>LinkedIn</label><input style={inputStyle} value={config.socials.linkedin} onChange={(e) => setConfig({ ...config, socials: { ...config.socials, linkedin: e.target.value } })} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div><label style={labelStyle}>Facebook</label><input style={inputStyle} value={config.socials.facebook} onChange={(e) => setConfig({ ...config, socials: { ...config.socials, facebook: e.target.value } })} /></div>
          <div><label style={labelStyle}>YouTube</label><input style={inputStyle} value={config.socials.youtube} onChange={(e) => setConfig({ ...config, socials: { ...config.socials, youtube: e.target.value } })} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div><label style={labelStyle}>Twitter</label><input style={inputStyle} value={config.socials.twitter} onChange={(e) => setConfig({ ...config, socials: { ...config.socials, twitter: e.target.value } })} /></div>
          <div><label style={labelStyle}>Instagram</label><input style={inputStyle} value={config.socials.instagram} onChange={(e) => setConfig({ ...config, socials: { ...config.socials, instagram: e.target.value } })} /></div>
        </div>

        {/* Footer */}
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#888", marginBottom: "1rem", marginTop: "1.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Footer</h2>
        <div style={{ marginBottom: "1.5rem" }}><label style={labelStyle}>Copyright Line</label><input style={inputStyle} value={config.copyright} onChange={(e) => setConfig({ ...config, copyright: e.target.value })} /></div>

        <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "2rem" }}>
          <button onClick={save} style={{ padding: "0.5rem 1.25rem", borderRadius: "6px", border: "none", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", backgroundColor: "#E8593C", color: "#fff" }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
