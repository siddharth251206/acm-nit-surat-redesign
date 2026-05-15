"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import PageTransition from "@/components/motion/PageTransition";
import siteData from "@/data/site.json";
import MobileHeroPills from "@/components/sections/MobileHeroPills";

const WireframeBackground = dynamic(
  () => import("@/components/three/WireframeBackground"),
  { ssr: false }
);

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
    </svg>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  backgroundColor: "#1A1A1A",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s ease",
};

export default function ContactPage() {
  const [form, setForm] = useState({
    admissionNo: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const body = `Name: ${form.name}\nAdmission No: ${form.admissionNo}\nPhone: ${form.phone}\n\n${form.message}`;
    const mailtoUrl = `mailto:${siteData.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  return (
    <PageTransition>
      <section
        className="relative w-full"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <WireframeBackground opacity={0.2} speed={0.4} />
        <div
          className="container-site flex flex-col justify-center"
          style={{ minHeight: "40vh", paddingTop: "var(--navbar-height)" }}
        >
          <span className="mono-label mb-4">// CONTACT</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            get in <span style={{ color: "var(--accent)" }}>touch</span>
          </h1>
          <MobileHeroPills
            pills={["acm@svnit.ac.in", "Surat, Gujarat"]}
            descriptor="We'd love to hear from you."
          />
          <p
            className="mt-4"
            style={{ color: "var(--text-secondary)", maxWidth: "560px" }}
          >
            Got a technical issue? Want to send us feedback about a feature? Need
            details about any event? Let us know.
          </p>
        </div>
      </section>

      <div
        className="w-full h-px"
        style={{ backgroundColor: "var(--border)" }}
      />

      {/* Form + Sidebar */}
      <section className="container-site section-padding">
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-12">
          {/* Form */}
          <div className="tablet:col-span-2">
            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1 */}
              <div className="grid grid-cols-1 mobile:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="Admission Number"
                    value={form.admissionNo}
                    onChange={(e) => handleChange("admissionNo", e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-hover)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    style={{
                      ...inputStyle,
                      borderColor: errors.name ? "var(--accent)" : undefined,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-hover)")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.name
                        ? "var(--accent)"
                        : "var(--border)")
                    }
                  />
                  {errors.name && (
                    <p style={{ color: "var(--accent)", fontSize: "0.75rem", marginTop: "4px" }}>
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 mobile:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email *"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    style={{
                      ...inputStyle,
                      borderColor: errors.email ? "var(--accent)" : undefined,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-hover)")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.email
                        ? "var(--accent)"
                        : "var(--border)")
                    }
                  />
                  {errors.email && (
                    <p style={{ color: "var(--accent)", fontSize: "0.75rem", marginTop: "4px" }}>
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number (+91)"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-hover)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Subject *"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  style={{
                    ...inputStyle,
                    borderColor: errors.subject ? "var(--accent)" : undefined,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--border-hover)")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.subject
                      ? "var(--accent)"
                      : "var(--border)")
                  }
                />
                {errors.subject && (
                  <p style={{ color: "var(--accent)", fontSize: "0.75rem", marginTop: "4px" }}>
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Row 4 */}
              <div className="mb-6">
                <textarea
                  placeholder="Your message *"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={6}
                  style={{
                    ...inputStyle,
                    minHeight: "160px",
                    resize: "vertical",
                    borderColor: errors.message ? "var(--accent)" : undefined,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--border-hover)")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.message
                      ? "var(--accent)"
                      : "var(--border)")
                  }
                />
                {errors.message && (
                  <p style={{ color: "var(--accent)", fontSize: "0.75rem", marginTop: "4px" }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary">
                <Send size={14} />
                Send message
              </button>
            </form>

            {/* Success Toast */}
            {submitted && (
              <div
                className="mt-6 flex items-center gap-3 p-4 rounded-md"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                }}
              >
                <CheckCircle size={18} style={{ color: "#22c55e" }} />
                <p
                  style={{
                    color: "#22c55e",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  Message sent! We&apos;ll get back to you soon.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <h3
              className="font-display mb-6"
              style={{ fontSize: "1.125rem", fontWeight: 600 }}
            >
              Contact Info
            </h3>

            <div className="space-y-5 mb-8">
              <a
                href={`tel:${siteData.phone}`}
                className="flex items-center gap-3 transition-colors duration-200"
                style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
              >
                <Phone size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                {siteData.phone}
              </a>
              <a
                href={`mailto:${siteData.email}`}
                className="flex items-center gap-3 transition-colors duration-200"
                style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
              >
                <Mail size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                {siteData.email}
              </a>
              <div
                className="flex items-start gap-3"
                style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
              >
                <MapPin size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
                {siteData.address}
              </div>
            </div>

            <div
              className="w-full h-px mb-6"
              style={{ backgroundColor: "var(--border)" }}
            />

            <h4
              className="font-display mb-4"
              style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)" }}
            >
              Follow us
            </h4>
            <div className="flex items-center gap-3">
              {siteData.email && (
                <a
                  href={`mailto:${siteData.email}`}
                  className="p-2 rounded-md transition-colors duration-200"
                  style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              )}
              {siteData.socials.github && (
                <a
                  href={siteData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md transition-colors duration-200"
                  style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                  aria-label="GitHub"
                >
                  <GitHubIcon size={16} />
                </a>
              )}
              {siteData.socials.linkedin && (
                <a
                  href={siteData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md transition-colors duration-200"
                  style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon size={16} />
                </a>
              )}
              {siteData.socials.instagram && (
                <a
                  href={siteData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md transition-colors duration-200"
                  style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                  aria-label="Instagram"
                >
                  <InstagramIcon size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
