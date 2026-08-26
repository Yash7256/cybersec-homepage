/**
 * WorkflowSection — true left-content / right-product composition
 *
 * Left  (42%) — headline + copy + workflow label, vertically centred
 * Right (58%) — layered product UI (background dashboard + foreground report)
 *               both panels sit inside the right column, never below the text
 *
 * Colors: 100% existing CyberSec design tokens only.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  Globe,
  Lock,
  Network,
  RefreshCw,
  Search,
  Server,
  Share2,
  ShieldAlert,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Background workflow dashboard ─────────────────────────────────────── */

const BG_COLS = [
  {
    phase: "DISCOVER",
    accent: "oklch(0.7 0.18 295 / 0.7)",
    tools: [
      { name: "GeoIP",      val: "US-VA / AS15169"    },
      { name: "WHOIS",      val: "ICANN registrar"    },
      { name: "Subdomains", val: "4 found"            },
      { name: "DNS Lookup", val: "A · MX · TXT · NS"  },
    ],
  },
  {
    phase: "PROBE",
    accent: "oklch(0.7 0.18 295 / 0.55)",
    tools: [
      { name: "Port Scan",   val: "22 · 80 · 443"    },
      { name: "Ping",        val: "RTT 12 ms"         },
      { name: "Traceroute",  val: "9 hops"            },
      { name: "HTTP Headers",val: "Missing HSTS"      },
      { name: "SSL Check",   val: "TLS 1.0 active"   },
    ],
  },
  {
    phase: "ASSESS",
    accent: "oklch(0.7 0.18 295 / 0.4)",
    tools: [
      { name: "Web App Scan", val: "7 findings"       },
      { name: "Vuln Scan",    val: "2 critical"       },
      { name: "CVE Mapping",  val: "CVE-2024-3819"    },
      { name: "MITRE ATT&CK", val: "T1190 · T1068"   },
    ],
  },
  {
    phase: "UNDERSTAND",
    accent: "oklch(0.7 0.18 295 / 0.28)",
    tools: [
      { name: "AI Report",    val: "Generated"        },
      { name: "Risk Ranking", val: "Elevated / 74"    },
      { name: "Actions",      val: "4 priority items" },
      { name: "PDF Export",   val: "Ready"            },
    ],
  },
] as const;

