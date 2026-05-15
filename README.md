# ACM SVNIT — Student Chapter Website

> The official website of the ACM Student Chapter at Sardar Vallabhbhai National Institute of Technology, Surat. A cinematic, performance-first web experience built to reflect the ambition and technical maturity of one of India's most active student chapters.

---

## Project Description

### What This Is

A complete redesign of the ACM SVNIT website, targeting national award-winning quality with a dark editorial aesthetic, cinematic scroll interactions, and production-grade architecture. The site serves as both a public-facing identity for the chapter and a living archive of its teams, events, domains, and projects.

### Architecture

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js 14 (App Router, TypeScript) | SSR, file-based routing, optimal Vercel deployment, production-grade architecture |
| **Styling** | Tailwind CSS v3 + CSS custom properties | Utility-first for speed, CSS variables for a consistent design token system |
| **Scroll Animations** | GSAP 3 + ScrollTrigger | Industry-standard for scroll-linked animations; `scrub: 1.5` for cinematic smoothing |
| **Page Transitions** | Framer Motion (AnimatePresence) | Lightweight, declarative entrance/exit animations between routes |
| **3D Background** | Three.js (dynamic import) | Wireframe icosahedron geometry for architectural depth; loaded asynchronously to avoid blocking the main thread |
| **Data Layer** | Local JSON files (`/src/data/`) | Zero backend complexity, instant data access, easily replaceable with a CMS later |
| **Fonts** | Clash Display + Cabinet Grotesk (Fontshare) + JetBrains Mono (Google Fonts) | Display authority, readable body text, technical mono labels |
| **Icons** | Lucide React + custom SVGs | Lightweight, tree-shakeable icon set with inline SVGs for brand icons |

### Design Philosophy

- **Dark editorial aesthetic**: Matte black backgrounds (#0A0A0A), off-white typography (#F5F0E8), and a restrained coral-orange accent (#E8593C) used only for CTAs, highlights, and active states.
- **Cinematic spacing**: Generous whitespace, large display typography, and architectural layouts that breathe.
- **Motion with purpose**: GSAP scroll-triggered animations (parallax, stagger reveals, pinned horizontal scroll) used intentionally — never for decoration.
- **Typography-driven**: Clash Display for authority in headings, Cabinet Grotesk for readable body text, JetBrains Mono for technical labels and tags.
- **Performance-first**: Three.js dynamically imported, images optimized, reduced-motion support, GPU-accelerated transforms only.

### Folder Structure

```
/src
  /app
    layout.tsx          — Root layout (fonts, navbar, footer)
    page.tsx            — Home (hero, stats, about teaser, events, domains scroll)
    globals.css         — Design system tokens, base styles, utilities
    /about/page.tsx     — Mission, timeline, values
    /team/page.tsx      — Year selector, role groups, member cards
    /events/page.tsx    — Filter bar, events grid
    /domains/page.tsx   — Full-viewport domain sections
    /projects/page.tsx  — Domain filter, project cards
  /components
    /layout             — Navbar, Footer
    /sections           — Hero, StatsBar, AboutTeaser, EventsTeaser, DomainsHorizontalScroll
    /three              — WireframeBackground
    /motion             — PageTransition
  /data
    teams.json          — 3 years of team data with role groups
    events.json         — 10 events across 4 types
    projects.json       — 8 projects across 5 domains
    domains.json        — 6 technical domains
    timeline.json       — 7 chapter milestones (2012–2024)
```

---

## Future Scope

- **CMS Integration** — Sanity or Contentful for team/event management without code deploys
- **Authentication** — Member portal for resources, attendance tracking, and internal tools
- **Blog / Publications** — Technical articles, event recaps, and research highlights
- **ACM-W Sub-section** — Dedicated section for ACM Women in Computing initiatives
- **Full Internationalisation** — Multi-language support for broader accessibility
- **Dark / Light Mode Toggle** — User-selectable theme preference
- **Mobile App Companion** — React Native app for event notifications and member engagement
- **Analytics Dashboard** — Admin panel for tracking site traffic and event registrations
- **Certificate Verification** — QR-based certificate validation for workshop attendees
- **Live Event System** — Real-time event updates, live Q&A, and streaming integration

---

## Skills Matrix

| Domain | Technologies / Frameworks / Tools |
|---|---|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, GSAP, Framer Motion, Three.js |
| **Backend** | Next.js API Routes, Node.js |
| **AI** | |
| **ML** | |
| **DevOps** | Vercel, GitHub Actions |
| **Other** | Git, Figma, Lucide Icons, Fontshare |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Deployment

This project is optimized for **Vercel**. Push to `main` and Vercel will automatically build and deploy.

```bash
npx vercel
```

---

<p align="center">
  <sub>Building technology. Building people.</sub><br>
  <sub>© 2025 ACM SVNIT Student Chapter</sub>
</p>
