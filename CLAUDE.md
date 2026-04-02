# Portfolio Website — CLAUDE.md

> Read this before making any change. It covers the full picture of the project: architecture, data layer, components, design decisions, configurable flags, and known placeholders.

---

## Tech Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Build tool  | Vite 6                                   |
| Framework   | React 18                                 |
| Styling     | Tailwind CSS v3 (JIT mode)               |
| Icons       | lucide-react                             |
| Contact form| Formspree (fetch-based, no SDK)          |
| Fonts       | Space Mono (display/mono) + Inter (body) — injected via `GLOBAL_STYLES` string, not `<link>` tags |

**Dev server:** `npm run dev` — runs on port 5173 (or 5174 if busy).
**Build:** `npm run build`

---

## File Structure

```
c:\Personal\Portfolio Website\
├── CLAUDE.md               ← This file
├── Portfolio.jsx           ← Single-file app: all components + hooks + GLOBAL_STYLES
├── index.html              ← Shell; contains favicon link + FOUC-prevention style
├── package.json
├── vite.config.js
├── tailwind.config.js      ← content includes "./Portfolio.jsx"
├── postcss.config.js
├── public/
│   └── favicon.svg         ← AJ monogram, dark bg + teal #64ffda; served at /favicon.svg
└── src/
    ├── main.jsx            ← Entry: imports React + App from ../../Portfolio.jsx
    ├── index.css           ← Tailwind directives only (base/components/utilities)
    └── data/               ← One ES module per content section
        ├── meta.js
        ├── about.js
        ├── experience.js
        ├── skills.js
        ├── projects.js
        ├── achievements.js
        ├── blog.js
        └── social.js
```

---

## Architecture

### Single-file app
All components, hooks, and styles live in `Portfolio.jsx` at the root level. `src/main.jsx` imports `App` from `../../Portfolio.jsx`.

### Data layer
Each `src/data/*.js` file is a plain JS `const` exported as default. `Portfolio.jsx` imports them all and assembles them into a single `portfolioData` const:

```js
const portfolioData = { meta, about, experience, skills, projects, achievements, blog, social };
```

**To update any content, only edit files in `src/data/`. Do not touch `Portfolio.jsx` for data changes.**

### Styles
All custom CSS lives in the `GLOBAL_STYLES` string constant at the top of `Portfolio.jsx`, rendered via:
```jsx
<style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
```
Tailwind utility classes are used directly on JSX elements. Arbitrary Tailwind values (e.g. `text-[#e8e8e8]`) are used throughout — these ARE overrideable via CSS class selectors.

---

## Data Files — Shapes & Flags

### `src/data/meta.js`
```js
{
  name: 'Anvit Ajgaokar',
  initials: 'AJ',
  title: 'Backend Engineer',
  tagline: '...',
  email: '...',
  location: 'Mumbai, India',
  roles: ['Backend Engineer', 'API Architect', 'Systems Builder'],  // used by typewriter
}
```

### `src/data/about.js`
```js
{
  bio: ['paragraph 1', 'paragraph 2'],
  currently: 'one-line current role string',
  showAvatar: false,   // ← FLAG: set true to show the AJ monogram box in About section
  avatar: 'AJ',
  stats: [{ value: '2', label: 'Years Exp.' }, ...],
}
```

### `src/data/experience.js`
Array of job objects:
```js
[{
  company: 'CMSS',
  role: 'Software Engineer',
  duration: 'Apr 2024 – Present',
  type: 'Full-time',
  descriptions: ['bullet 1', 'bullet 2', ...],
  techStack: ['Java', 'Spring', ...],
}]
```

### `src/data/skills.js`
Array of category objects:
```js
[{ category: 'Languages', icon: 'Code2', items: ['Java', 'Python', ...] }]
```
Icons map to lucide-react icon names (`Code2`, `Server`, `Database`, `Cloud`, `Terminal`).
Current categories: Languages · Frameworks · Databases · DevOps & Cloud · Tools & Practices

### `src/data/projects.js`
```js
{
  showProfessional: false,  // ← FLAG: set true to show the Professional tab in Projects section
  personal: [{ name, description, techStack[], liveUrl, githubUrl, highlight }, ...],
  professional: [{ name, description, techStack[], impact, highlight }, ...],
}
```
`liveUrl: null` hides the live-link button. `highlight` renders as a badge chip on the card.

### `src/data/achievements.js`
Array:
```js
[{ metric: '85%', title: 'Response Time Cut', description: '...' }]
```
`metric` drives the animated count-up number.

### `src/data/blog.js`
Currently **empty** (`[]`). The Blog section component returns `null` when the array is empty — no layout gap appears.

When adding articles, each entry follows:
```js
{
  title: 'Your Article Title',
  platform: 'Medium',          // 'Medium' | 'Dev.to' | 'LinkedIn'
  url: 'https://...',
  date: 'Jan 2026',
  readTime: '8 min read',
  excerpt: 'One or two sentences.',
}
```

### `src/data/social.js`
```js
{
  github: '...',
  linkedin: '...',
  twitter: '#',               // ← placeholder, not linked yet
  email: '...',
  resume: '/resume.pdf',
  showResume: false,          // ← FLAG: set true to show Resume button in nav (desktop + mobile)
  formEndpoint: 'https://formspree.io/f/xzdkrkpj',  // live Formspree endpoint
}
```

---

## Configurable Flags — Quick Reference

These boolean flags in the data files let you toggle sections without touching `Portfolio.jsx`:

