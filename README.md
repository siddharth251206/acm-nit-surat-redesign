# ACM SVNIT — Student Chapter Website

**🌍 Live Deployment:** [acm-nit-surat.vercel.app](https://acm-nit-surat.vercel.app/)

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

### The Innovative ACM Local Admin

A major challenge for student chapters is maintaining the website year over year. Handing over databases, cloud credentials, and complex headless CMS systems often leads to broken sites when core team members graduate. 

To solve this, we built a highly innovative **Local-First Admin Panel** directly into the website (accessible locally at `/admin`).

**Why Local?**
- **Zero Running Costs**: No database hosting fees or premium CMS subscriptions. 
- **Absolute Ownership**: The data lives exactly where the code lives. Handing over the website to the next year's committee is as simple as transferring the GitHub repository.
- **Git as the Database**: Everything is tracked via version control. If a mistake is made, reverting to yesterday's data is one `git revert` away.
- **No Dependency Rot**: Cloud APIs deprecate, but local JSON files are forever.

**How it Works:**
The Admin panel provides a beautiful, full-featured GUI for the executive committee to manage site data without touching a single line of code.
- **Direct File System Access**: By leveraging Node.js `fs` APIs via Next.js Server Routes, the admin panel reads and writes directly to the `/src/data/*.json` files in real-time.
- **Automated Image Handling**: When an admin uploads an event poster or a team member's photo, the system automatically saves the physical image file to the appropriate `/public/` sub-directory and binds the new local path to the JSON data.
- **Hot-Reloaded WYSIWYG**: Because Next.js natively watches the `/src/` folder, updating the JSON via the Admin Panel instantly hot-reloads the frontend.
- **Deployment Workflow**: The Admin Panel is designed strictly for local content management. Content managers run the site locally, make their edits through the beautiful UI, and push the resulting JSON and Image file changes to GitHub. Vercel then automatically deploys the static updates.

This local-first architecture ensures the ACM SVNIT website remains immortal, perfectly maintainable, and 100% cost-free for generations of future committees.

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
| **AI** | - |
| **ML** | - |
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
