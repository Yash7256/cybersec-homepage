/**
 * FounderNote
 *
 * Editorial two-column layout:
 *   Left  (65–70%) — personal founder statement, paragraph rhythm
 *   Right (30–35%) — compact identity / signature card
 *
 * Tone: human, honest, concise. One technical product inside a dark UI.
 * Colors: 100% existing CyberSec design tokens. Nothing new.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Abstract identity mark ─────────────────────────────────────────────── */
/* Fingerprint-inspired concentric arc pattern — purely decorative SVG */

function IdentityMark() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="opacity-40"
    >
      {/* Concentric partial arcs — fingerprint-style */}
      {[10, 16, 22, 28, 34].map((r, i) => (
        <circle
          key={r}
          cx="36"
          cy="36"
          r={r}
          stroke="oklch(0.7 0.18 295)"
          strokeWidth="0.8"
          strokeDasharray={i % 2 === 0 ? `${r * 0.9} ${r * 0.4}` : `${r * 0.7} ${r * 0.6}`}
          strokeLinecap="round"
          fill="none"
          opacity={1 - i * 0.12}
        />
      ))}
      {/* Centre dot */}
      <circle cx="36" cy="36" r="2.5" fill="oklch(0.7 0.18 295 / 0.8)" />
    </svg>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function FounderNote() {
  const sectionRef = useRef<HTMLElement>(null);
  const noteRef    = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(noteRef.current, { opacity: 0, y: 24 });
      gsap.set(cardRef.current, { opacity: 0, y: 20 });

      const trigger = sectionRef.current;
      const start   = "top 82%";
      const actions = "play none none none" as const;

      gsap.to(noteRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger, start, toggleActions: actions },
      });
      gsap.to(cardRef.current, {
        opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: 0.2,
        scrollTrigger: { trigger, start, toggleActions: actions },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-6 py-[96px]"
      style={{ borderTop: "1px solid oklch(0.28 0.05 285 / 0.7)" }}
    >
      {/* Very faint left-side ambient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 15% 50%, oklch(0.4 0.2 295 / 0.04), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* ── LEFT: founder note ──────────────────────────────────────── */}
          <div ref={noteRef} className="flex flex-col gap-8 lg:w-[66%]">

            {/* Technical label */}
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-px w-5 shrink-0"
                style={{ background: "oklch(0.7 0.18 295 / 0.55)" }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                04.0 — Founder's Note
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-[64px]">
              I built CyberSec Toolkit because security answers
              <br className="hidden md:block" />{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.7 0.18 295), oklch(0.78 0.2 310), oklch(0.9 0.05 285))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                shouldn't live across ten different tools.
              </span>
            </h2>

            {/* Body — editorial paragraph rhythm */}
            <div className="flex flex-col gap-5 max-w-[580px]">
              <p className="font-body text-[15px] leading-[1.8] text-muted-foreground">
                Port scans. DNS lookups. SSL checks. Vulnerability data.
                <br />
                The tools already existed. The problem was everything between them.
              </p>

              <p className="font-body text-[15px] leading-[1.8] text-muted-foreground">
                I kept seeing the same workflow: open a tool, run a check, copy
                the result, switch tabs, repeat — then manually figure out what
                actually matters. Security professionals were spending more time
                stitching outputs together than understanding what they were
                looking at.
              </p>

              <p className="font-body text-[15px] leading-[1.8] text-foreground/75">
                CyberSec Toolkit is my attempt to bring that workflow into one
                place and turn scattered security data into a{" "}
                <span
                  className="font-medium"
                  style={{ color: "oklch(0.78 0.15 295)" }}
                >
                  clearer answer
                </span>
                . Not a report that reads like a log file — one that tells you
                what to fix and why it matters.
              </p>

              <p className="font-body text-[15px] leading-[1.8] text-muted-foreground">
                It's still early. Feedback has shaped every release so far, and
                that's not changing. If you're using it — thank you. If
                something isn't working for you, I want to know.
              </p>
            </div>

          </div>

          {/* ── RIGHT: identity card ─────────────────────────────────────── */}
          <div ref={cardRef} className="lg:w-[34%]">
            <div
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-7 transition-colors duration-300 hover:border-border/75"
              style={{ boxShadow: "0 0 0 1px oklch(0.22 0.04 285 / 0.4)" }}
            >
              {/* Hover top accent */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.7 0.18 295 / 0.4), transparent)",
                }}
              />

              <div className="flex flex-col gap-6">
                {/* Identity mark */}
                <IdentityMark />

                {/* Label */}
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/50">
                    Built by a developer
                  </div>
                  <div className="mt-3 font-heading text-[1.1rem] font-semibold text-foreground">
                    Aman
                  </div>
                  <div className="mt-0.5 font-body text-[13px] text-muted-foreground/70">
                    Founder, CyberSec Toolkit
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="h-px w-full"
                  style={{ background: "oklch(0.28 0.05 285 / 0.7)" }}
                />

                {/* Status line */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.85_0.25_145)]"
                    style={{ boxShadow: "0 0 5px oklch(0.85 0.25 145 / 0.6)" }}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/55">
                    Building in public · 2026
                  </span>
                </div>

                {/* Short quote */}
                <p className="font-body text-[12px] leading-relaxed text-muted-foreground/60 italic">
                  "Every feature started as a frustration with an existing
                  workflow."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
