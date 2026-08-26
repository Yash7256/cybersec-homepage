# CyberSec Toolkit — Color System

> A complete reference for every color value, token, and pattern used across the codebase.  
> All values use **oklch** format (the project standard). Hex equivalents are provided for quick visual reference.

---

## Table of Contents

1. [Color Space & Format](#color-space--format)
2. [Design Tokens — CSS Custom Properties](#design-tokens--css-custom-properties)
3. [Semantic Color Roles](#semantic-color-roles)
4. [Gradient & Shadow Tokens](#gradient--shadow-tokens)
5. [Tailwind Mapping](#tailwind-mapping)
6. [Inline / Component-Level Colors](#inline--component-level-colors)
7. [Severity / Status Palette](#severity--status-palette)
8. [Typography Color Tokens](#typography-color-tokens)
9. [Blog Prose Override Colors](#blog-prose-override-colors)
10. [Component-by-Component Reference](#component-by-component-reference)
11. [Dark Mode Layer](#dark-mode-layer)
12. [Animations & Keyframes That Use Color](#animations--keyframes-that-use-color)
13. [Rules & Conventions](#rules--conventions)

---

## Color Space & Format

All colors **must** be written in **oklch** format:

```
oklch(lightness chroma hue / alpha)
```

- `lightness` — 0 (black) to 1 (white)  
- `chroma` — 0 (grey) to ~0.4 (vivid)  
- `hue` — degrees, 0–360 (285–300 = violet/purple; 145 = green; 25–35 = orange/amber)  
- `alpha` — optional, 0–1

The site is **dark-only in practice** — the `:root` block defines the visual appearance and the `.dark` block exists for system-preference parity. The actual UI always renders the `:root` values.

---

## Design Tokens — CSS Custom Properties

Defined in `frontend/src/styles.css`.

### Base Radius

| Token | Value |
|---|---|
| `--radius` | `0.625rem` (base, ~10px) |
| `--radius-sm` | `calc(var(--radius) - 4px)` = 6px |
| `--radius-md` | `calc(var(--radius) - 2px)` = 8px |
| `--radius-lg` | `var(--radius)` = 10px |
| `--radius-xl` | `calc(var(--radius) + 4px)` = 14px |
| `--radius-2xl` | `calc(var(--radius) + 8px)` = 18px |
| `--radius-3xl` | `calc(var(--radius) + 12px)` = 22px |
| `--radius-4xl` | `calc(var(--radius) + 16px)` = 26px |

---

### Core Color Tokens (`:root`)

These are the live values that define the visual UI.

| Token | oklch Value | Approximate Hex | Role |
|---|---|---|---|
| `--background` | `oklch(0.13 0.03 285)` | `#0d0a17` | Page / section background |
| `--foreground` | `oklch(0.98 0.005 285)` | `#f8f7fb` | Primary text |
| `--card` | `oklch(0.18 0.04 285)` | `#171027` | Card backgrounds |
| `--card-foreground` | `oklch(0.98 0.005 285)` | `#f8f7fb` | Text on cards |
| `--popover` | `oklch(0.18 0.04 285)` | `#171027` | Popover backgrounds |
| `--popover-foreground` | `oklch(0.98 0.005 285)` | `#f8f7fb` | Text in popovers |
| `--primary` | `oklch(0.7 0.18 295)` | `#a855f7` ≈ | Purple — main accent, CTAs, highlights |
| `--primary-foreground` | `oklch(0.13 0.03 285)` | `#0d0a17` | Text on primary-colored elements |
| `--primary-glow` | `oklch(0.78 0.2 300)` | `#c084fc` ≈ | Brighter purple for glows |
| `--secondary` | `oklch(0.22 0.05 285)` | `#1c1329` | Subtle secondary surfaces |
| `--secondary-foreground` | `oklch(0.98 0.005 285)` | `#f8f7fb` | Text on secondary |
| `--muted` | `oklch(0.2 0.04 285)` | `#180f26` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.7 0.03 285)` | `#9d95ab` ≈ | Subdued / secondary text |
| `--accent` | `oklch(0.7 0.18 295)` | `#a855f7` ≈ | Same as primary — accent actions |
| `--accent-foreground` | `oklch(0.13 0.03 285)` | `#0d0a17` | Text on accent |
| `--destructive` | `oklch(0.65 0.22 25)` | `#ef4444` ≈ | Errors, critical severity |
| `--destructive-foreground` | `oklch(0.98 0.005 285)` | `#f8f7fb` | Text on destructive |
| `--border` | `oklch(0.28 0.05 285)` | `#2e1f4a` ≈ | Default border / divider |
| `--input` | `oklch(0.22 0.05 285)` | `#1c1329` | Form input backgrounds |
| `--ring` | `oklch(0.7 0.18 295)` | `#a855f7` ≈ | Focus ring |
| `--terminal-green` | `oklch(0.85 0.25 145)` | `#4ade80` ≈ | Terminal output, "active/running" |

---

### Extended Semantic Tokens

| Token | oklch Value | Use |
|---|---|---|
| `--chart-1` | `oklch(0.646 0.222 41.116)` | Chart series 1 (orange-ish) |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | Chart series 2 (teal) |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | Chart series 3 (blue-grey) |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | Chart series 4 (yellow) |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | Chart series 5 (amber) |

### Sidebar Tokens

| Token | oklch Value |
|---|---|
| `--sidebar` | `oklch(0.984 0.003 247.858)` |
| `--sidebar-foreground` | `oklch(0.129 0.042 264.695)` |
| `--sidebar-primary` | `oklch(0.208 0.042 265.755)` |
| `--sidebar-primary-foreground` | `oklch(0.984 0.003 247.858)` |
| `--sidebar-accent` | `oklch(0.968 0.007 247.896)` |
| `--sidebar-accent-foreground` | `oklch(0.208 0.042 265.755)` |
| `--sidebar-border` | `oklch(0.929 0.013 255.508)` |
| `--sidebar-ring` | `oklch(0.704 0.04 256.788)` |

> Note: Sidebar tokens are defined but the sidebar component is not used in the current homepage UI. They exist for future dashboard use.

---

## Semantic Color Roles

| Role | Token | Visual |
|---|---|---|
| Page background | `--background` | Deep dark purple-black |
| Primary text | `--foreground` | Near-white with slight purple tint |
| Muted text | `--muted-foreground` | Medium grey-purple |
| Brand accent | `--primary` / `--accent` | Vivid violet-purple |
| Success / Live / Running | `--terminal-green` | Bright lime-green |
| Error / Critical | `--destructive` | Red-orange |
| Cards / Surfaces | `--card` | Slightly lighter than background |
| Borders / Dividers | `--border` | Low-chroma purple-grey |
| Focus ring | `--ring` | Same as primary |

---

## Gradient & Shadow Tokens

Defined in `:root`, used directly in component `style` props.

| Token | Value | Where used |
|---|---|---|
| `--gradient-hero` | `radial-gradient(ellipse at top, oklch(0.4 0.2 295 / 0.5), transparent 60%)` | Hero section ambient glow |
| `--gradient-primary` | `linear-gradient(135deg, oklch(0.7 0.18 295), oklch(0.78 0.2 310))` | Primary gradient (purple → brighter purple) |
| `--shadow-glow` | `0 0 60px oklch(0.7 0.18 295 / 0.4)` | Purple glow drop shadow |
| `--shadow-card` | `0 10px 40px -10px oklch(0.1 0.05 285 / 0.6)` | Card elevation shadow |

---

## Tailwind Mapping

The `@theme inline` block maps CSS tokens to Tailwind utility classes. Use these class names in JSX:

| Tailwind Class | Token | Example |
|---|---|---|
| `bg-background` | `--background` | Page wrapper `bg-background` |
| `text-foreground` | `--foreground` | Body text |
| `bg-card` | `--card` | Card surfaces |
| `text-card-foreground` | `--card-foreground` | Text inside cards |
| `bg-primary` | `--primary` | CTA button background |
| `text-primary` | `--primary` | Accent text, links |
| `bg-primary/10` | `--primary` at 10% alpha | Subtle primary tint |
| `bg-muted` | `--muted` | Skeleton, disabled areas |
| `text-muted-foreground` | `--muted-foreground` | Placeholder, secondary text |
| `bg-destructive` | `--destructive` | Error states |
| `text-destructive` | `--destructive` | Error text |
| `border-border` | `--border` | Default borders |
| `ring-ring` | `--ring` | Focus outlines |
| `bg-accent` | `--accent` | Accent fills |

### Opacity Modifier Pattern

Throughout the codebase, opacity modifiers on tokens are heavily used:

```
border-border/40      → --border at 40% opacity
bg-primary/10         → --primary at 10% opacity  
text-muted-foreground/55  → --muted-foreground at 55% opacity
bg-black/40           → pure black at 40% opacity
```

---

## Inline / Component-Level Colors

These hardcoded hex / oklch values appear inline in component `className` or `style` props. They are **not** registered as tokens but are part of the design system in practice.

### Purple Scale (Brand)

| Value | Approx | Used for |
|---|---|---|
| `#8B5CF6` | violet-500 | Hero preview border, scan CTA gradient |
| `#A855F7` | violet-500 lighter | Hero preview sidebar active, scan CTA |
| `#C084FC` | violet-400 | Icon tints, sidebar icons, glow |
| `#a985ff` | light violet | Pricing heading accent, links |
| `#c7a6ff` | very light violet | Footer email submit button |
| `#b993ff` | soft violet | Step icons |
| `#dbc5ff` | pale violet | Feature icon gradient start |
| `#EFE8FF` / `#efe9f8` | near-white violet | Primary text, CTA button text |
| `#d4cde3` | light grey-violet | Body text on dark cards |
| `#b7a3e8` | muted violet | Section labels, dashboard headers |
| `#e9ddff` | very pale violet | Service list text |
| `#c7b8ea` | medium pale violet | Dashboard sidebar inactive items |
| `#7f6aa5` | dark muted violet | Step number ghost text |
| `#5f4a82` | deep violet | Card borders, product card borders |
| `#3d2959` | very dark violet | Footer dividers |
| `#322344` | footer column border |
| `#352541` | footer email input background |
| `#25193E` | deep purple card background |
| `#180d29` / `#13091f` / `#10081d` | near-black purple | Deep backgrounds |
| `#0d0618` / `#08050f` / `#07050d` | darkest purple-black | Panel backgrounds, deep overlays |

### Background Shades

| Value | Used for |
|---|---|
| `#0a0810` | CTA button inner background (hero) |
| `#0c0716` | Blog page background |
| `#0e0718` | post-strip gradient |
| `#10081d` | Hero preview outer wrap |
| `#14091f` | post-strip gradient |
| `#170b28` | post-strip gradient |
| `#10061c` | post-strip gradient |
| `#1a0f2e` | Blog featured image fallback bg |

### Green — Terminal / Active / Success

| Value | oklch equivalent | Used for |
|---|---|---|
| `#4ade80` ≈ | `oklch(0.85 0.25 145)` | Terminal output text, scan progress bars, live indicator dots |

Used inline as:
- `text-[oklch(0.85_0.25_145)]`
- `bg-[oklch(0.85_0.25_145)]`
- `bg-[oklch(0.85_0.25_145/0.45)]`

### Orange / Amber — High Severity

| Value | Used for |
|---|---|
| `#F97316` | Footer CTA border glow, scan CTA gradient, severity "high" |
| `#f59e0b` | High severity gradient |
| `oklch(0.8 0.18 35)` | "High" severity text |
| `oklch(0.65 0.22 25 / 0.15)` | "High" severity badge background |
| `oklch(0.7 0.18 35 / 0.45)` | Window chrome "warning" dot |

### Red — Critical / Destructive

| Value | Used for |
|---|---|
| `#ef4444` | Critical severity gradient |
| `oklch(0.65 0.22 25)` | Token `--destructive`, critical badge text |
| `#fb7185` | Attack surface score "High" tag |

### Neutral / White

| Value | Used for |
|---|---|
| `#ffffff` | Marquee text, navbar active item |
| `#f8f5ff` | Feature card title, step heading |
| `#ede8f6` | Blog featured post title |
| `#ded5ed` | Navbar link color |
| `#d7d0df` | Hero subtitle |
| `#cfc4de` | Footer CTA subtext |
| `#bdb0cf` | Footer description text |
| `#c6bad5` | Footer link color |
| `#8f839c` | Footer placeholder, copyright |
| `#000000` | Pure black — marquee background |
| `#151019` | Login / secondary CTA button text |

---

## Severity / Status Palette

A consistent severity system is used across all dashboard panels.

| Severity | Background | Text | Badge BG | Used in |
|---|---|---|---|---|
| **Critical** | `bg-destructive/20` | `text-destructive` (`oklch(0.65 0.22 25)`) | `bg-destructive/15` | All dashboard views, executive report |
| **High** | `bg-[oklch(0.65_0.22_25/0.15)]` | `text-[oklch(0.8_0.18_35)]` | — | Workflow panel, use-cases |
| **Medium** | `bg-primary/10` | `text-primary/80` | — | Executive report findings |
| **Low** | `bg-muted/20` | `text-muted-foreground` | — | Dev dashboard summary |
| **Info / Info** | — | `text-muted-foreground` | — | Secondary findings |

### Severity Gradient Bars (SummaryCard)

Used in the hero preview animated scan summary:

| Severity | Gradient |
|---|---|
| Critical | `from-[#ef4444]/55 via-[#ef4444]/20 to-transparent` |
| High | `from-[#f59e0b]/55 via-[#f59e0b]/20 to-transparent` |
| Medium | `from-[#eab308]/55 via-[#eab308]/20 to-transparent` |
| Low | `from-[#22c55e]/55 via-[#22c55e]/20 to-transparent` |
| Default (Attack Surface / Info) | `from-[#A855F7]/45 via-[#A855F7]/16 to-transparent` |

### Status Dot Colors

| State | Color | Usage |
|---|---|---|
| Live / Running / Active | `oklch(0.85 0.25 145)` — green | Scan running indicators |
| Scan complete | `oklch(0.85 0.25 145)` — green | Executive report header |
| From the community | `oklch(0.85 0.25 145)` — green | Social proof label dot |
| Building in public | `oklch(0.85 0.25 145)` — green | Founder card status |
| Live (dev dashboard) | `bg-destructive` with glow | Pre-deploy scan indicator |

---

## Typography Color Tokens

These CSS custom properties define font family / size but also set the base text color context.

| Token | Value |
|---|---|
| `--color` | `rgba(7, 5, 10, 1)` — near-black (legacy, rarely used directly) |

Font families in use (color-neutral but part of the type system):

| Token | Font | Usage |
|---|---|---|
| `--hero-font-family` / `font-heading` | Bricolage Grotesque | Headlines, section titles, numbers |
| `--body-default-font-family` / `font-body` | DM Sans | Body text, labels, UI copy |
| `--label-font-family` | JetBrains Mono | Monospace labels, code, terminal, tracking |
| `--subtitle-font-family` | DM Sans | Subtitle / large body |

---

## Blog Prose Override Colors

Defined in `@layer components` as `.prose-blog`. These override `@tailwindcss/typography` defaults.

| Variable | oklch Value | Role |
|---|---|---|
| `--tw-prose-body` | `oklch(0.88 0.01 285)` | Article body text |
| `--tw-prose-headings` | `oklch(0.97 0.005 285)` | Article headings |
| `--tw-prose-lead` | `oklch(0.78 0.02 285)` | Lead paragraph |
| `--tw-prose-links` | `oklch(0.78 0.18 295)` | Hyperlinks in prose |
| `--tw-prose-bold` | `oklch(0.97 0.005 285)` | Bold text |
| `--tw-prose-counters` | `oklch(0.65 0.03 285)` | Ordered list counters |
| `--tw-prose-bullets` | `oklch(0.45 0.08 295)` | Unordered list bullets |
| `--tw-prose-hr` | `oklch(0.28 0.05 285)` | Horizontal rule |
| `--tw-prose-quotes` | `oklch(0.88 0.01 285)` | Blockquote text |
| `--tw-prose-quote-borders` | `oklch(0.7 0.18 295)` | Blockquote left border |
| `--tw-prose-captions` | `oklch(0.6 0.03 285)` | Image captions |
| `--tw-prose-code` | `oklch(0.85 0.12 295)` | Inline code text |
| `--tw-prose-pre-code` | `oklch(0.9 0.01 285)` | Code block text |
| `--tw-prose-pre-bg` | `oklch(0.12 0.04 285)` | Code block background |
| `--tw-prose-th-borders` | `oklch(0.32 0.06 285)` | Table header border |
| `--tw-prose-td-borders` | `oklch(0.22 0.04 285)` | Table cell border |

### Prose Component Overrides

| Element | Color |
|---|---|
| Inline code background | `oklch(0.18 0.05 285)` |
| Inline code text | `oklch(0.85 0.15 295)` |
| Inline code border | `oklch(0.28 0.06 285)` |
| Link underline (default) | `oklch(0.7 0.18 295 / 0.4)` |
| Link hover color | `oklch(0.9 0.18 300)` |
| Link hover underline | `oklch(0.7 0.18 295)` |
| Blockquote background | `oklch(0.18 0.06 285 / 0.6)` |
| Blockquote left border | `oklch(0.7 0.18 295)` — 3px |
| Table header background | `oklch(0.18 0.05 285)` |
| Table even row tint | `oklch(0.14 0.03 285 / 0.4)` |
| Image border | `oklch(0.28 0.05 285)` |
| `<h2>` bottom border | `oklch(0.22 0.04 285)` |

---

## Component-by-Component Reference

### SiteNavbar

| Element | Color |
|---|---|
| Navbar pill background (resting) | `#7d61aa` at 58% opacity |
| Navbar pill background (scrolled) | `#7d61aa` at 80% opacity |
| Navbar pill border | `white/12` |
| Active nav item text | `#ffffff` |
| Active nav indicator pill | `#000000` with `white/20` border |
| Inactive nav item | `#ded5ed` |
| "Sign Up" button border | `white/70` |
| "Sign Up" button background | `black/70` |
| "Sign Up" button text | `#e8e3ec` |
| "Log In" button gradient | `from-[#f4efff] to-[#b7b1bd]` |
| "Log In" button text | `#151019` |

### SiteFooter

| Element | Color |
|---|---|
| Footer background | `#13081f` |
| Footer text | `#efe8ff` |
| CTA box border | `#5f4a82` |
| CTA box background | `#07050d` at 55% opacity |
| CTA "Start Scanning" button border | `#f97316` at 70% opacity (orange) |
| CTA button glow | `rgba(249, 115, 22, 0.26)` |
| CTA button hover border | `#c084fc` |
| Horizontal divider | gradient through `#3d2959` |
| Column borders | `#3d2959` |
| Link color | `#c6bad5` |
| Link hover | `#ffffff` |
| Section heading | `#ffffff` |
| Description text | `#bdb0cf` |
| Email input background | `#352541` |
| Submit button background | `#c7a6ff` |
| Submit button text | `#160a24` |
| Copyright text | `#8f839c` |
| Bottom border | `#3d2959` |

### Hero Section (index.tsx)

| Element | Color |
|---|---|
| Background glow | `#8f43dd` at 75% opacity, blurred 190px |
| Grid overlay | 65% opacity, `mix-blend-screen` |
| H1 text | `text-foreground` (token) |
| Subtitle text | `#d7d0df` |
| "Start Scanning" CTA gradient | `conic-gradient` — `#8B5CF6` → `#F97316` loop |
| "Start Scanning" CTA glow | same conic gradient, blurred 14px, 42% opacity |
| CTA inner bg | `#0a0810` |
| CTA text | `#efe9f8` |
| "Watch It Work" button gradient | `linear-gradient(180deg, #EFE8FF 0%, #999 125.6%)` |
| "Watch It Work" text | `text-background` (very dark, from token) |
| Tool strip border | `border-border/45` |
| Tool strip chip bg | `black/40` |
| Tool strip text | `foreground/55` |
| Tool strip dot dividers | `border/50` |
| Chip hover border | `primary/40` |
| Chip hover text | `foreground/80` |

### Hero Preview Panel (HeroPreview)

| Element | Color |
|---|---|
| Panel border | `#8B5CF6` at 70% opacity |
| Panel background | `#10081d` at 90% opacity |
| Top glow strip | `#A855F7` at 45% opacity |
| Box shadow | `rgba(168, 85, 247, 0.45)` top + `rgba(139, 92, 246, 0.22)` outer |
| Sidebar button (active) | border `#A855F7`, bg `#A855F7/12`, text `#EFE8FF` |
| Sidebar button (inactive) | border `#8B5CF6/35`, bg `#08050f/45`, text `#c7b8ea` |
| Sidebar icon | `#C084FC` |
| Label text (uppercase) | `#b7a3e8` |
| Target input border | `#8B5CF6/35`, bg `black/75` |
| Clear icon | `text-destructive` (token) |
| Terminal text | `oklch(0.85 0.25 145)` — green |
| Terminal "live scan" heading | `text-foreground` (token) |
| Inner panel background | `black/90` |
| Service list text | `#e9ddff` |
| Service list icons | `#C084FC` |
| Progress bar bg | `#08050f` |
| Progress bar fill | `oklch(0.85 0.25 145)` — green |
| "Overall Progress" label | `oklch(0.85 0.25 145)` — green |
| Summary card border | `#8B5CF6/35`, bg `black/90` |
| Summary card label | `#b7a3e8` |
| Summary card number | `text-foreground` |
| Summary "High" risk tag | `#fb7185` |
| Status bar label | `#b7a3e8` |
| Status % text | `text-muted-foreground` |

### FeatureCard / Steps (index.tsx)

| Element | Color |
|---|---|
| Card border | `#5f4a82` |
| Card background | `#25193E` |
| Card icon gradient | `from-[#dbc5ff] via-[#ae7aff] to-[#9b48f4]` |
| Icon fill | `#13091f` |
| Card title | `#f8f5ff` |
| Card body | `#d4cde3` |
| Step ghost number | `#7f6aa5` at 35% opacity |
| Step icon circle border | `#f7f0ff` |
| Step icon circle bg | `#180d29` at 70% opacity |
| Step icon | `#b993ff` |
| Step number text | `#f8f5ff` |
| Step label | `#d4cde3` |
| Step body | `#bcb2cd` |

### ProductCapabilities

| Element | Color |
|---|---|
| Section background | `radial-gradient` — `oklch(0.4 0.2 295 / 0.12)` top glow |
| Top rule | gradient through `oklch(0.28 0.05 285)` and `oklch(0.7 0.18 295 / 0.3)` |
| Background grid | `oklch(0.7 0.18 295)` lines at 2.5% opacity |
| Eyebrow label | `text-muted-foreground` |
| Eyebrow accent line | `oklch(0.7 0.18 295 / 0.6)` |
| Heading | `text-foreground` |
| Heading gradient span | `linear-gradient(135deg, oklch(0.7 0.18 295), oklch(0.78 0.2 310), oklch(0.9 0.05 285))` |
| Body | `text-muted-foreground` |
| Card left/right border | `oklch(0.28 0.05 285 / 0.7)` |
| Card top border (center) | gradient through `oklch(0.7 0.18 295 / 0.5)` |
| Card top border (sides) | `oklch(0.28 0.05 285 / 0.7)` |
| Hover top accent line | `oklch(0.7 0.18 295 / 0.8)` |
| Hover glow | `oklch(0.7 0.18 295 / 0.05)` radial |
| Illustration area border | `oklch(0.28 0.05 285 / 0.5)` |
| Bottom fade | `oklch(0.13 0.03 285)` to transparent |
| Bottom section rule | `oklch(0.28 0.05 285 / 0.7)` |

### WorkflowSection

| Element | Color |
|---|---|
| Section border-top | `oklch(0.28 0.05 285 / 0.7)` |
| Ambient glow | `oklch(0.4 0.2 295 / 0.055)` radial |
| Eyebrow line | `bg-primary/60` |
| Headline gradient span | `linear-gradient(135deg, oklch(0.7 0.18 295), oklch(0.78 0.2 310), oklch(0.9 0.05 285))` |
| Body text | `text-muted-foreground` |
| Foreground text | `text-foreground/85` |
| Workflow label line | `bg-primary/50` |
| Dashboard bg | `#080512` at 85% opacity |
| Dashboard border | `border-border/50` |
| Dashboard chrome dots | destructive/50, `oklch(0.7 0.18 35/0.45)`, `oklch(0.85 0.25 145/0.45)` |
| Dashboard running dot | `oklch(0.85 0.25 145)` |
| Pipeline active phase | `oklch(0.7 0.18 295 / 0.75)` |
| Pipeline arrow | `oklch(0.3 0.04 285)` |
| Pipeline TARGET label | `oklch(0.6 0.03 285)` |
| Tool card border | `border-border/30`, bg `black/35` |
| Tool name | `text-muted-foreground/55` |
| Tool value | `text-foreground/45` |
| BG right fade | `oklch(0.07 0.02 285 / 0.95)` to transparent |
| BG bottom fade | `oklch(0.07 0.02 285 / 0.9)` to transparent |
| Exec report border | `border-border/70`, bg `#0d0618` at 98% opacity |
| Exec report shadow | `oklch(0.28 0.05 285 / 0.5)` ring + `oklch(0.7 0.18 295 / 0.07)` top glow |
| Exec report header icon | `text-primary/70` |
| Scan complete badge | `oklch(0.85 0.25 145)` — green |
| Risk score border | `border-destructive/25`, bg `destructive/5` |
| Risk score bar gradient | `oklch(0.65 0.22 25) → oklch(0.7 0.18 295)` |
| "Elevated" label | `oklch(0.8 0.18 35)` — amber |
| AI summary text | `text-foreground/70` |
| AI summary highlight | `text-foreground/90` |
| AI summary critical | `text-destructive` |
| Priority number (urgent) | `text-destructive` |
| Priority number (normal) | `text-primary/55` |
| Action bar bg | `black/50` |
| Ask field placeholder | `text-muted-foreground/40` |
| Closing line text | `text-muted-foreground` |

### UseCasesSection

| Element | Color |
|---|---|
| Outer border | `oklch(0.28 0.05 285 / 0.7)` |
| Left ambient | `oklch(0.4 0.2 295 / 0.06)` |
| Section divider | `oklch(0.28 0.05 285 / 0.45)` |
| Headline gradient | same brand gradient |
| Body text | `text-muted-foreground` |
| Active persona number | `oklch(0.7 0.18 295)` |
| Inactive persona number | `oklch(0.42 0.04 285)` |
| Active persona label | `oklch(0.98 0.005 285)` |
| Inactive persona label | `oklch(0.58 0.03 285)` |
| Nav dot bar bg | `border/40` |
| Nav dot bar fill | `bg-primary` |
| Right card bg | `#0d0618` at 95% opacity |
| Right card shadow | `oklch(0.28 0.05 285 / 0.4)` ring + `oklch(0.7 0.18 295 / 0.06)` top |
| Right card top glow | `oklch(0.7 0.18 295 / 0.4)` |
| Right card bottom fade | `oklch(0.08 0.03 285 / 0.95)` |

### SocialProof

| Element | Color |
|---|---|
| Section border | `oklch(0.28 0.05 285 / 0.7)` |
| Ambient glow | `oklch(0.4 0.2 295 / 0.055)` |
| Eyebrow line | `bg-primary/60` |
| Heading gradient | brand gradient |
| Bento cell border | `border-border/50` |
| Bento cell bg | `bg-card` |
| Bento cell hover accent | `oklch(0.7 0.18 295 / 0.6)` line |
| Image placeholder bg | `oklch(0.15 0.035 285)` |
| Image placeholder frame border | `oklch(0.3 0.05 285 / 0.6)` dashed |
| Utility cell "live" dot | `oklch(0.85 0.25 145)` — green |
| Footer note text | `text-muted-foreground/40` |

### PricingTeaser

| Element | Color |
|---|---|
| Section border | `oklch(0.28 0.05 285 / 0.7)` |
| Ambient glow | `oklch(0.4 0.2 295 / 0.06)` |
| FREE card border | `border-border/60` |
| FREE card bg | `bg-card` |
| FREE card hover border | `primary/40` |
| Scan grid stroke | `oklch(0.7 0.18 295 / 0.07)` |
| Scan line decorative | `oklch(0.7 0.18 295 / 0.12)` |
| Icon container border | `border-primary/30`, bg `primary/10` |
| Icon container glow | `oklch(0.7 0.18 295 / 0.15)` |
| CTA button border | `border-primary/50`, bg `primary/10` |
| CTA button hover | `primary/15`, `border-primary` |
| Tag chips border | `border-border/50`, bg `black/30` |
| Tag text | `text-muted-foreground/60` |
| TEAM card border | `border-border/50` |
| TEAM card bg | `#0d0618` at 80% opacity |
| TEAM card hover hover border | `border-border/80` |
| TEAM team icon container | `border-border/50`, bg `black/40` |
| TEAM feature dash line | `oklch(0.7 0.18 295 / 0.4)` |
| TEAM feature text | `text-muted-foreground/70` |
| TEAM network SVG | `oklch(0.7 0.18 295)` at 12% opacity |
| TEAM "Talk to us" link | `text-muted-foreground` → hover `text-foreground` |

### FounderNote

| Element | Color |
|---|---|
| Section border | `oklch(0.28 0.05 285 / 0.7)` |
| Ambient glow | `oklch(0.4 0.2 295 / 0.04)` |
| Eyebrow accent line | `oklch(0.7 0.18 295 / 0.55)` |
| Eyebrow text | `text-muted-foreground/60` |
| Heading gradient | brand gradient |
| Body text | `text-muted-foreground` |
| Highlighted text | `text-foreground/75` |
| Highlight span | `oklch(0.78 0.15 295)` — slightly desaturated primary |
| Identity card border | `border-border/50` |
| Identity card bg | `bg-card` |
| Identity card ring | `oklch(0.22 0.04 285 / 0.4)` |
| Identity mark SVG | `oklch(0.7 0.18 295)` at 40% opacity |
| Founder name | `text-foreground` |
| Founder role | `text-muted-foreground/70` |
| Divider | `oklch(0.28 0.05 285 / 0.7)` |
| Status dot | `oklch(0.85 0.25 145)` — green |
| Status text | `text-muted-foreground/55` |
| Quote text | `text-muted-foreground/60` italic |

### Pricing Page (pricing.tsx)

| Element | Color |
|---|---|
| Hero purple glow | `#8e45dc` at 70% opacity |
| Featured card bg | `linear-gradient(180deg, rgba(110,54,170,0.82) 0%, rgba(0,0,0,0.94) 42%)` |
| Featured card border | `#8062af` |
| Non-featured card bg | `#403b4e` at 72% opacity backdrop-blur |
| Non-featured card border | `white/18` |
| Plan name | `#f7f2ff` |
| Badge bg | `white/16` |
| Badge text | `#d8d0e4` |
| Price text | `white` |
| Price unit | `#e5deed` |
| Pro CTA gradient | `conic-gradient` — `#8B5CF6` → `#F97316` |
| White CTA gradient | `from-[#f2eef5] to-[#c7c0ca]` |
| White CTA text | `#120d19` |
| Pro CTA text | `#a8a3ad` hover `#d2ccd6` |
| Feature list text | `#ded8e7` |
| Feature checkmark (featured) | bg `white`, text `black` |
| Feature checkmark (plain) | `text-white` |
| FAQ heading | `text-foreground` |
| FAQ subtext | `#ded8e7` |
| FAQ card bg | `#24173d` |
| FAQ card border | `#6c588c` |
| FAQ trigger text | `#eee8f8` |
| FAQ answer text | `#ded8e7` |
| "Pricing Plans" badge bg | `black` |
| Pricing badge text | `#eee8f8` |
| Badge shadow | `rgba(168, 85, 247, 0.34)` |
| "Enterprise Security" span | `#a985ff` |
| "Contact Us" link | `#a985ff` underlined |
| Page subtitle | `#d7d0df` |
| FAQs subtext | `#ded8e7` |

### Blog Page (blog.tsx)

| Element | Color |
|---|---|
| Page background | `#0c0716` |
| Blog post border | `#2e1f4a` |
| Blog featured hover border | `#7c3aed` at 60% opacity |
| Featured title | `#ede8f6` |
| Featured title hover | `#c084fc` |
| Featured date | `#7a6895` |
| "Read Article →" link | `#9d7fcb` hover `#c084fc` |
| Skeleton bg | `#1a0f2e` |
| Skeleton shimmer | `#2a1a40` |
| Blog card skeleton bg | `#0e0818` at 60% opacity |
| Blog card skeleton shimmer | `#1e1133`, `#2a1a40` |
| Featured image fallback bg | `from-[#1a0f2e] to-[#0e0818]` |
| Empty state border | `#2e1f4a` dashed |
| Empty state icon | `#3a2860` |
| Empty state text | `#7a6895` |
| Empty state subtext | `#4a3a6a` |
| Error border | `red-900/30` |
| Error bg | `red-950/10` |
| Error text | `red-400` |
| Error retry border | `red-800/40`, bg `red-900/20` |

---

## Dark Mode Layer

The `.dark` block in `styles.css` is defined for browser system preference. The tokens in it are **not the primary visual values** — the `:root` block above is what users see. The `.dark` values drift toward a more blue-grey palette:

| Token | Dark Value | vs Root |
|---|---|---|
| `--background` | `oklch(0.129 0.042 264.695)` | Slightly more blue-grey (hue 264 vs 285) |
| `--primary` | `oklch(0.929 0.013 255.508)` | Near-white, desaturated (vs vivid purple) |
| `--ring` | `oklch(0.551 0.027 264.364)` | Desaturated mid-blue |
| `--border` | `oklch(1 0 0 / 10%)` | Pure white at 10% |

> In practice, because `@custom-variant dark (&:is(.dark *))` is declared, dark mode only activates when a `.dark` class is present on a parent element. The site does not toggle this — the `:root` dark-by-default palette is always active.

---

## Animations & Keyframes That Use Color

### `scan-cta-gradient` (Hero & Pricing CTA)

```css
conic-gradient(
  from 180deg,
  #8B5CF6 0%,           /* violet */
  #8B5CF6E6 8%,         /* violet, slight fade */
  #8B5CF61A 20%,        /* violet, very faint */
  #F9731621 34%,        /* orange, faint */
  #F97316 50%,          /* orange, full */
  #F97316B3 62%,        /* orange, partial */
  #8B5CF61A 78%,        /* violet, very faint */
  #8B5CF6 100%          /* back to violet */
)
```
→ Spins on hover via `@keyframes scan-cta-gradient-spin`.

### `pro-cta-border` (Pricing Pro card)

```css
conic-gradient(
  from 222deg,
  #8B5CF6 0deg,         /* violet */
  #8B5CF6 78deg,
  #151019 132deg,       /* near-black */
  #000 190deg,
  #4f2a14 252deg,       /* dark orange-brown */
  #F97316 318deg,       /* orange */
  #8B5CF6 360deg
)
```

### `shimmer` (skeleton loaders)

Uses `background-position` animation — color is defined inline on the element.

### `marquee` / `marquee-vertical`

Transform-only animations; color set on element (`text-[#ffffff]`, `bg-[#000000]`).

### `image-glow` / `fade-in` / `fade-up`

Opacity transitions only; no color changes.

---

## Rules & Conventions

1. **All new colors must use `oklch` format.** Never add hex-only tokens to the theme block.

2. **Register before use.** If you add a new semantic color:
   - Add the variable to `:root` (and `.dark` if needed)
   - Register it in `@theme inline`
   - Document it in this file

3. **Prefer tokens over literals.** Use `text-primary`, `bg-card`, etc. over inline hex values. Inline hardcoded values are acceptable for one-off decorative elements (glows, gradients, mock UI data) but should not be used for semantic roles.

4. **Opacity modifiers are canonical.** `oklch(0.7 0.18 295 / 0.4)` and `bg-primary/40` are both valid — the latter is preferred in Tailwind className strings.

5. **Terminal green is not "success" globally.** It specifically represents "live", "running", and "active scan" states. Do not reuse it for general success messaging.

6. **The orange (`#F97316` / hue ~25–35) is reserved for high-severity and the footer CTA.** It creates intentional visual tension as a "warning / action required" color.

7. **White-text on dark backgrounds** should use the foreground token (`oklch(0.98 0.005 285)`) rather than pure `#ffffff`, which is reserved for the active navbar item and the marquee strip.

8. **The gradient trio** — `oklch(0.7 0.18 295) → oklch(0.78 0.2 310) → oklch(0.9 0.05 285)` — is the brand gradient. Use it for section headline accents only, applied via `WebkitBackgroundClip: "text"`.
