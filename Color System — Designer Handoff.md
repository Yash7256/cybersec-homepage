# CyberSec Toolkit — Color System · Designer Handoff

> This document is written for a UI/UX designer.
> It maps **every component → every color it uses**, shows which colors come from the global design token system vs. hardcoded values, and explains when and why each is used.
> Format: Component → Element → Color value → Token or raw → Why

---

## How the Color System Works (Read This First)

The project has **two layers** of color:

### Layer 1 — Design Tokens (CSS Custom Properties)
Defined in `styles.css`. These are the "official" system.
When you see `bg-primary` or `text-muted-foreground` in code, it's pulling from here.

| Token name | Color | What it looks like |
|---|---|---|
| `--background` | `oklch(0.13 0.03 285)` | Deep dark purple-black — page base |
| `--foreground` | `oklch(0.98 0.005 285)` | Near-white with a faint violet tint — primary text |
| `--primary` | `oklch(0.7 0.18 295)` | Vivid violet-purple — brand accent, CTAs, links |
| `--primary-foreground` | `oklch(0.13 0.03 285)` | Dark — text placed ON a purple button |
| `--card` | `oklch(0.18 0.04 285)` | Slightly lighter than background — card surfaces |
| `--muted` | `oklch(0.2 0.04 285)` | Similar to card — disabled/skeleton areas |
| `--muted-foreground` | `oklch(0.7 0.03 285)` | Medium grey-purple — secondary/supporting text |
| `--border` | `oklch(0.28 0.05 285)` | Dark violet-grey — all borders and dividers |
| `--destructive` | `oklch(0.65 0.22 25)` | Red-orange — errors, critical severity |
| `--ring` | `oklch(0.7 0.18 295)` | Same as primary — keyboard focus outlines |
| `--terminal-green` | `oklch(0.85 0.25 145)` | Bright lime-green — "live", "running", "active" states only |

**Opacity modifiers** are used everywhere. `bg-primary/10` means primary color at 10% opacity. `border-border/40` means the border token at 40%.

### Layer 2 — Hardcoded Values
Some components use hex or raw oklch values directly in JSX, especially for:
- One-off decorative glows and gradients
- The mock product UI (dashboard panels)
- Brand-specific purple shades not in the token set

These are documented per component below.

---

## The Brand Gradient (Used Across All Section Headings)

Every section headline uses the **same gradient** on the accent word:

```
linear-gradient(135deg,
  oklch(0.7 0.18 295),    ← Primary violet
  oklch(0.78 0.2 310),    ← Slightly shifted, lighter
  oklch(0.9 0.05 285)     ← Fades to near-white
)
```

Applied as a text fill (WebkitBackgroundClip: text). Used in:
- ProductCapabilities — "Designed for intelligence."
- WorkflowSection — "One answer:"
- UseCasesSection — "for every workflow."
- SocialProof — "getting louder."
- PricingTeaser — "the answer."
- FounderNote — "shouldn't live across ten different tools."

---

## Component Color Maps

---

### 1. SiteNavbar

**File:** `components/site-navbar.tsx`
**Where it appears:** Fixed bar at top of every page.

| Element | Color | Source | Notes |
|---|---|---|---|
| Nav pill container (resting) | `#7d61aa` at 58% opacity | Hardcoded | Muted violet, semi-transparent |
| Nav pill container (scrolled) | `#7d61aa` at 80% opacity | Hardcoded | Becomes more opaque on scroll |
| Nav pill border | white at 12% opacity | Hardcoded | Subtle glass edge |
| Active nav item text | `#ffffff` | Hardcoded | Pure white |
| Active nav indicator (black pill) | `#000000` + `white/20` border | Hardcoded | Floating black pill under active link |
| Inactive nav item text | `#ded5ed` | Hardcoded | Pale lavender-grey |
| Inactive nav hover bg | white at 8% opacity | Hardcoded | Very subtle highlight |
| — | — | — | — |
| **Sign Up** button border | white at 70% opacity | Hardcoded | |
| **Sign Up** button bg | black at 70% opacity | Hardcoded | |
| **Sign Up** text | `#e8e3ec` | Hardcoded | Off-white |
| **Sign Up** hover border/text | white | Hardcoded | |
| — | — | — | — |
| **Log In** button gradient | `from-[#f4efff] to-[#b7b1bd]` | Hardcoded | Light lavender → grey |
| **Log In** button text | `#151019` | Hardcoded | Near-black on light button |
| **Log In** hover gradient | `from-white to-[#cbc5d1]` | Hardcoded | Slightly brighter |
| **Log In** inset highlight | white at 78% opacity | Hardcoded | Glass sheen on top edge |

**Designer note:** The navbar deliberately floats above whatever page background is underneath. The pill is translucent so the hero glow bleeds through it, creating depth.

---

### 2. SiteFooter

**File:** `components/site-footer.tsx`
**Where it appears:** Bottom of every page.

