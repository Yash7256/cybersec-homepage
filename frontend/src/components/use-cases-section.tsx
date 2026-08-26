/**
 * UseCasesSection
 *
 * Apple / Linear-style split composition:
 *   Left  — static: large headline, supporting paragraph, persona selector
 *   Right — large product dashboard card; layout never moves, only content morphs
 *
 * Clicking a persona selector fades the current dashboard content out and
 * cross-fades the next one in using GSAP. No scroll-pinning required.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BentoFeatures } from "@/components/bento-features";
import { ShieldAlert, AlertTriangle, Globe, CheckCircle2, Crosshair, Network, Search, FileText, Zap, Server, TrendingUp, Lock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Persona data ───────────────────────────────────────────────────────── */

const personas = [
  {
    id: "developers",
    num: "01",
    label: "For Developers",
    headline: "Catch exposure before you ship.",
    body: "Scan your codebase and infrastructure in the same pipeline you already use. Surface misconfigurations, open ports, and known CVEs before they ever reach production.",
  },
  {
    id: "founders",
    num: "02",
    label: "For Founders",
    headline: "Know your risk without a security team.",
    body: "Plain-language risk scores and prioritised actions give you full security visibility at a glance — no specialist required. Make confident decisions at every stage.",
  },
  {
    id: "pentesters",
    num: "03",
    label: "For Pentesters",
    headline: "Cut recon time from hours to minutes.",
    body: "Run parallel recon, enumerate subdomains, audit SSL and correlate CVEs from one workspace. Every result drops straight into your report.",
  },
] as const;

type PersonaId = typeof personas[number]["id"];

/* ─── Dashboard panels ───────────────────────────────────────────────────── */

