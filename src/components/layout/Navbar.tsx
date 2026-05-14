"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import TransitionLink from "@/components/motion/TransitionLink";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Domains", href: "/domains" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        id="main-navbar"
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: "rgba(10, 10, 10, 0.85)",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        <div className="container-site flex items-center justify-between h-[72px]">
          {/* Logo */}
          <TransitionLink href="/" className="flex items-center group" aria-label="ACM SVNIT Home">
            <Image
              src="/acm-logo.png"
              alt="ACM SVNIT Logo"
              width={180}
              height={60}
              priority
              className="h-9 tablet:h-11 w-auto"
            />
          </TransitionLink>

          {/* Desktop Nav Links */}
          <div className="hidden tablet:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-body font-medium transition-colors duration-200"
                  style={{
                    color: isActive
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  }}
                >
                  <span className="hover:text-text-primary transition-colors duration-200">
                    {link.label}
                  </span>
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 w-full h-[2px]"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                  )}
                </TransitionLink>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden tablet:block">
            <a href="#join" className="btn-primary">
              Join Us <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="tablet:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            id="mobile-menu-toggle"
          >
            {mobileOpen ? (
              <X size={24} color="var(--text-primary)" />
            ) : (
              <Menu size={24} color="var(--text-primary)" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="flex flex-col items-start justify-center h-full px-8 pt-[72px]">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-4 transition-all duration-300"
                style={{
                  transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                  transform: mobileOpen
                    ? "translateY(0)"
                    : "translateY(30px)",
                  opacity: mobileOpen ? 1 : 0,
                }}
              >
                <span
                  className="font-display text-5xl font-bold tracking-tight"
                  style={{
                    color: isActive
                      ? "var(--accent)"
                      : "var(--text-primary)",
                  }}
                >
                  {link.label}
                </span>
              </TransitionLink>
            );
          })}
          <a
            href="#join"
            className="btn-primary mt-8"
            style={{
              transitionDelay: mobileOpen
                ? `${navLinks.length * 60}ms`
                : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(30px)",
              opacity: mobileOpen ? 1 : 0,
            }}
            onClick={() => setMobileOpen(false)}
          >
            Join Us <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