| Element | Color | Source | Notes |
|---|---|---|---|
| Footer background | `#13081f` | Hardcoded | Darkest purple-black in the system |
| Base text color | `#efe8ff` | Hardcoded | Pale lavender-white |
| — | — | — | — |
| **CTA box** border | `#5f4a82` | Hardcoded | Deep violet border |
| **CTA box** background | `#07050d` at 55% | Hardcoded | Near-black, slightly transparent |
| CTA title text | white | Token `--foreground` approx | |
| CTA subtitle text | `#cfc4de` | Hardcoded | Soft lavender |
| **Start Scanning** button border | `#f97316` at 70% | Hardcoded | Orange — intentional contrast / "action" |
| **Start Scanning** button bg | black | Hardcoded | |
| **Start Scanning** button glow | `rgba(249,115,22,0.26)` | Hardcoded | Orange halo |
| **Start Scanning** hover border | `#c084fc` | Hardcoded | Switches to violet on hover |
| — | — | — | — |
| Horizontal divider gradient | transparent → `#3d2959` → transparent | Hardcoded | Subtle purple line |
| Column separator borders | `#3d2959` | Hardcoded | |
| Column header text | white | Hardcoded | |
| Link text | `#c6bad5` | Hardcoded | Mid-purple grey |
| Link hover | white | Hardcoded | |
| Description text | `#bdb0cf` | Hardcoded | |
| — | — | — | — |
| Email input background | `#352541` | Hardcoded | Dark purple input |
| Email placeholder text | `#8f839c` | Hardcoded | Muted |
| Email input text | white | Hardcoded | |
| **Join Now** button bg | `#c7a6ff` | Hardcoded | Soft lavender-purple |
| **Join Now** button text | `#160a24` | Hardcoded | Near-black on light button |
| **Join Now** hover bg | white | Hardcoded | |
| — | — | — | — |
| Bottom border | `#3d2959` | Hardcoded | |
| Copyright text | `#8f839c` | Hardcoded | Subdued grey-purple |

**Designer note:** The orange on "Start Scanning" is intentional — it's the only orange CTA in the footer, creating visual urgency and contrast against the all-purple page.

---

### 3. Hero Section

**File:** `routes/index.tsx` — the `Index` component and `HeroPreview` sub-component.
**Where it appears:** The very first thing you see on the homepage.

#### 3a. Hero Background & Headline

| Element | Color | Source | Notes |
|---|---|---|---|
| Page background | `bg-background` token | Token | `oklch(0.13 0.03 285)` |
| Purple glow blob (behind headline) | `#8f43dd` at 75%, blurred 190px | Hardcoded | Creates the top purple haze |
| Grid texture overlay | 65% opacity, mix-blend-screen | Asset | Decorative grid image |
| H1 headline | `text-foreground` | Token | Near-white |
| Subtitle text | `#d7d0df` | Hardcoded | Soft lavender-grey |

#### 3b. CTA Buttons

| Element | Color | Source | Notes |
|---|---|---|---|
| **Start Scanning** animated border | `conic-gradient(#8B5CF6 → #F97316 → #8B5CF6)` | Hardcoded | Purple-to-orange spinning gradient |
| **Start Scanning** outer glow | same gradient, blurred 14px, 42% | Hardcoded | The "glow" around the button |
| **Start Scanning** inner bg | `#0a0810` | Hardcoded | Deep near-black fill |
| **Start Scanning** text | `#efe9f8` | Hardcoded | Pale lavender-white |
| — | — | — | — |
| **Watch It Work** gradient | `linear-gradient(180deg, #EFE8FF 0%, #999 125.6%)` | Hardcoded | White-grey gradient |
| **Watch It Work** border | `#FFF` (white) | Hardcoded | |
| **Watch It Work** text | `text-background` token | Token | Very dark (uses background token) |

#### 3c. Tool Capability Strip (below dashboard)

| Element | Color | Source | Notes |
|---|---|---|---|
| Label "EVERYTHING YOU NEED…" | `text-muted-foreground/45` | Token + opacity | Very faint |
| Pill border | `border-border/45` | Token + opacity | |
| Pill background | `black/40` | Hardcoded | |
| Pill text | `text-foreground/55` | Token + opacity | Dimmed text |
| Pill hover border | `primary/40` | Token + opacity | Purple tint on hover |
| Pill hover text | `text-foreground/80` | Token + opacity | Brighter on hover |
| Dot separators between pills | `bg-border/50` | Token + opacity | |

#### 3d. HeroPreview — the animated scan dashboard