| Flag | File | Default | Effect |
|------|------|---------|--------|
| `showResume` | `social.js` | `false` | Shows/hides the Resume button in the nav bar (both desktop and mobile overlay) |
| `showAvatar` | `about.js` | `false` | Shows/hides the AJ monogram box in the About section; grid adapts to single-column when hidden |
| `showProfessional` | `projects.js` | `false` | Shows/hides the Professional tab in the Projects section; tab switcher hidden when only one tab exists |

---

## Component Map (Portfolio.jsx)

All components are defined in `Portfolio.jsx`. Section order in the DOM matches the render order in `App`.

| Component | Section | Notes |
|-----------|---------|-------|
| `Nav` | Navigation | Sticky, hides on scroll-down, shows on scroll-up; mobile overlay menu |
| `Hero` | Hero | Typewriter roles, mounted stagger animations, bloom gradients |
| `About` | About Me | Avatar box (conditional), bio paragraphs, currently box, stats with count-up |
| `ExperienceItem` | – | Sub-component rendered per job in `Experience` |
| `Experience` | Experience | Timeline layout with animated dot and line |
| `SkillGroup` | – | Sub-component rendered per skill category in `Skills` |
| `Skills` | Skills | Grid of skill categories with tags |
| `PersonalProjectCard` | – | Card for personal/OSS projects |
| `ProfessionalProjectCard` | – | Card for professional projects (impact box variant) |
| `ExpandToggle` | – | "N more →" / "↑ Collapse" button; appears when items > `PROJECTS_INITIAL` (3) |
| `Projects` | Projects | Tab switcher (Personal / Professional); tabs built dynamically from `showProfessional` flag |
| `AchievementItem` | – | Metric + animated count-up |
| `Achievements` | Achievements | Grid of achievement cards |
| `BlogCard` | – | Blog article card with platform badge |
| `Blog` | Writing | Returns `null` when `blog[]` is empty; visible only when data exists |
| `ContactForm` | Contact (in Footer) | Formspree POST, honeypot anti-spam, localStorage 60s rate-limit, field validation |
| `Footer` | Footer | Social links, contact form, built-with note |
| `ScrollToTop` | – | Appears after 400px scroll; smooth-scrolls to top |
| `TechChip` | – | Inline tech tag used in ExperienceItem |
| `SectionHeader` | – | Section number + title + animated underline line |

---

## Custom Hooks (Portfolio.jsx)

| Hook | Purpose |
|------|---------|
| `useInView(threshold)` | Dual-threshold IntersectionObserver: triggers `true` at threshold on enter, resets `false` only when element is fully off-screen (`intersectionRatio === 0`). Enables animation replay on re-scroll. |
| `useTypewriter(words, ...)` | Ref-based state machine cycling through `meta.roles`; no stale closure issues. |
| `useCountUp(targetStr, inView)` | rAF-based counter; parses numeric from strings like `'85%'`, `'130K+'`; animates when `inView` becomes true. |
| `useMounted()` | Returns `true` after first render; drives the stagger animation sequence on the Hero section. |

---

## Design System

### Colours
| Token | Value | Usage |
|-------|-------|-------|
| Page background | `#0a0a0a` / `#111111` | Root div |
| Card background | `#0e0e0e` | `.card` elements |
| Border default | `#1c1c1c` | Card and section borders |
| Accent (teal) | `#64ffda` | CTA buttons, highlights, dots, underlines |
| Text primary | `#e8e8e8` | Headings |
| Text body | `#bbb` | Paragraph text |
| Text muted | `#777` / `#555` | Labels, timestamps |

### Fonts
Space Mono (`font-display` Tailwind class) for headings, nav, and monogram.
Inter for body text. Both are loaded via `@import` inside `GLOBAL_STYLES`.

### Animations
- **Scroll-reveal:** `.fade-up` class toggled to `.in-view` via `useInView`. GPU-composited with `translate3d(0, 32px, 0)` and `backface-visibility: hidden`.
- **Slide-in:** `.anim-slide-left` for the avatar box — `translate3d(-40px, 0, 0)`.
- **Pop:** `.anim-pop` for achievement cards.
- **Card spotlight:** `cardGlowHandlers` sets CSS vars `--gx`/`--gy` on mouse move for a radial highlight effect on `.card` elements.
- **Avatar float:** `avatar-float` keyframe animation (vertical bob, pauses on hover).
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables all transforms/transitions.

---

## Known Placeholders & TODOs

| Item | Location | Status |
|------|----------|--------|
| Twitter/X link | `social.js → twitter` | Set to `'#'` — update when ready |
| Resume PDF | `public/resume.pdf` | File not present; `showResume: false` keeps button hidden |
| Blog articles | `blog.js` | Array is empty; section is hidden. Add entries to make it appear |
| Avatar photo | `about.js → showAvatar` | Currently `false` (shows monogram placeholder). Set `true` when a profile photo is ready |
| Professional projects | `projects.js → showProfessional` | Currently `false`. Set `true` to expose the Professional tab |

---

## Rules for Making Changes

1. **Content only → edit `src/data/*.js`**. Never put data directly in `Portfolio.jsx`.
2. **New sections** require: a data file in `src/data/`, an import in `Portfolio.jsx`, a component, and a `<Component />` call in `App`.
3. **Styles** — prefer `GLOBAL_STYLES` for anything that needs to be a named CSS class; use Tailwind utilities for layout and spacing. Do not introduce a separate CSS file.
4. **Icons** — use `lucide-react` exclusively. Import at the top of `Portfolio.jsx`.
5. **Do not add a new dependency** without a specific reason. The current stack (React + Tailwind + lucide-react) covers all needs.
6. **The Blog section is self-managing** — it returns `null` when empty. Do not add a fallback UI for it; just populate `blog.js`.
7. **`PROJECTS_INITIAL = 3`** controls how many projects show before the "show more" toggle. Change it there — not in the render logic.