function BackgroundDashboard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-[#1A0D2E]/85">
      {/* Top chrome bar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-border/35 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_35/0.45)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.25_145/0.45)]" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/55">
          cybersec-toolkit · unified scan · example.com
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.85_0.25_145)]" />
          <span className="font-mono text-[9px] text-[oklch(0.85_0.25_145/0.8)]">RUNNING</span>
        </div>
      </div>

      {/* Pipeline breadcrumb */}
      <div className="flex shrink-0 items-center gap-1 border-b border-border/25 px-4 py-2">
        {(["TARGET","→","DISCOVER","→","PROBE","→","ASSESS","→","UNDERSTAND"] as const).map((s, i) => (
          <span key={i} className="font-mono text-[9px] uppercase tracking-widest"
            style={{
              color: s === "→"         ? "oklch(0.3 0.04 285)"
                   : s === "TARGET"    ? "oklch(0.6 0.03 285)"
                   :                    "oklch(0.7 0.18 295 / 0.75)",
              marginRight: 4,
            }}>
            {s}
          </span>
        ))}
      </div>

      {/* Tool columns */}
      <div className="grid min-h-0 flex-1 grid-cols-4 divide-x divide-border/20 overflow-hidden">
        {BG_COLS.map((col) => (
          <div key={col.phase} className="flex flex-col gap-2 overflow-hidden p-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: col.accent }}>
              {col.phase}
            </div>
            <div className="space-y-1.5">
              {col.tools.map((t) => (
                <div key={t.name}
                  className="rounded-lg border border-border/30 bg-black/35 px-2.5 py-2">
                  <div className="font-mono text-[8.5px] text-muted-foreground/55">{t.name}</div>
                  <div className="mt-0.5 font-mono text-[8.5px] text-foreground/45 truncate">{t.val}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right-edge fade — makes the right side recede */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] rounded-r-2xl"
        style={{ background: "linear-gradient(to left, oklch(0.07 0.02 285 / 0.95) 0%, transparent 100%)" }} />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] rounded-b-2xl"
        style={{ background: "linear-gradient(to top, oklch(0.07 0.02 285 / 0.9), transparent)" }} />
    </div>
  );
}

/* ─── Foreground Executive Report panel ─────────────────────────────────── */

function ExecReportPanel() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-[#0d0618]/98"
      style={{
        boxShadow:
          "0 0 0 1px oklch(0.28 0.05 285 / 0.5)," +
          "0 32px 80px -12px oklch(0.05 0.03 285 / 0.85)," +
          "0 -4px 28px oklch(0.7 0.18 295 / 0.07)",
      }}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border/40 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="h-3.5 w-3.5 text-primary/70" />
          <span className="font-mono text-[11px] font-medium tracking-wider text-foreground/90">
            Executive Report
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-[oklch(0.85_0.25_145/0.3)] bg-[oklch(0.85_0.25_145/0.08)] px-2.5 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.25_145)]" />
          <span className="font-mono text-[9px] text-[oklch(0.85_0.25_145)]">Scan complete</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">

        {/* Risk score */}
        <div className="flex items-center gap-4 rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3.5">
          <div className="shrink-0 text-center">
            <div className="font-heading text-4xl font-bold leading-none text-foreground">74</div>
            <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-muted-foreground">Risk</div>
          </div>
          <div className="flex-1">
            <div className="mb-1.5 font-mono text-[10px] font-semibold text-[oklch(0.8_0.18_35)]">ELEVATED</div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/20">
              <div className="h-full w-[74%] rounded-full"
                style={{ background: "linear-gradient(90deg, oklch(0.65 0.22 25), oklch(0.7 0.18 295))" }} />
            </div>
          </div>
        </div>

        {/* AI summary */}
        <div>
          <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Security Overview
          </div>
          <p className="font-body text-[12px] leading-relaxed text-foreground/70">
            We identified <span className="font-medium text-foreground/90">7 findings</span> across
            exposed services, SSL config, and known vulnerabilities.{" "}
            <span className="font-medium text-destructive">Two issues</span> require immediate
            remediation before next deployment.
          </p>
        </div>

        {/* Findings */}
        <div>
          <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Findings</div>
          <div className="space-y-1.5">
            {[
              { sev: "critical", text: "Exposed administrative service",   cve: "CVE-2024-3819" },
              { sev: "high",     text: "Vulnerable dependency",             cve: "CVE-2023-4892" },
              { sev: "medium",   text: "Weak SSL/TLS configuration",        cve: null            },
              { sev: "medium",   text: "Missing HTTP security headers",     cve: null            },
            ].map((f) => (
              <div key={f.text}
                className="flex items-center gap-2.5 rounded-lg border border-border/35 bg-black/40 px-3 py-2">
                <span className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wide ${
                  f.sev === "critical" ? "bg-destructive/20 text-destructive"
                  : f.sev === "high"   ? "bg-[oklch(0.65_0.22_25/0.15)] text-[oklch(0.8_0.18_35)]"
                  :                     "bg-primary/10 text-primary/80"
                }`}>{f.sev}</span>
                <span className="min-w-0 flex-1 truncate font-body text-[11px] text-foreground/80">{f.text}</span>
                {f.cve && <span className="shrink-0 font-mono text-[9px] text-primary/45">{f.cve}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Priority actions */}
        <div>
          <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Priority Actions</div>
          <div className="space-y-1.5">
            {[
              { n: "01", text: "Restrict exposed service — auth + IP allowlist", urgent: true  },
              { n: "02", text: "Patch vulnerable component to latest release",    urgent: true  },
              { n: "03", text: "Disable TLS 1.0, enforce TLS 1.2+",              urgent: false },
            ].map((a) => (
              <div key={a.n}
                className="flex items-center gap-2.5 rounded-lg border border-border/30 bg-black/35 px-3 py-2">
                <span className={`shrink-0 font-mono text-[10px] font-bold ${a.urgent ? "text-destructive" : "text-primary/55"}`}>
                  {a.n}
                </span>
                <span className="font-body text-[11px] text-foreground/75">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action bar — composer inspired */}
      <div className="shrink-0 border-t border-border/40 px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl border border-border/35 bg-black/50 px-3 py-2.5">
          <span className="flex-1 font-body text-[12px] text-muted-foreground/40 select-none">
            Ask about this report…
          </span>
          <div className="flex items-center gap-2">
            {[
              { Icon: Copy,      label: "Copy"       },
              { Icon: Download,  label: "Export"     },
              { Icon: Share2,    label: "Share"      },
              { Icon: RefreshCw, label: "Regenerate" },
            ].map(({ Icon, label }) => (
              <button key={label} aria-label={label}
                className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground/35 transition-colors hover:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
                <Icon className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) return;

    const ctx = gsap.context(() => {
      // set initial states before paint
      gsap.set(leftRef.current,    { opacity: 0, x: -28 });
      gsap.set(rightRef.current,   { opacity: 0, x: 32  });
      gsap.set(closingRef.current, { opacity: 0, y: 12  });

      const trigger  = sectionRef.current;
      const start    = "top 88%";
      const actions  = "play none none none" as const;

      gsap.to(leftRef.current,  {
        opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger, start, toggleActions: actions },
      });
      gsap.to(rightRef.current, {
        opacity: 1, x: 0, duration: 0.85, ease: "power2.out", delay: 0.12,
        scrollTrigger: { trigger, start, toggleActions: actions },
      });
      gsap.to(closingRef.current, {
        opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
        scrollTrigger: { trigger: closingRef.current, start: "top 95%", toggleActions: actions },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-6 py-20 lg:py-28"
      style={{ borderTop: "1px solid oklch(0.28 0.05 285 / 0.7)" }}
    >
      {/* Subtle ambient */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 60% at 20% 50%, oklch(0.4 0.2 295 / 0.055), transparent 70%)" }} />

      <div className="relative mx-auto max-w-[1280px]">

        {/* ─ TWO-COLUMN SPLIT ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-10">

          {/* LEFT — 42% */}
          <div
            ref={leftRef}
            className="flex flex-col gap-7 lg:w-[42%] lg:shrink-0"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#aaaaaa]">
              <span className="inline-block h-px w-5 bg-primary/60" />
              Security Intelligence
            </div>

            {/* Headline */}
            <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-[48px]">
              12 tools.{" "}
              <span style={{
                background: "linear-gradient(135deg, oklch(0.7 0.18 295), oklch(0.78 0.2 310), oklch(0.9 0.05 285))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                One answer:
              </span>
              <br />
              are you exposed?
            </h2>

            {/* Copy */}
            <div className="flex flex-col gap-3">
              <p className="font-body text-[14px] leading-relaxed text-muted-foreground max-w-[400px]">
                Port scans tell you what's open. WHOIS tells you who owns it.
                SSL checks tell you what's misconfigured. On their own, none of
                that tells you what to do next.
              </p>
              <p className="font-body text-[14px] leading-relaxed text-muted-foreground max-w-[400px]">
                CyberSec Toolkit runs all of it, then hands you a plain-English{" "}
                <span className="text-foreground/85">Executive Report</span> that
                ranks what actually matters — so your team spends time{" "}
                <span className="text-foreground/85">fixing issues</span>, not
                interpreting logs.
              </p>
            </div>

            {/* Workflow label */}
            <div className="flex items-center gap-2">
              <span className="inline-block h-px w-4 bg-primary/50" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55">
                01. Discovery → Assessment → Action
              </span>
            </div>
          </div>

          {/* RIGHT — 58%, relative container for layered panels */}
          <div
            ref={rightRef}
            className="relative min-h-[520px] flex-1 lg:min-h-[580px]"
          >
            {/* ── Background dashboard — full right column ── */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <BackgroundDashboard />
            </div>

            {/* ── Foreground Executive Report — left-anchored float ── */}
            {/*
              Position: top-aligned, left 0, width ~52% of the right column.
              This creates the depth: report in front, dashboard visible behind/right.
            */}
            <div
              className="relative z-10 h-full"
              style={{ width: "min(380px, 96%)" }}
            >
              <ExecReportPanel />
            </div>
          </div>

        </div>

        {/* ── Closing line ─────────────────────────────────────────────── */}
        <div className="mt-16 border-t border-border/30 pt-8 text-center">
          <p ref={closingRef} className="font-body text-[14px] text-muted-foreground">
            Everything above runs in{" "}
            <span className="font-medium text-foreground/90">one scan</span>.
            The report is what you{" "}
            <span className="font-medium text-foreground/90">actually read</span>.
          </p>
        </div>

      </div>
    </section>
  );
}