| Element | Color | Source | Notes |
|---|---|---|---|
| Panel border | `#8B5CF6` at 70% | Hardcoded | Violet border |
| Panel background | `#10081d` at 90% | Hardcoded | Deep purple-black |
| Top gradient glow | `#A855F7` at 45% | Hardcoded | Purple sheen from top edge |
| Box shadow top | `rgba(168,85,247,0.45)` | Hardcoded | Purple top-glow |
| Box shadow outer | `rgba(139,92,246,0.22)` | Hardcoded | Faint outer halo |
| — | — | — | — |
| Sidebar button (active) | border `#A855F7`, bg `#A855F7/12`, text `#EFE8FF` | Hardcoded | |
| Sidebar button (inactive) | border `#8B5CF6/35`, bg `#08050f/45`, text `#c7b8ea` | Hardcoded | |
| Sidebar icons | `#C084FC` | Hardcoded | Medium violet |
| Section labels (SERVICES, STATUS, etc.) | `#b7a3e8` | Hardcoded | Muted violet |
| — | — | — | — |
| Terminal text (output lines) | `oklch(0.85 0.25 145)` = terminal green | Token `--terminal-green` | |
| Terminal "LIVE SCAN" heading | `text-foreground` | Token | |
| Inner panel bg | `black/90` | Hardcoded | |
| Service list text | `#e9ddff` | Hardcoded | Very pale violet |
| Service icons | `#C084FC` | Hardcoded | |
| Progress bar track | `#08050f` | Hardcoded | Nearly pure black |
| Progress bar fill | `oklch(0.85 0.25 145)` | Token `--terminal-green` | Green = completed |
| "Overall Progress" label | `oklch(0.85 0.25 145)` | Token `--terminal-green` | |
| Status percentage text | `text-muted-foreground` | Token | |

#### 3e. Scan Summary Cards (attack surface / severity scores)

| Card Type | Gradient | 
|---|---|
| Attack Surface Score / Default | `from-[#A855F7]/45 via-[#A855F7]/16 to-transparent` |
| Critical Issues | `from-[#ef4444]/55 via-[#ef4444]/20 to-transparent` |
| High Issues | `from-[#f59e0b]/55 via-[#f59e0b]/20 to-transparent` |
| Medium Issues | `from-[#eab308]/55 via-[#eab308]/20 to-transparent` |
| Low Issues | `from-[#22c55e]/55 via-[#22c55e]/20 to-transparent` |

| Element | Color | Source |
|---|---|---|
| Card border | `#8B5CF6/35` | Hardcoded |
| Card background | `black/90` | Hardcoded |
| Card label | `#b7a3e8` | Hardcoded |
| Count number | `text-foreground` | Token |
| "High" risk tag | `#fb7185` | Hardcoded — rose/pink |

---

### 4. ProductCapabilities

**File:** `components/product-capabilities.tsx`
**Where it appears:** Directly after the hero dashboard. Three columns (FIG. 01, 02, 03) with Lottie animations.

| Element | Color | Source | Notes |
|---|---|---|---|
| Section background radial glow | `oklch(0.4 0.2 295 / 0.12)` — purple tint | Hardcoded | Visible only at top of section |
| Top separator line | gradient through `oklch(0.28 0.05 285)` + `oklch(0.7 0.18 295 / 0.3)` | Hardcoded | Center of gradient is slightly glowing |
| Background grid dots | `oklch(0.7 0.18 295)` at 2.5% opacity | Hardcoded | Near invisible grid |
| Bottom fade overlay | `oklch(0.13 0.03 285 / 0.8)` | Hardcoded | Fades section into next |
| — | — | — | — |
| Eyebrow label "PRODUCT / CAPABILITIES" | `text-muted-foreground` | Token | |
| Eyebrow accent line | `oklch(0.7 0.18 295 / 0.6)` | Hardcoded | Small purple horizontal rule |
| Section heading | `text-foreground` | Token | |
| Heading gradient span | Brand gradient (see top of doc) | Hardcoded | |
| Description text | `text-muted-foreground` | Token | |
| — | — | — | — |
| Card column left/right borders | `oklch(0.28 0.05 285 / 0.7)` | Hardcoded | |
| Card top border (side cards) | `oklch(0.28 0.05 285 / 0.7)` solid | Hardcoded | |
| Card top border (center card) | gradient: `oklch(0.28 0.05 285 / 0.5)` → `oklch(0.7 0.18 295 / 0.5)` → back | Hardcoded | Center card gets glowing top edge |
| Hover top accent line | `oklch(0.7 0.18 295 / 0.8)` | Hardcoded | Bright on hover |
| Hover ambient glow | `oklch(0.7 0.18 295 / 0.05)` | Hardcoded | Very faint violet wash |
| Figure label (FIG. 01 etc.) | `text-muted-foreground` | Token | |
| Card title | `text-foreground` | Token | |
| Card description | `text-muted-foreground` | Token | |
| Illustration area separator | `oklch(0.28 0.05 285 / 0.5)` | Hardcoded | |
| Illustration bottom fade | `oklch(0.13 0.03 285)` to transparent | Hardcoded | |
| Bottom section rule | `oklch(0.28 0.05 285 / 0.7)` | Hardcoded | |

