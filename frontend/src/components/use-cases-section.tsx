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

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  AlertTriangle,
  CheckCircle2,
  Crosshair,
  FileText,
  Globe,
  Lock,
  Network,
  Search,
  Server,
  ShieldAlert,
  TrendingUp,
  Zap,
  ArrowRight,
} from "lucide-react";

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
  const [active, setActive] = useState<PersonaId>("developers");
  const activeRef  = useRef<PersonaId>("developers");
  const outerRef   = useRef<HTMLDivElement>(null);   // scroll-height spacer
  const stickyRef  = useRef<HTMLDivElement>(null);   // pinned visual frame
  const panelRefs  = useRef<Partial<Record<PersonaId, HTMLDivElement | null>>>({});
  const dotRefs    = useRef<(HTMLSpanElement | null)[]>([null, null, null]);
  const bodyRefs   = useRef<(HTMLParagraphElement | null)[]>([null, null, null]);

  /* helper — crossfade panels without touching scroll position */
  const crossfadeTo = (id: PersonaId, instant = false) => {
    if (activeRef.current === id) return;
    const dur = instant ? 0 : 0.28;
    const delay = instant ? 0 : 0.15;

    const outEl = panelRefs.current[activeRef.current];
    const inEl  = panelRefs.current[id];
    if (outEl) gsap.to(outEl,   { opacity: 0, y: -14, filter: "blur(6px)", duration: dur, ease: "power2.in",  overwrite: true });
    if (inEl)  gsap.fromTo(inEl, { opacity: 0, y: 16, filter: "blur(6px)" },
                                  { opacity: 1, y: 0,  filter: "blur(0px)", duration: dur + 0.08, ease: "power2.out", delay, overwrite: true });

    // nav dots
    const ids: PersonaId[] = ["developers", "founders", "pentesters"];
    ids.forEach((pid, i) => {
      const dot = dotRefs.current[i];
      if (!dot) return;
      gsap.to(dot, { scaleX: pid === id ? 1 : 0, opacity: pid === id ? 1 : 0.3, duration: 0.2 });
    });

    // body text
    const idx  = ids.indexOf(id);
    const prev = ids.indexOf(activeRef.current);
    if (bodyRefs.current[prev]) gsap.to(bodyRefs.current[prev]!, { opacity: 0, duration: dur });
    if (bodyRefs.current[idx])  gsap.to(bodyRefs.current[idx]!,  { opacity: 1, duration: dur, delay });

    activeRef.current = id;
    setActive(id);
  };

  useLayoutEffect(() => {
    const ids: PersonaId[] = ["developers", "founders", "pentesters"];

    /* ── initial states ───────────────────────────────────────────────── */
    ids.forEach((id, i) => {
      const el = panelRefs.current[id];
      if (el) gsap.set(el, id === "developers"
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, y: 16, filter: "blur(6px)" });

      const dot = dotRefs.current[i];
      if (dot) gsap.set(dot, { scaleX: id === "developers" ? 1 : 0, opacity: id === "developers" ? 1 : 0.3 });

      const body = bodyRefs.current[i];
      if (body) gsap.set(body, { opacity: id === "developers" ? 1 : 0 });
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /*
       * outerRef has height = 300vh (one viewport per persona).
       * stickyRef is the actual visible frame — GSAP pins it.
       * scrub: true makes scroll directly drive the timeline.
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: stickyRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const next: PersonaId = p < 0.38 ? "developers" : p < 0.72 ? "founders" : "pentesters";
            if (next !== activeRef.current) crossfadeTo(next);
          },
        },
      });

      // Add duration anchors so the timeline has length to scrub through
      tl.to({}, { duration: 1 }); // developers dwell
      tl.to({}, { duration: 1 }); // founders  dwell
      tl.to({}, { duration: 1 }); // pentesters dwell
    }, outerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    /* outerRef: 300 vh — creates the scroll distance for 3 personas */
    <div ref={outerRef} style={{ height: "300vh" }}>
      {/* stickyRef: the visible pinned frame — GSAP pins this to the top */}
      <div
        ref={stickyRef}
        className="relative bg-background"
        style={{
          height: "100vh",
          borderTop: "1px solid oklch(0.28 0.05 285 / 0.7)",
          borderBottom: "1px solid oklch(0.28 0.05 285 / 0.7)",
          willChange: "transform",
        }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
          style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%, oklch(0.4 0.2 295 / 0.06), transparent 70%)" }}
        />

        <div className="relative mx-auto grid h-full max-w-[1440px] grid-cols-1 md:grid-cols-[1fr_1.15fr]">

          {/* ─── LEFT ───────────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center gap-10 px-10 py-14 lg:px-16">

            <div>
              <h2 className="font-heading text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-tight text-foreground">
                Security intelligence
                <br />
                <span style={{
                  background: "linear-gradient(135deg, oklch(0.7 0.18 295), oklch(0.78 0.2 310), oklch(0.9 0.05 285))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  for every workflow.
                </span>
              </h2>

              {/* Body paragraphs — stacked, opacity driven by GSAP */}
              <div className="relative mt-5 h-[80px]">
                {personas.map((p, i) => (
                  <p
                    key={p.id}
                    ref={(el) => { bodyRefs.current[i] = el; }}
                    className="absolute inset-x-0 top-0 max-w-[380px] font-body text-[14px] leading-relaxed text-muted-foreground"
                    aria-hidden={active !== p.id}
                  >
                    {p.body}
                  </p>
                ))}
              </div>
            </div>

            {/* Persona nav */}
            <nav className="flex flex-col gap-1" aria-label="Use-case personas">
              {personas.map((p, i) => {
                const isActive = active === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => crossfadeTo(p.id)}
                    aria-current={isActive ? "step" : undefined}
                    className="group flex items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors duration-200 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {/* animated progress bar dot */}
                    <span className="relative h-px w-8 shrink-0 overflow-hidden rounded-full bg-border/40">
                      <span
                        ref={(el) => { dotRefs.current[i] = el; }}
                        className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-primary"
                      />
                    </span>
                    <span className="font-mono text-[11px] tracking-widest transition-colors duration-200"
                      style={{ color: isActive ? "oklch(0.7 0.18 295)" : "oklch(0.42 0.04 285)" }}>
                      {p.num}
                    </span>
                    <span className="font-body text-[13px] transition-colors duration-200"
                      style={{ color: isActive ? "oklch(0.98 0.005 285)" : "oklch(0.58 0.03 285)" }}>
                      {p.label}
                    </span>
                    <ArrowRight
                      className="ml-auto h-3.5 w-3.5 shrink-0 text-primary transition-opacity duration-200"
                      style={{ opacity: isActive ? 1 : 0 }}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ─── RIGHT: card that never moves ───────────────────────────── */}
          <div
            className="flex items-center py-10 pl-0 pr-0 md:py-12"
            style={{ borderLeft: "1px solid oklch(0.28 0.05 285 / 0.45)" }}
          >
            <div
              className="relative mx-6 flex-1 overflow-hidden rounded-2xl border border-border/55 bg-[#0d0618]/95 md:mx-8"
              style={{
                height: "calc(100vh - 96px)",
                boxShadow: "0 0 0 1px oklch(0.28 0.05 285 / 0.4), 0 24px 80px -12px oklch(0.1 0.04 285 / 0.7), 0 -6px 40px oklch(0.7 0.18 295 / 0.06)",
              }}
            >
              {/* Top glow line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent 10%, oklch(0.7 0.18 295 / 0.4) 50%, transparent 90%)" }} />

              {/* Dashboard layers */}
              {(["developers", "founders", "pentesters"] as PersonaId[]).map((id) => {
                const Dashboard = dashboards[id];
                return (
                  <div
                    key={id}
                    ref={(el) => { panelRefs.current[id] = el; }}
                    className="absolute inset-0 p-7 md:p-8"
                    style={{ pointerEvents: id === active ? "auto" : "none" }}
                    aria-hidden={id !== active}
                  >
                    <Dashboard />
                  </div>
                );
              })}

              {/* Bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-2xl"
                style={{ background: "linear-gradient(to top, oklch(0.08 0.03 285 / 0.95), transparent)" }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
