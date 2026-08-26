/**
 * PricingTeaser
 *
 * Asymmetric two-card layout:
 *   Left  (62%) — dominant FREE card with faint scan-grid background
 *   Right (38%) — restrained TEAM / ENTERPRISE card
 *
 * Colors: 100% existing CyberSec design tokens. No new values.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Network, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Faint scan-grid SVG (inline, no external asset) ───────────────────── */

function ScanGrid() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="pg-scan-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="oklch(0.7 0.18 295 / 0.07)"
            strokeWidth="0.6"
          />
        </pattern>
        {/* radial fade mask so grid fades to edges */}
        <radialGradient id="pg-mask" cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="pg-grid-mask">
          <rect width="100%" height="100%" fill="url(#pg-mask)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#pg-scan-grid)"
        mask="url(#pg-grid-mask)"
      />
      {/* Horizontal scan line — purely decorative, no animation */}
      <line
        x1="10%" y1="38%" x2="90%" y2="38%"
        stroke="oklch(0.7 0.18 295 / 0.12)"
        strokeWidth="0.8"
        strokeDasharray="4 8"
      />
      <line
        x1="10%" y1="62%" x2="90%" y2="62%"
        stroke="oklch(0.7 0.18 295 / 0.07)"
        strokeWidth="0.6"
        strokeDasharray="4 12"
      />
    </svg>
  );
}

/* ─── Team network SVG ───────────────────────────────────────────────────── */

function TeamNetwork() {
  return (
    <svg
      className="pointer-events-none absolute bottom-5 right-5 opacity-[0.12]"
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Connection lines */}
      <line x1="60" y1="40" x2="20" y2="20"  stroke="oklch(0.7 0.18 295)" strokeWidth="0.8" />
      <line x1="60" y1="40" x2="100" y2="20" stroke="oklch(0.7 0.18 295)" strokeWidth="0.8" />
      <line x1="60" y1="40" x2="20" y2="60"  stroke="oklch(0.7 0.18 295)" strokeWidth="0.8" />
      <line x1="60" y1="40" x2="100" y2="60" stroke="oklch(0.7 0.18 295)" strokeWidth="0.8" />
      <line x1="20" y1="20" x2="100" y2="20" stroke="oklch(0.7 0.18 295)" strokeWidth="0.5" strokeDasharray="3 5" />
      <line x1="20" y1="60" x2="100" y2="60" stroke="oklch(0.7 0.18 295)" strokeWidth="0.5" strokeDasharray="3 5" />
      {/* Nodes */}
      {[
        [60, 40], [20, 20], [100, 20], [20, 60], [100, 60],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={i === 0 ? 5 : 3.5}
          fill="oklch(0.7 0.18 295)"
        />
      ))}
    </svg>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function PricingTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const freeRef    = useRef<HTMLDivElement>(null);
  const teamRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set([headRef.current, freeRef.current, teamRef.current], { opacity: 0, y: 28 });

      const st = { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" };

      gsap.to(headRef.current,  { opacity: 1, y: 0, duration: 0.7,  ease: "power2.out", scrollTrigger: st });
      gsap.to(freeRef.current,  { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: 0.12, scrollTrigger: st });
      gsap.to(teamRef.current,  { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: 0.24, scrollTrigger: st });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-6 py-[100px]"
      style={{ borderTop: "1px solid oklch(0.28 0.05 285 / 0.7)" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 40% 50%, oklch(0.4 0.2 295 / 0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px]">

        {/* ── Heading ── */}
        <div ref={headRef} className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#aaaaaa]">
            <span className="inline-block h-px w-5 bg-primary/60" />
            Pricing
          </div>
          <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-[48px]">
            Start with{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.7 0.18 295), oklch(0.78 0.2 310), oklch(0.9 0.05 285))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              the answer.
            </span>
          </h2>
          <p className="font-body mt-4 max-w-[480px] text-[14px] leading-relaxed text-muted-foreground">
            Run the security checks you need without adding another complicated
            workflow. Start free, then scale when your team needs more.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[62fr_38fr]">

          {/* ─ FREE card ─────────────────────────────────────────────────── */}
          <div
            ref={freeRef}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 transition-colors duration-300 hover:border-primary/40 md:p-10"
            style={{
              boxShadow: "0 0 0 1px oklch(0.28 0.05 285 / 0.35)",
            }}
          >
            {/* Hover ambient */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.7 0.18 295 / 0.04), transparent 70%)",
              }}
            />

            {/* Faint scan grid */}
            <ScanGrid />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col gap-6">

              {/* Label row */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10"
                  style={{ boxShadow: "0 0 14px oklch(0.7 0.18 295 / 0.15)" }}
                >
                  <Network className="h-4 w-4 text-primary" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/80">
                  Start Free
                </span>
              </div>

              {/* Main copy */}
              <div>
                <h3 className="font-heading text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold leading-tight text-foreground">
                  Run your first scan free.
                  <br />
                  <span className="text-muted-foreground">No card required.</span>
                </h3>
                <p className="font-body mt-4 max-w-[380px] text-[14px] leading-relaxed text-muted-foreground">
                  Get started with CyberSec Toolkit and see your security
                  posture in minutes — no setup, no complexity.
                </p>
              </div>

              {/* Subtle status chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Port Scanner",
                  "Subdomain Enum",
                  "SSL Check",
                  "WHOIS",
                  "GeoIP",
                  "AI Report",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/50 bg-black/30 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-2">
                <a
                  href="https://cybersec1.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-primary/50 bg-primary/10 px-7 py-3.5 font-body text-[14px] font-medium text-primary transition-all duration-200 hover:border-primary hover:bg-primary/15 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Run your first scan
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* ─ TEAM card ─────────────────────────────────────────────────── */}
          <div
            ref={teamRef}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-[#0d0618]/80 p-7 transition-colors duration-300 hover:border-border/80 md:p-8"
            style={{
              boxShadow: "0 0 0 1px oklch(0.22 0.04 285 / 0.5)",
            }}
          >
            {/* Hover ambient — subtler than free card */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.7 0.18 295 / 0.025), transparent 70%)",
              }}
            />

            {/* Top accent line on hover */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.7 0.18 295 / 0.35), transparent)",
              }}
            />

            {/* Team network decoration */}
            <TeamNetwork />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col gap-5">

              {/* Label row */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-black/40">
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                  For Teams
                </span>
              </div>

              {/* Main copy */}
              <div>
                <h3 className="font-heading text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold leading-tight text-foreground">
                  Need team access?
                  <br />
                  <span className="text-muted-foreground">Talk to us.</span>
                </h3>
                <p className="font-body mt-4 text-[13px] leading-relaxed text-muted-foreground">
                  Shared access, collaboration, and security workflows built
                  for teams that need more visibility.
                </p>
              </div>

              {/* Feature hints — kept minimal, no checkmark list */}
              <div className="space-y-1.5">
                {[
                  "Shared scan workspace",
                  "Team-level reporting",
                  "Priority support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span
                      className="h-px w-4 shrink-0 rounded-full"
                      style={{ background: "oklch(0.7 0.18 295 / 0.4)" }}
                    />
                    <span className="font-body text-[12px] text-muted-foreground/70">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-2">
                <a
                  href="mailto:hello@cybersec1.tech"
                  className="inline-flex items-center gap-2 font-body text-[14px] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Talk to us
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