---

### 5. UseCasesSection

**File:** `components/use-cases-section.tsx`
**Where it appears:** After ProductCapabilities. Scroll-pinned section with 3 persona dashboards.

#### 5a. Section Shell

| Element | Color | Source | Notes |
|---|---|---|---|
| Section background | `bg-background` | Token | |
| Top/bottom borders | `oklch(0.28 0.05 285 / 0.7)` | Hardcoded | |
| Left ambient glow | `oklch(0.4 0.2 295 / 0.06)` | Hardcoded | Faint left-side purple |
| Section divider (left/right split) | `oklch(0.28 0.05 285 / 0.45)` | Hardcoded | |

#### 5b. Left Panel (text + persona nav)

| Element | Color | Source | Notes |
|---|---|---|---|
| Headline | `text-foreground` | Token | |
| Headline gradient span | Brand gradient | Hardcoded | |
| Body paragraph text | `text-muted-foreground` | Token | |
| Nav dot bar track | `border/40` | Token + opacity | |
| Nav dot bar fill (active) | `bg-primary` | Token | Vivid violet |
| Active persona number | `oklch(0.7 0.18 295)` | Hardcoded | Primary violet |
| Inactive persona number | `oklch(0.42 0.04 285)` | Hardcoded | Very dark, barely visible |
| Active persona label | `oklch(0.98 0.005 285)` | Hardcoded | Near-white |
| Inactive persona label | `oklch(0.58 0.03 285)` | Hardcoded | Grey-purple |
| Arrow icon (active) | `text-primary` | Token | |

#### 5c. Right Panel (product card shell)

| Element | Color | Source | Notes |
|---|---|---|---|
| Card background | `#0d0618` at 95% | Hardcoded | Deep purple-near-black |
| Card border | `border-border/55` | Token + opacity | |
| Card ring shadow | `oklch(0.28 0.05 285 / 0.4)` | Hardcoded | |
| Card top glow line | `oklch(0.7 0.18 295 / 0.4)` | Hardcoded | Thin purple edge highlight |
| Card bottom fade | `oklch(0.08 0.03 285 / 0.95)` | Hardcoded | Fades content out at bottom |

#### 5d. Developer Dashboard (inside right card)

| Element | Color | Source | Notes |
|---|---|---|---|
| "LIVE" indicator dot | `bg-destructive` | Token | Red with glow |
| Indicator glow | `oklch(0.65 0.22 25/0.8)` | Hardcoded | |
| "LIVE" text | `text-primary` | Token | Violet |
| Row border | `border-border/40` | Token | |
| Row background | `black/45` | Hardcoded | |
| Critical badge | `bg-destructive/20 text-destructive` | Token | Red |
| High badge | `bg-[oklch(0.65_0.22_25/0.15)] text-[oklch(0.8_0.18_35)]` | Hardcoded | Amber-orange |
| Medium badge | `bg-primary/10 text-primary` | Token | Violet |
| Low badge | `bg-muted/20 text-muted-foreground` | Token | Grey |
| Finding label | `text-foreground/90` | Token | |
| Path text | `text-muted-foreground/50` | Token | |
| CVE text | `text-primary/50` | Token | Faint violet |
| Summary card border/bg | `border-border/40 bg-black/55` | Token + hardcoded | |
| Critical count | `text-destructive` | Token | Red |
| High count | `text-[oklch(0.8_0.18_35)]` | Hardcoded | Amber |
| Medium count | `text-primary` | Token | Violet |
| Low count | `text-muted-foreground` | Token | Grey |

#### 5e. Founder Dashboard (inside right card)

| Element | Color | Source | Notes |
|---|---|---|---|
| Risk score border | `border-destructive/25 bg-destructive/5` | Token | Subtle red tint |
| Risk bar gradient | `oklch(0.65 0.22 25) → oklch(0.7 0.18 295)` | Hardcoded | Red fading to purple |
| Risk number | `text-foreground` | Token | |
| Issue row border/bg | `border-border/40 bg-black/45` | Token + hardcoded | |
| Urgent icon | `text-destructive` | Token | |
| Non-urgent icon | `text-primary/60` | Token | |
| "3 critical risks" text | `text-destructive` | Token | |
| "Act" badge | `bg-destructive/15 text-destructive` | Token | |

#### 5f. Pentester Dashboard (inside right card)

| Element | Color | Source | Notes |
|---|---|---|---|
| Active indicator dot | `oklch(0.85 0.25 145)` = green | Token `--terminal-green` | Pulsing |
| "ACTIVE" text | `oklch(0.85 0.25 145)` | Token `--terminal-green` | |
| Completed progress bar | `oklch(0.85 0.25 145)` | Token `--terminal-green` | Green = done |
| In-progress bar | `oklch(0.7 0.18 295)` | Token `--primary` | Purple = in progress |
| Asset icons | `text-primary/50` | Token | |
| Asset text | `text-foreground/65` | Token | |
| Speed stat border | `border-primary/20 bg-primary/5` | Token | |
| Time value | `text-primary` | Token | Vivid violet |

