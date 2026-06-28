# Fernando OS

This is my personal portfolio — not a template, not a boilerplate, my own private
project. Instead of a static "About me" page, I built it as an interactive,
terminal-driven operating system: a boot sequence, a windowed dashboard, a working
terminal, and a live feed of my GitHub activity.

## About me

I'm Fernando Gonçalves, a Full Stack Software Engineer based in Zürich, Switzerland.
Java, Spring Boot and Angular by day; Python and ML by choice. I like building
complete products end to end — data models, APIs, and the interfaces people actually
touch — which is why this site exists instead of a PDF and a LinkedIn link.

- GitHub: [github.com/Goncalves95](https://github.com/Goncalves95)
- LinkedIn: [fernandojcgoncalves](https://www.linkedin.com/in/fernandojcgoncalves/)
- YouTube: [@imfernandodev](https://www.youtube.com/channel/UCaDB7N_v5ZuUD1BHarmzUZQ)

## Featured projects

- **InkFlow CRM** — multi-tenant SaaS CRM for tattoo studios, with an Instagram
  Marketing Hub (Meta OAuth, AES-256-CBC token encryption), JWT refresh tokens, and
  Stripe billing. First production user: an active tattoo studio in Zürich.
- **Lumen Finance** — fintech decision-intelligence platform: a scoring engine, IBAN
  encryption, and a React Native mobile app, deployed across Neon.tech, Render, and
  Vercel.
- **Zürich Energy Forecast** — end-to-end MLOps pipeline forecasting electricity
  demand (R²=0.989, MAPE=1.26%), with champion model selection, CI/CD via GitHub
  Actions, and a live Streamlit dashboard.
- **OnlyDevs** — a developer-merch e-commerce brand I designed and run myself
  (Shopify + Printful + Figma).

Full write-ups, tech stacks, and links live in `src/data/featured-projects.ts` and
render through the Projects section of the site itself.

## What I built it with

- [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) — dark theme, orange accent (`#FF4500`)
- [Framer Motion](https://www.framer.com/motion/) for animation (respects
  `prefers-reduced-motion` via `MotionConfig`)
- [@xyflow/react](https://reactflow.dev/) for the interactive tech stack graph
- [react-markdown](https://github.com/remarkjs/react-markdown) for project
  long-descriptions
- [react-icons](https://react-icons.github.io/react-icons/) (Feather, Simple Icons,
  Font Awesome 6)
- Inter + JetBrains Mono (via `next/font/google`)
- `next/og` (`ImageResponse`) for the dynamic Open Graph image
- Deployed on Vercel

## Project structure

```
src/
  app/                   Boot screen + dashboard, root layout, OG image, robots/sitemap, 404
  components/
    BootScreen/          Terminal-style boot animation
    Dashboard/           Main OS-like desktop (windows, boot gate, home hero)
    Navigation/          Top nav bar (scroll-spy highlight, mobile hamburger menu)
    ProjectsSection/     Filterable projects grid (+ server/skeleton split for Suspense)
    ProjectCard/         Project preview card
    ProjectModal/        Full project detail modal (carousel, markdown, tech icons)
    TechGraph/           Interactive tech stack graph (React Flow desktop, list on mobile)
    Terminal/            Floating draggable terminal (FAB launcher + emulator)
    GitHubStats/         Live GitHub statistics (+ server/skeleton split for Suspense)
    ContactSection/      Contact links, location, CV download (+ server wrapper for the
                          dev-only "is the CV file actually there?" check)
    ErrorBoundary/       Generic client error boundary for data-dependent sections
  lib/
    github.ts            GitHub API integration
    projects.ts          Project data accessors + GitHub/manual merge + dedupe
    terminal-commands.ts Terminal command handlers
    project-meta.tsx     Project category colors/icons
    tech-icons.tsx       Tech name → brand icon lookup
    use-active-section.ts Scroll-spy hook
  types/                 Shared TypeScript interfaces
  data/
    featured-projects.ts Manually curated project data (including private projects)
public/
  images/projects/       Project card/modal images (cards fall back to a category
                          gradient if a screenshot is missing)
  cv/                    CV PDF
```

## Notes to self

- The GitHub integration (`src/lib/github.ts`) hits the public, unauthenticated
  GitHub REST API for my username and caches via
  `fetch(..., { next: { revalidate: 3600 } })` — no env vars, no auth, stays well
  inside the 60 req/hour anonymous rate limit.
- `npm install` applies `patches/next+14.2.35.patch` via `patch-package`
  (`postinstall`). It fixes a Windows-only bug in Next's bundled `@vercel/og`
  (used by `app/opengraph-image.tsx`) where `path.join` on a `file://` URL produces
  an invalid path and breaks `npm run build` on Windows. No-op on macOS/Linux/Vercel.
- Still need real screenshots in `public/images/projects/*.png` — fine for now since
  cards/modals degrade gracefully to a gradient.
- `npm run type-check` / `lint` / `build` should always be green before pushing.

## Scripts

| Command              | Description                        |
| --------------------- | ----------------------------------- |
| `npm run dev`         | Start the dev server                |
| `npm run build`       | Production build                    |
| `npm run start`       | Run the production build            |
| `npm run lint`        | Lint with ESLint                    |
| `npm run type-check`  | Type-check with `tsc --noEmit`      |
| `npm run format`      | Format the codebase with Prettier   |