function DevDashboard() {
  return (
    <div className="flex h-full flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-destructive shadow-[0_0_6px_oklch(0.65_0.22_25/0.8)]" />
          <span className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
            pre-deploy scan · main branch
          </span>
        </div>
        <span className="font-mono text-[10px] text-primary">LIVE</span>
      </div>

      {/* Findings list */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {[
          { sev: "critical", label: "Exposed admin endpoint",     path: "/api/admin/users",     cve: "CVE-2024-3819" },
          { sev: "high",     label: "SQL injection vector",        path: "/search?q=",            cve: "CVE-2023-4892" },
          { sev: "high",     label: "Open debug port",             path: ":9229 (Node.js)",       cve: null            },
          { sev: "medium",   label: "Missing CSP header",          path: "/ (HTTP)",              cve: null            },
          { sev: "medium",   label: "Deprecated TLS 1.0 active",   path: "443/tcp",               cve: null            },
          { sev: "low",      label: "Server version disclosed",    path: "Server: nginx/1.18",   cve: null            },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center gap-3 rounded-lg border border-border/40 bg-black/45 px-4 py-2.5"
          >
            <span
              className={`shrink-0 rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                row.sev === "critical"
                  ? "bg-destructive/20 text-destructive"
                  : row.sev === "high"
                    ? "bg-[oklch(0.65_0.22_25/0.15)] text-[oklch(0.8_0.18_35)]"
                    : row.sev === "medium"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted/20 text-muted-foreground"
              }`}
            >
              {row.sev}
            </span>
            <span className="min-w-0 flex-1 truncate font-body text-[12px] text-foreground/90">
              {row.label}
            </span>
            <span className="shrink-0 max-w-[140px] truncate font-mono text-[10px] text-muted-foreground/50">
              {row.path}
            </span>
            {row.cve && (
              <span className="shrink-0 font-mono text-[10px] text-primary/50">{row.cve}</span>
            )}
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-2.5 pt-1">
        {[
          { label: "Critical", val: "1", cls: "text-destructive" },
          { label: "High",     val: "2", cls: "text-[oklch(0.8_0.18_35)]" },
          { label: "Medium",   val: "2", cls: "text-primary" },
          { label: "Low",      val: "1", cls: "text-muted-foreground" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border/40 bg-black/55 py-3 text-center"
          >
            <div className={`font-heading text-2xl font-bold ${s.cls}`}>{s.val}</div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FounderDashboard() {
  return (
    <div className="flex h-full flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="h-3.5 w-3.5 text-primary/70" />
          <span className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
            security overview · acmecorp.io
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">Updated 2m ago</span>
      </div>

      {/* Risk score hero */}
      <div className="flex items-center gap-6 rounded-2xl border border-destructive/25 bg-destructive/5 px-6 py-5">
        <div className="shrink-0 text-center">
          <div className="font-heading text-6xl font-bold leading-none text-foreground">68</div>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Risk score
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-muted/20">
            <div
              className="h-full rounded-full"
              style={{
                width: "68%",
                background: "linear-gradient(90deg, oklch(0.65 0.22 25), oklch(0.7 0.18 295))",
              }}
            />
          </div>
          <p className="font-body text-[12px] leading-relaxed text-muted-foreground">
            Your platform has{" "}
            <span className="font-semibold text-destructive">3 critical risks</span> that need
            immediate attention before your next release.
          </p>
        </div>
      </div>

      {/* Plain-language issues */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {[
          {
            Icon: AlertTriangle,
            title: "Customer data may be accessible",
            note: "An API endpoint isn't properly secured — fix before the next release.",
            urgent: true,
          },
          {
            Icon: Lock,
            title: "Login brute-force protection missing",
            note: "Attackers can try unlimited passwords on your sign-in page.",
            urgent: true,
          },
          {
            Icon: Globe,
            title: "Outdated server software running",
            note: "Update your server to patch known security vulnerabilities.",
            urgent: false,
          },
          {
            Icon: CheckCircle2,
            title: "SSL certificate is valid",
            note: "Expires in 84 days. Schedule renewal soon.",
            urgent: false,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 rounded-lg border border-border/40 bg-black/45 px-4 py-3"
          >
            <item.Icon
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                item.urgent ? "text-destructive" : "text-primary/60"
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="font-body text-[12px] font-medium text-foreground/90">
                {item.title}
              </div>
              <div className="font-body text-[11px] leading-relaxed text-muted-foreground">
                {item.note}
              </div>
            </div>
            {item.urgent && (
              <span className="shrink-0 rounded bg-destructive/15 px-2 py-0.5 font-mono text-[9px] uppercase text-destructive">
                Act
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PentesterDashboard() {
  return (
    <div className="flex h-full flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Crosshair className="h-3.5 w-3.5 text-primary/70" />
          <span className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
            recon workspace · target-corp.com
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[oklch(0.85_0.25_145)] shadow-[0_0_6px_oklch(0.85_0.25_145/0.7)]" />
          <span className="font-mono text-[10px] text-[oklch(0.85_0.25_145)]">ACTIVE</span>
        </div>
      </div>

      {/* Progress rows */}
      <div className="space-y-2.5">
        {[
          { Icon: Network,  label: "Port scan (top 1000)",  pct: 100, done: true  },
          { Icon: Globe,    label: "Subdomain enum",         pct: 100, done: true  },
          { Icon: Search,   label: "Dir brute-force",        pct: 74,  done: false },
          { Icon: FileText, label: "HTTP header analysis",   pct: 100, done: true  },
          { Icon: Lock,     label: "SSL/TLS audit",          pct: 100, done: true  },
          { Icon: Zap,      label: "CVE correlation",        pct: 38,  done: false },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <row.Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/55" />
            <span className="w-[150px] shrink-0 font-mono text-[10px] text-muted-foreground">
              {row.label}
            </span>
            <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-muted/20">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${row.pct}%`,
                  background: row.done
                    ? "oklch(0.85 0.25 145)"
                    : "oklch(0.7 0.18 295)",
                }}
              />
            </div>
            <span className="w-9 text-right font-mono text-[10px] text-muted-foreground">
              {row.pct}%
            </span>
          </div>
        ))}
      </div>

      {/* Discovered assets */}
      <div className="flex-1 overflow-hidden rounded-xl border border-border/40 bg-black/50 p-4">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Discovered assets
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {[
            { Icon: Server,  text: "api.target-corp.com"     },
            { Icon: Server,  text: "dev.target-corp.com"     },
            { Icon: Globe,   text: "staging.target-corp.com" },
            { Icon: Network, text: "22/tcp   open  ssh"      },
            { Icon: Network, text: "80/tcp   open  http"     },
            { Icon: Network, text: "443/tcp  open  https"    },
          ].map((a) => (
            <div key={a.text} className="flex items-center gap-2">
              <a.Icon className="h-3 w-3 shrink-0 text-primary/50" />
              <span className="truncate font-mono text-[10px] text-foreground/65">{a.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Speed stat */}
      <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="h-4 w-4 text-primary/70" />
          <span className="font-body text-[12px] text-foreground/80">Full recon completed</span>
        </div>
        <span className="font-mono text-[13px] font-bold text-primary">4m 32s</span>
      </div>
    </div>
  );
}

const dashboards: Record<PersonaId, React.FC> = {
  developers: DevDashboard,
  founders:   FounderDashboard,
  pentesters: PentesterDashboard,
};

/* ─── Section ────────────────────────────────────────────────────────────── */

/* ─── BentoMini — scaled-down bento grid for the right panel ────────────── */
/*
 * Same structural layout as BentoFeatures but:
 *   - No Lottie (too heavy for a pinned sidebar)
 *   - Fills 100% height of its container
 *   - Mini illustrations only
 *   - Columns: [1fr 2.12fr 1fr], rows fill available space via flex
 */

const MINI_CARD: React.CSSProperties = {
  background: "#1d1d3b",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "16px",
  position: "relative",
  overflow: "hidden",
};
const MINI_BG = "#03061c";

function MiniAccent() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
      style={{ background: "linear-gradient(90deg,transparent,oklch(0.7 0.18 295/0.3),transparent)" }} />
  );
}

function MiniScanBars() {
  return (
    <div className="mt-auto flex flex-col gap-1 pt-3">
      {[100,72,91,52,84,38].map((w,i) => (
        <div key={i} className="h-1 rounded-full" style={{
          width:`${w}%`,
          background: i%3===0?"oklch(0.7 0.18 295/0.5)":i%3===1?"oklch(0.85 0.25 145/0.35)":"oklch(0.42 0.04 285/0.3)",
        }} />
      ))}
    </div>
  );
}

function MiniRiskBars() {
  return (
    <div className="mt-auto flex items-end gap-0.5 pt-3" style={{height:36}}>
      {[40,65,45,80,55,90,70,50,85,60].map((h,i) => (
        <div key={i} className="flex-1 rounded-sm" style={{
          height:`${h*0.36}px`,
          background: h>75?"oklch(0.65 0.22 25/0.7)":h>55?"oklch(0.7 0.18 295/0.5)":"oklch(0.42 0.04 285/0.3)",
        }} />
      ))}
    </div>
  );
}

function MiniNetworkSVG() {
  const nodes:[[number,number,number],...[number,number,number][]] = [[50,50,4],[14,20,2.5],[86,20,2.5],[14,80,2.5],[86,80,2.5]];
  return (
    <svg className="mt-auto w-full" height="52" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {nodes.slice(1).map(([cx,cy],i)=>(
        <line key={i} x1={50} y1={50} x2={cx} y2={cy} stroke="oklch(0.7 0.18 295/0.35)" strokeWidth="1"/>
      ))}
      {nodes.map(([cx,cy,r],i)=>(
        <circle key={i} cx={cx} cy={cy} r={r} fill="oklch(0.7 0.18 295)" opacity={i===0?1:0.6}/>
      ))}
    </svg>
  );
}

function MiniLabel({n,t}:{n:string;t:string}) {
  return <p className="mb-1.5 font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">{n}·{t}</p>;
}

function BentoMini() {
  /*
   * Fixed pixel heights scaled from Figma (1200×900) to fit ~560px total:
   * Scale factor: 560 / (396+28+412) ≈ 0.666
   *
   * Row 1 (top): 396 * 0.666 ≈ 264px
   * Row 2 (bot): 412 * 0.666 ≈ 274px
   * Gap: 28 * 0.666 ≈ 18px (use 18px)
   *
   * Col 1 cards: A=264px, E=183px, F=73px  (219+165=384 * 0.666 ≈ 274, gap included)
   *   Actually E=182px, F=74px, gap=18px  → 182+18+74=274 ✓
   * Col 3 cards: C=104px, D=140px, H=274px → 104+18+140+18+274 = wait, only 2 gaps
   *   C=104, gap=18, D=122, gap=18, H=286 → 104+18+122+18=262... adjust
   *   Let's keep it simple: C=96, D=130, H=274 with gap=18 → 96+18+130+18+274=536 close enough
   *
   * Total height: 264 + 18 + 274 = 556 ≈ 560
   */

  const GAP      = 20;
  const ROW1     = 340;
  const ROW2     = 340;
  const TOTAL    = ROW1 + GAP + ROW2;

  /* Col 1 sub-heights */
  const A_H      = ROW1;
  const E_H      = 208;
  const F_H      = ROW2 - E_H - GAP;

  /* Col 3 sub-heights */
  const C_H      = 113;
  const D_H      = 154;
  const H_H      = ROW1 + ROW2 + GAP - C_H - D_H - GAP * 2;

  /* Circle size */
  const CIR      = 100;

  const mc = MINI_CARD;
  return (
    <div className="relative w-full" style={{ height: TOTAL }}>

      {/* ── Circle overlay at row gap centre, col2 horizontal midpoint ── */}
      <div className="pointer-events-none absolute z-20" style={{
        width: CIR, height: CIR, borderRadius: "50%",
        /* left: col1(~23.7%) + gap + col2_half(~23.7%) — 44px (half circle) */
        left: `calc(23.7% + ${GAP}px + 23.7% - ${CIR / 2}px)`,
        top: ROW1 - CIR / 2,
        background: MINI_BG,
        border: `3px solid ${MINI_BG}`,
        boxShadow: `0 0 0 2.5px #1d1d3b, 0 0 0 5px oklch(0.7 0.18 295/0.2)`,
      }} />

      {/* ── 3-column grid ── */}
      <div className="grid h-full" style={{ gridTemplateColumns: "1fr 2.12fr 1fr", gap: GAP, alignItems: "start" }}>

        {/* Col 1: A → E → F */}
        <div className="flex flex-col" style={{ gap: GAP }}>
          {/* A */}
          <div className="group flex flex-col" style={{ ...mc, height: A_H }}>
            <MiniAccent />
            <div className="p-3 pb-0 shrink-0">
              <MiniLabel n="01" t="Infra" />
              <p className="font-heading text-[0.7rem] font-semibold leading-snug text-foreground">Security Infrastructure</p>
            </div>
            <div className="mx-2 mb-2 mt-3 flex-1 overflow-hidden rounded-lg"
              style={{ border: "1px solid oklch(0.28 0.05 285/0.25)", background: "oklch(0.1 0.03 285/0.5)" }}>
              <div className="flex h-full flex-col justify-end gap-1 p-2">
                {[100,72,91,52,84,38].map((w,i)=>(
                  <div key={i} className="h-1 rounded-full" style={{ width:`${w}%`, background: i%3===0?"oklch(0.7 0.18 295/0.5)":i%3===1?"oklch(0.85 0.25 145/0.35)":"oklch(0.42 0.04 285/0.3)" }} />
                ))}
              </div>
            </div>
          </div>
          {/* E */}
          <div className="group flex flex-col p-3" style={{ ...mc, height: E_H }}>
            <MiniAccent />
            <MiniLabel n="05" t="Agents" />
            <p className="font-heading text-[0.7rem] font-semibold leading-snug text-foreground">AI Agents</p>
            <MiniNetworkSVG />
          </div>
          {/* F */}
          <div className="group flex flex-col p-3" style={{ ...mc, height: F_H }}>
            <MiniAccent />
            <MiniLabel n="06" t="Scan" />
            <p className="font-heading text-[0.7rem] font-semibold leading-snug text-foreground">12 Tools</p>
          </div>
        </div>

        {/* Col 2: B → G */}
        <div className="flex flex-col" style={{ gap: GAP }}>
          {/* B */}
          <div className="group flex flex-col" style={{ ...mc, height: ROW1 }}>
            <MiniAccent />
            <div className="p-3 pb-0 shrink-0">
              <MiniLabel n="02" t="AI Engine" />
              <p className="font-heading text-[0.7rem] font-semibold leading-snug text-foreground">AI-Driven Analysis</p>
              <p className="font-body mt-1 text-[9px] leading-relaxed text-muted-foreground/60">Cross-references results and surfaces narratives.</p>
            </div>
            <div className="mx-2 mb-2 mt-3 flex-1 overflow-hidden rounded-lg"
              style={{ border: "1px solid oklch(0.28 0.05 285/0.25)", background: "oklch(0.1 0.03 285/0.5)" }}>
              <div className="flex h-full flex-col gap-1 p-2">
                {[["DISCOVER","oklch(0.7 0.18 295/0.7)"],["PROBE","oklch(0.7 0.18 295/0.5)"],["ASSESS","oklch(0.7 0.18 295/0.35)"],["REPORT","oklch(0.7 0.18 295/0.22)"]].map(([label,color])=>(
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="h-1 w-1 rounded-full shrink-0" style={{background:color}}/>
                    <span className="font-mono text-[7px] uppercase tracking-widest" style={{color}}>{label}</span>
                    <div className="ml-auto h-px rounded-full" style={{background:color,width:36,opacity:0.4}}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* G */}
          <div className="group flex flex-col p-3" style={{ ...mc, height: ROW2 }}>
            <MiniAccent />
            <div className="pt-7">
              <MiniLabel n="07" t="Speed" />
              <p className="font-heading text-[0.7rem] font-semibold leading-snug text-foreground">High-Speed Intel</p>
            </div>
            <MiniRiskBars />
            <div className="pb-1" />
          </div>
        </div>

        {/* Col 3: C → D → H */}
        <div className="flex flex-col" style={{ gap: GAP }}>
          {/* C */}
          <div className="group flex flex-col p-3" style={{ ...mc, height: C_H }}>
            <MiniAccent />
            <MiniLabel n="03" t="CVE" />
            <p className="font-heading text-[0.7rem] font-semibold leading-snug text-foreground">CVE Correlation</p>
            <div className="mt-auto flex gap-1 pt-1">
              {["T1190","CVE"].map(t=>(
                <span key={t} className="rounded border border-primary/20 bg-primary/5 px-1 py-0.5 font-mono text-[7px] text-primary/50">{t}</span>
              ))}
            </div>
          </div>
          {/* D */}
          <div className="group flex flex-col p-3" style={{ ...mc, height: D_H }}>
            <MiniAccent />
            <MiniLabel n="04" t="Report" />
            <p className="font-heading text-[0.7rem] font-semibold leading-snug text-foreground">Executive Report</p>
            <MiniRiskBars />
          </div>
          {/* H */}
          <div className="group flex flex-col" style={{ ...mc, height: H_H }}>
            <MiniAccent />
            <div className="p-3 pb-0 pt-7 shrink-0">
              <MiniLabel n="08" t="Dev" />
              <p className="font-heading text-[0.7rem] font-semibold leading-snug text-foreground">Built for Devs</p>
            </div>
            <div className="mx-2 mb-2 mt-2 flex-1 overflow-hidden rounded-lg"
              style={{ border: "1px solid oklch(0.28 0.05 285/0.25)", background: "oklch(0.1 0.03 285/0.5)" }}>
              <div className="flex h-full flex-col justify-end gap-1 p-2">
                {["npm run scan","curl /api","./scan.sh"].map(cmd=>(
                  <div key={cmd} className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[7px] text-muted-foreground/50">{cmd}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * Scroll behaviour:
 *  1. Section enters viewport → pins itself (stays fixed on screen)
 *  2. Scroll drives a GSAP timeline:
 *       progress 0.00–0.33  →  01 Developers  (enters)
 *       progress 0.33–0.66  →  02 Founders    (crossfade)
 *       progress 0.66–1.00  →  03 Pentesters  (crossfade)
 *  3. After progress reaches 1.0 the pin releases and normal scroll resumes.
 *  Scroll upward → timeline reverses, personas revert in order.
 *  Click on a persona button → instantly jumps to that state (manual override).
 */
export function UseCasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set([leftRef.current, rightRef.current], { opacity: 0 });
      gsap.set(leftRef.current,  { x: -28 });
      gsap.set(rightRef.current, { x: 28 });
      const st = { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none none" };
      gsap.to(leftRef.current,  { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", scrollTrigger: st });
      gsap.to(rightRef.current, { opacity: 1, x: 0, duration: 0.85, ease: "power2.out", delay: 0.1, scrollTrigger: st });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-6 py-20 lg:py-28"
      style={{ borderTop: "1px solid oklch(0.28 0.05 285 / 0.7)" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 0%, oklch(0.4 0.2 295 / 0.06), transparent 70%)" }} />

      <div className="relative mx-auto max-w-[1280px]">

        {/* ── Heading ── */}
        <div ref={leftRef} className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-block h-px w-5 bg-primary/60" />
            Use Cases
          </div>
          <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-[48px] whitespace-nowrap">
            Security intelligence{" "}
            <span style={{
              background: "linear-gradient(135deg, oklch(0.7 0.18 295), oklch(0.78 0.2 310), oklch(0.9 0.05 285))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              for every workflow.
            </span>
          </h2>
          <p className="font-body mt-4 max-w-[480px] text-[14px] leading-relaxed text-muted-foreground">
            Whether you're shipping code, running a company, or doing recon —
            CyberSec Toolkit adapts to your workflow and delivers the answers you need.
          </p>
        </div>

        {/* ── Full-width bento grid ── */}
        <div ref={rightRef}>
          <BentoFeatures embedded />
        </div>

      </div>
    </section>
  );
}