---

### 6. WorkflowSection

**File:** `components/workflow-section.tsx`
**Where it appears:** After UseCases. Left text + right layered dashboard + executive report.

#### 6a. Section Shell

| Element | Color | Source | Notes |
|---|---|---|---|
| Background | `bg-background` | Token | |
| Top border | `oklch(0.28 0.05 285 / 0.7)` | Hardcoded | |
| Left ambient glow | `oklch(0.4 0.2 295 / 0.055)` | Hardcoded | |

#### 6b. Left Text Column

| Element | Color | Source | Notes |
|---|---|---|---|
| Eyebrow line | `bg-primary/60` | Token | |
| Eyebrow text | `text-muted-foreground` | Token | |
| Heading | `text-foreground` | Token | |
| Heading gradient span | Brand gradient | Hardcoded | |
| Body text | `text-muted-foreground` | Token | |
| Inline emphasis | `text-foreground/85` | Token | |
| Workflow step line | `bg-primary/50` | Token | |
| Workflow step text | `text-muted-foreground/55` | Token | |

#### 6c. Background Dashboard

| Element | Color | Source | Notes |
|---|---|---|---|
| Dashboard bg | `#080512` at 85% | Hardcoded | Very dark purple |
| Chrome dots: close | `bg-destructive/50` | Token | Red |
| Chrome dots: warning | `oklch(0.7 0.18 35/0.45)` | Hardcoded | Amber |
| Chrome dots: go | `oklch(0.85 0.25 145/0.45)` | Token approx | Green |
| "RUNNING" indicator dot | `oklch(0.85 0.25 145)` | Token `--terminal-green` | |
| Pipeline phase labels | `oklch(0.7 0.18 295 / 0.7)` varying | Hardcoded | Fades with each phase |
| Pipeline arrows `→` | `oklch(0.3 0.04 285)` | Hardcoded | Dark, almost invisible |
| Pipeline "TARGET" label | `oklch(0.6 0.03 285)` | Hardcoded | Mid grey |
| Tool card border | `border-border/30` | Token | |
| Tool card bg | `black/35` | Hardcoded | |
| Tool name | `text-muted-foreground/55` | Token | |
| Tool value | `text-foreground/45` | Token | |
| Right-edge fade | `oklch(0.07 0.02 285 / 0.95)` to transparent | Hardcoded | Hides right side of dashboard |
| Bottom fade | `oklch(0.07 0.02 285 / 0.9)` to transparent | Hardcoded | |

#### 6d. Foreground Executive Report

| Element | Color | Source | Notes |
|---|---|---|---|
| Panel bg | `#0d0618` at 98% | Hardcoded | |
| Panel ring shadow | `oklch(0.28 0.05 285 / 0.5)` | Hardcoded | |
| Panel top glow | `oklch(0.7 0.18 295 / 0.07)` | Hardcoded | Faint purple from above |
| Header icon | `text-primary/70` | Token | |
| Header label | `text-foreground/90` | Token | |
| "Scan complete" badge border | `oklch(0.85 0.25 145/0.3)` | Token approx | |
| "Scan complete" badge bg | `oklch(0.85 0.25 145/0.08)` | Token approx | |
| "Scan complete" dot + text | `oklch(0.85 0.25 145)` | Token `--terminal-green` | |
| Risk score border/bg | `border-destructive/25 bg-destructive/5` | Token | |
| "ELEVATED" label | `oklch(0.8 0.18 35)` | Hardcoded | Amber |
| Risk bar gradient | `oklch(0.65 0.22 25) → oklch(0.7 0.18 295)` | Hardcoded | Red → purple |
| Overview text | `text-foreground/70` | Token | |
| "Two issues" emphasis | `text-destructive` | Token | |
| Finding: Critical badge | `bg-destructive/20 text-destructive` | Token | |
| Finding: High badge | `bg-[oklch(0.65_0.22_25/0.15)] text-[oklch(0.8_0.18_35)]` | Hardcoded | |
| Finding: Medium badge | `bg-primary/10 text-primary/80` | Token | |
| CVE reference text | `text-primary/45` | Token | |
| Action item border/bg | `border-border/30 bg-black/35` | Token + hardcoded | |
| Urgent action number | `text-destructive` | Token | |
| Normal action number | `text-primary/55` | Token | |
| Action text | `text-foreground/75` | Token | |
| AI chat bar bg | `black/50` | Hardcoded | |
| Placeholder text | `text-muted-foreground/40` | Token | |
| Icon buttons | `text-muted-foreground/35` → hover `text-muted-foreground/70` | Token | |
| Closing line text | `text-muted-foreground` | Token | |
| Emphasis in closing | `text-foreground/90` | Token | |

---

### 7. SocialProof

**File:** `components/social-proof.tsx`
**Where it appears:** After WorkflowSection. Bento grid of community feedback screenshots.

| Element | Color | Source | Notes |
|---|---|---|---|
| Section bg | `bg-background` | Token | |
| Top border | `oklch(0.28 0.05 285 / 0.7)` | Hardcoded | |
| Ambient glow | `oklch(0.4 0.2 295 / 0.055)` | Hardcoded | Top-right area |
| Eyebrow line | `bg-primary/60` | Token | |
| Eyebrow text | `text-muted-foreground` | Token | |
| Heading | `text-foreground` | Token | |
| Heading gradient | Brand gradient | Hardcoded | |
| Subtext | `text-muted-foreground` | Token | |
| — | — | — | — |
| Bento cell border | `border-border/50` | Token | |
| Bento cell bg | `bg-card` | Token | |
| Bento cell hover top line | `oklch(0.7 0.18 295 / 0.6)` | Hardcoded | |
| Image placeholder bg | `oklch(0.15 0.035 285)` | Hardcoded | Dark purple |
| Placeholder dashed border | `oklch(0.3 0.05 285 / 0.6)` | Hardcoded | |
| Placeholder icon/text | `text-muted-foreground/30` | Token | |
| — | — | — | — |
| Utility cell: label text | `text-muted-foreground/60` | Token | |
| Utility cell: body text | `text-foreground/70` | Token | |
| "From the community" pill border | `border-border/50` | Token | |
| Community dot | `oklch(0.85 0.25 145)` | Token `--terminal-green` | Green live dot |
| Community dot glow | `oklch(0.85 0.25 145 / 0.6)` | Hardcoded | |
| Community pill text | `text-muted-foreground/60` | Token | |
| Footer note text | `text-muted-foreground/40` | Token | |

---

### 8. PricingTeaser

**File:** `components/pricing-teaser.tsx`
**Where it appears:** After SocialProof. Two-card pricing summary.

| Element | Color | Source | Notes |
|---|---|---|---|
| Section bg | `bg-background` | Token | |
| Top border | `oklch(0.28 0.05 285 / 0.7)` | Hardcoded | |
| Ambient glow | `oklch(0.4 0.2 295 / 0.06)` | Hardcoded | |
| Eyebrow line | `bg-primary/60` | Token | |
| Eyebrow text | `text-muted-foreground` | Token | |
| Heading | `text-foreground` | Token | |
| Heading gradient | Brand gradient | Hardcoded | |
| Subtext | `text-muted-foreground` | Token | |
| — | — | — | — |
| **Free card** border | `border-border/60` | Token | |
| **Free card** bg | `bg-card` | Token | |
| **Free card** hover border | `primary/40` | Token | |
| **Free card** hover glow | `oklch(0.7 0.18 295 / 0.04)` | Hardcoded | |
| Scan grid stroke | `oklch(0.7 0.18 295 / 0.07)` | Hardcoded | Near invisible grid lines |
| Icon box border | `border-primary/30` | Token | |
| Icon box bg | `bg-primary/10` | Token | |
| Icon box glow | `oklch(0.7 0.18 295 / 0.15)` | Hardcoded | |
| Icon | `text-primary` | Token | |
| "Start Free" label | `text-primary/80` | Token | |
| Card heading | `text-foreground` | Token | |
| "No card required" | `text-muted-foreground` | Token | |
| Tool tag chips border | `border-border/50` | Token | |
| Tool tag chips bg | `black/30` | Hardcoded | |
| Tool tag text | `text-muted-foreground/60` | Token | |
| CTA button border | `border-primary/50` | Token | |
| CTA button bg | `bg-primary/10` | Token | |
| CTA button text | `text-primary` | Token | |
| CTA hover | `primary/15`, `border-primary` | Token | |
| — | — | — | — |
| **Team card** border | `border-border/50` | Token | |
| **Team card** bg | `#0d0618` at 80% | Hardcoded | |
| **Team card** ring | `oklch(0.22 0.04 285 / 0.5)` | Hardcoded | |
| **Team card** hover top line | `oklch(0.7 0.18 295 / 0.35)` | Hardcoded | |
| Team icon box | `border-border/50 bg-black/40` | Token + hardcoded | |
| Team icon | `text-muted-foreground` | Token | Greyed out vs. primary on free card |
| "For Teams" label | `text-muted-foreground/70` | Token | |
| Team heading | `text-foreground` | Token | |
| "Talk to us." | `text-muted-foreground` | Token | |
| Feature dash lines | `oklch(0.7 0.18 295 / 0.4)` | Hardcoded | Subtle purple dash |
| Feature text | `text-muted-foreground/70` | Token | |
| "Talk to us" link | `text-muted-foreground` → hover `text-foreground` | Token | |
| Network SVG decoration | `oklch(0.7 0.18 295)` at 12% | Hardcoded | Ghost purple network |

---

### 9. FounderNote

**File:** `components/founder-note.tsx`
**Where it appears:** After PricingTeaser. Editorial two-column founder statement.

| Element | Color | Source | Notes |
|---|---|---|---|
| Section bg | `bg-background` | Token | |
| Top border | `oklch(0.28 0.05 285 / 0.7)` | Hardcoded | |
| Left ambient | `oklch(0.4 0.2 295 / 0.04)` | Hardcoded | Very faint |
| Section label line | `oklch(0.7 0.18 295 / 0.55)` | Hardcoded | |
| Section label text | `text-muted-foreground/60` | Token | |
| Heading | `text-foreground` | Token | |
| Heading gradient | Brand gradient | Hardcoded | |
| Body text | `text-muted-foreground` | Token | |
| Key insight text | `text-foreground/75` | Token | Slightly elevated |
| Inline link/highlight | `oklch(0.78 0.15 295)` | Hardcoded | Slightly desaturated purple |
| — | — | — | — |
| **Identity card** border | `border-border/50` | Token | |
| **Identity card** bg | `bg-card` | Token | |
| **Identity card** ring | `oklch(0.22 0.04 285 / 0.4)` | Hardcoded | |
| **Identity card** hover top line | `oklch(0.7 0.18 295 / 0.4)` | Hardcoded | |
| Identity mark SVG arcs | `oklch(0.7 0.18 295)` | Token `--primary` | Purple at 40% opacity |
| Identity mark centre dot | `oklch(0.7 0.18 295 / 0.8)` | Token | |
| "Built by a developer" label | `text-muted-foreground/50` | Token | |
| Name | `text-foreground` | Token | |
| Role | `text-muted-foreground/70` | Token | |
| Divider line | `oklch(0.28 0.05 285 / 0.7)` | Hardcoded | |
| Status dot | `oklch(0.85 0.25 145)` | Token `--terminal-green` | Green "live" |
| Status dot glow | `oklch(0.85 0.25 145 / 0.6)` | Hardcoded | |
| Status text | `text-muted-foreground/55` | Token | |
| Quote text | `text-muted-foreground/60 italic` | Token | |

---

### 10. Pricing Page

**File:** `routes/pricing.tsx`
**Where it appears:** `/pricing` route. Full pricing page with 3 plan cards + FAQ.

#### 10a. Hero / Header

| Element | Color | Source | Notes |
|---|---|---|---|
| Background | `bg-background` | Token | |
| Purple glow blob | `#8e45dc` at 70% | Hardcoded | Same hero pattern as homepage |
| "Pricing Plans" badge bg | black | Hardcoded | |
| Badge text | `#eee8f8` | Hardcoded | |
| Badge glow | `rgba(168,85,247,0.34)` | Hardcoded | |
| Badge border gradient | `conic-gradient(#F97316 → #A985FF → #F97316)` | Hardcoded | Orange-to-violet conic |
| H1 text | `text-foreground` | Token | |
| "Security." accent word | `#a985ff` | Hardcoded | Light violet |
| Subtitle | `#d7d0df` | Hardcoded | |

#### 10b. Plan Cards

| Element | Starter & Enterprise | Pro (Featured) | Source |
|---|---|---|---|
| Card bg | `#403b4e` at 72% | `linear-gradient(180deg, rgba(110,54,170,0.82) → rgba(0,0,0,0.94))` | Hardcoded |
| Card border | `white/18` | `#8062af` | Hardcoded |
| Plan name | `#f7f2ff` | `#f7f2ff` | Hardcoded |
| Badge | — | `white/16` bg, `#d8d0e4` text | Hardcoded |
| Price | white | white | Hardcoded |
| Price unit | `#e5deed` | `#e5deed` | Hardcoded |
| CTA button | white gradient `#f2eef5→#c7c0ca`, text `#120d19` | black bg, `conic-gradient` border, text `#a8a3ad` | Hardcoded |
| Feature list text | `#ded8e7` | `#ded8e7` | Hardcoded |
| Check (Starter/Enterprise) | text-white icon | white bg + black icon | Hardcoded |

#### 10c. FAQ Section

| Element | Color | Source | Notes |
|---|---|---|---|
| FAQ item bg | `#24173d` | Hardcoded | Dark violet |
| FAQ item border | `#6c588c` | Hardcoded | Mid violet |
| Question text | `#eee8f8` | Hardcoded | |
| Answer text | `#ded8e7` | Hardcoded | |
| "FAQs" pill bg | black | Hardcoded | |
| "Still have questions?" text | `#ded8e7` | Hardcoded | |
| "Contact Us" link | `#a985ff` | Hardcoded | Light violet |

---

### 11. Blog Page

**File:** `routes/blog.tsx`
**Where it appears:** `/blog` route.

| Element | Color | Source | Notes |
|---|---|---|---|
| Page background | `#0c0716` | Hardcoded | Very dark purple — slightly different from global `--background` |
| "Latest Blog" / "Read More Blogs" labels | `#ede8f6` | Hardcoded | Pale lavender |
| — | — | — | — |
| Featured post card border | `#2e1f4a` | Hardcoded | |
| Featured post hover border | `#7c3aed` at 60% | Hardcoded | Brighter violet on hover |
| Post title text | `#ede8f6` | Hardcoded | |
| Post title hover | `#c084fc` | Hardcoded | Primary violet |
| Post meta (date, reading time) | `#7a6895` | Hardcoded | Muted violet-grey |
| "Read Article →" | `#9d7fcb` → hover `#c084fc` | Hardcoded | |
| — | — | — | — |
| Skeleton border | `#2e1f4a` | Hardcoded | |
| Skeleton pulse bg | `#1a0f2e`, `#2a1a40` | Hardcoded | |
| Blog card skeleton bg | `#0e0818` at 60% | Hardcoded | |
| Card thumbnail skeleton | `#1e1133` | Hardcoded | |
| — | — | — | — |
| Empty state border | `#2e1f4a` dashed | Hardcoded | |
| Empty state icon | `#3a2860` | Hardcoded | |
| Empty state text | `#7a6895`, `#4a3a6a` | Hardcoded | |
| — | — | — | — |
| Error border | `red-900/30` | Tailwind | |
| Error bg | `red-950/10` | Tailwind | |
| Error text | `red-400` | Tailwind | |
| Retry button | `red-800/40` border, `red-900/20` bg | Tailwind | |

---

## Severity Color System (Used Across All Dashboard UIs)

This is a consistent system used in UseCasesSection, WorkflowSection, and the Hero preview.

| Severity | Badge Background | Badge Text | Context |
|---|---|---|---|
| **Critical** | `bg-destructive/20` = red at 20% | `text-destructive` = token red | `--destructive` = `oklch(0.65 0.22 25)` |
| **High** | `bg-[oklch(0.65_0.22_25/0.15)]` | `text-[oklch(0.8_0.18_35)]` | Amber-orange, NOT a token — hardcoded |
| **Medium** | `bg-primary/10` = violet at 10% | `text-primary` or `text-primary/80` | Uses token `--primary` |
| **Low** | `bg-muted/20` | `text-muted-foreground` | Uses tokens |
| **Info / default** | none | `text-muted-foreground` | Uses token |

**Key point for designers:** Medium severity uses the brand purple (`--primary`), not a yellow. This is intentional — the scale is Red → Amber → Purple → Grey.

---

## Special / Shared Colors That Appear Everywhere

These values are used across multiple components with the same meaning:

| Value | Meaning | Used in |
|---|---|---|
| `oklch(0.85 0.25 145)` = `--terminal-green` | "Live", "Running", "Active", "Complete" | Hero preview, WorkflowSection, UseCasesSection, SocialProof, FounderNote |
| `oklch(0.7 0.18 295)` = `--primary` | Brand purple accent, links, active states, icons | Everywhere |
| `oklch(0.28 0.05 285 / 0.7)` | Section divider line / border | All section borders between components |
| `oklch(0.4 0.2 295 / 0.05–0.12)` | Ambient purple glow (backgrounds) | All section glows |
| `#0d0618` | Deep product UI background | WorkflowSection report, UseCasesSection card, PricingTeaser team card |
| `black/40–55` | Row / item dark backgrounds | Dashboard rows across all panels |
| `border-border/30–50` | Row / item borders | Dashboard rows across all panels |

---

## What Is NOT Tokenised (Things to Fix in the Design System)

These colors should ideally become tokens but are currently hardcoded everywhere:

| Color | Currently hardcoded as | Should be token |
|---|---|---|
| Deep product UI bg | `#0d0618`, `#080512`, `#08050f` | `--surface-deep` or `--panel-bg` |
| Section brand purple | `#8B5CF6`, `#A855F7`, `#C084FC` | Already is `--primary` but hardcoded hex is used instead |
| Muted section labels | `#b7a3e8` | Could be a named token |
| Footer purple tones | `#13081f`, `#3d2959`, `#5f4a82` | `--footer-bg`, `--footer-border` |
| Hero glow tone | `#8f43dd`, `#8e45dc` | `--hero-glow` |
| "High" severity amber | `oklch(0.8 0.18 35)` | `--severity-high` |
| Orange accent (CTAs) | `#F97316` | `--cta-orange` or `--severity-action` |

---

## Font Families (for typography pairing with color)

| Token | Family | Used for |
|---|---|---|
| `font-heading` | Bricolage Grotesque | All headings, numbers, large text |
| `font-body` | DM Sans | Body copy, labels, UI text |
| `font-mono` (implied) | JetBrains Mono | Terminal output, code, eyebrow labels, dashboard data |
