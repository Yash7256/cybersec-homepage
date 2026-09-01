/**
 * UseCasesSection — testimonial card UI with persona switcher
 * Layout: heading stacked above a full-width testimonial card.
 * Three personas (Developer, Founder, Pentester) switchable via avatar row.
 */

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Code2, Crosshair } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Testimonial data ───────────────────────────────────────────────────── */

const testimonials = [
  {
    id: "dev",
    name: "Alex Chen",
    handle: "@alexchen_dev",
    role: "Senior Engineer, Stripe",
    avatar: "AC",
    color: "oklch(0.7 0.18 295)",
    favoriteFeature: { icon: "🛡️", label: "Unified Scan" },
    featureNote: "Replaces 6 separate tools I used to run manually every sprint.",
    topUseCase: { icon: "🔍", label: "Pre-deploy security check" },
    useCaseNote: "Catches open ports and missing headers before anything hits prod.",
    quote:
      "CyberSec Toolkit is an absolute gamechanger for our deployment pipeline. From quick SSL audits to full CVE correlation — it truly nails the details when it comes to keeping our infrastructure secure.",
    quoteHighlight: "truly nails the details",
  },
  {
    id: "founder",
    name: "Priya Nair",
    handle: "@priyanair_io",
    role: "Founder, Stackwise",
    avatar: "PN",
    color: "oklch(0.78 0.2 310)",
    favoriteFeature: { icon: "📊", label: "Executive Report" },
    featureNote: "I finally understand our security posture without needing a specialist.",
    topUseCase: { icon: "⚡", label: "Investor due diligence prep" },
    useCaseNote: "Ran a full scan, exported the PDF, and shared it in the data room.",
    quote:
      "As a non-technical founder, security was always a black box. CyberSec Toolkit gives me a plain-English risk score and tells me exactly what to fix — before it becomes someone else's problem.",
    quoteHighlight: "plain-English risk score",
  },
  {
    id: "pentester",
    name: "Marcus Webb",
    handle: "@mwebb_sec",
    role: "Pentester, NCC Group",
    avatar: "MW",
    color: "oklch(0.85 0.25 145)",
    favoriteFeature: { icon: "🎯", label: "Parallel Recon" },
    featureNote: "Subdomains, ports, SSL and CVEs — all running simultaneously.",
    topUseCase: { icon: "📋", label: "Report generation" },
    useCaseNote: "Drops every finding straight into a structured report. Saves hours.",
    quote:
      "I've used dozens of recon tools. Nothing comes close to having port scans, subdomain enumeration, SSL audit and CVE correlation in a single workspace. My clients get better reports faster.",
    quoteHighlight: "My clients get better reports faster",
  },
] as const;

type TestimonialId = typeof testimonials[number]["id"];

const PersonaIcon: Record<
  TestimonialId,
  React.FC<{ className?: string; style?: React.CSSProperties }>
> = {
  dev:       (p) => <Code2 className={p.className} style={p.style} />,
  founder:   (p) => <ShieldCheck className={p.className} style={p.style} />,
  pentester: (p) => <Crosshair className={p.className} style={p.style} />,
};

/* ─── TestimonialCard ────────────────────────────────────────────────────── */

function TestimonialCard() {
  const [active, setActive] = useState<TestimonialId>("dev");
  const quoteRef  = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const switchTo = (id: TestimonialId) => {
    if (id === active) return;
    const els = [quoteRef.current, detailRef.current].filter(Boolean);
    gsap.to(els, {
      opacity: 0, y: -10, duration: 0.16, ease: "power2.in",
      onComplete: () => {
        setActive(id);
        gsap.fromTo(els,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" },
        );
      },
    });
  };

  const t = testimonials.find((x) => x.id === active)!;

  /* Sort so active persona is always center */
  const ordered = (() => {
    const idx = testimonials.findIndex((x) => x.id === active);
    const arr = [...testimonials];
    /* Rotate so active is at index 1 (center of 3) */
    while (arr[1].id !== active) arr.push(arr.shift()!);
    return arr;
  })();
  void ordered; /* use below */

  const renderQuote = () => {
    const parts = t.quote.split(t.quoteHighlight);
    return (
      <>
        {parts[0]}
        <strong className="font-semibold text-foreground/95">{t.quoteHighlight}</strong>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className="w-full overflow-hidden rounded-2xl"
      style={{
        background: "oklch(0.11 0.022 285)",
        border: "1px solid oklch(0.24 0.04 285 / 0.7)",
      }}
    >
      {/* ────────────────────────────────────────────────────────────────────
       * TOP — Profile selector
       * Horizontal row. Active = card with avatar+name side by side.
       * Inactive = text-only, dimmed, flanking left and right.
       * ────────────────────────────────────────────────────────────────────*/}
      <div
        className="flex items-center justify-center gap-0 px-10 py-8 md:py-10"
        style={{ borderBottom: "1px solid oklch(0.22 0.04 285 / 0.55)" }}
      >
        {testimonials.map((person, i) => {
          const isActive = person.id === active;
          const Icon = PersonaIcon[person.id];
          return (
            <button
              key={person.id}
              onClick={() => switchTo(person.id)}
              className="flex items-center gap-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{
                padding: isActive ? "10px 16px" : "10px 24px",
                borderRadius: 12,
                background: isActive ? "oklch(0.17 0.04 285)" : "transparent",
                border: isActive ? "1px solid oklch(0.3 0.05 285 / 0.7)" : "1px solid transparent",
                opacity: isActive ? 1 : 0.45,
                cursor: isActive ? "default" : "pointer",
              }}
            >
              {/* Avatar — shown for all, but only prominent when active */}
              <div
                className="flex shrink-0 items-center justify-center rounded-full font-semibold transition-all duration-300"
                style={{
                  width: isActive ? 40 : 32,
                  height: isActive ? 40 : 32,
                  fontSize: isActive ? 12 : 10,
                  background: isActive ? "oklch(0.22 0.06 285)" : "oklch(0.18 0.04 285)",
                  border: "1px solid oklch(0.3 0.05 285 / 0.5)",
                  color: "oklch(0.75 0.03 285)",
                  letterSpacing: "0.05em",
                }}
              >
                <Icon style={{ width: isActive ? 16 : 13, height: isActive ? 16 : 13, opacity: 0.7 }} />
              </div>

              {/* Text */}
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="font-body font-medium"
                    style={{
                      fontSize: isActive ? 14 : 13,
                      color: isActive ? "oklch(0.93 0.005 285)" : "oklch(0.65 0.03 285)",
                      letterSpacing: "0.005em",
                    }}
                  >
                    {person.name}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      color: isActive ? "oklch(0.48 0.03 285)" : "oklch(0.38 0.03 285)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {person.handle}
                  </span>
                </div>
                <span
                  className="font-body"
                  style={{
                    fontSize: 11,
                    color: isActive ? "oklch(0.48 0.03 285)" : "oklch(0.35 0.03 285)",
                  }}
                >
                  {person.role}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ────────────────────────────────────────────────────────────────────
       * BOTTOM — Two-column content
       * ────────────────────────────────────────────────────────────────────*/}
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* LEFT — Feature details */}
        <div
          ref={detailRef}
          className="flex flex-col gap-10 px-10 py-10 md:px-12 md:py-12"
          style={{ borderRight: "1px solid oklch(0.22 0.04 285 / 0.45)" }}
        >
          {/* FAVORITE FEATURE */}
          <div className="flex flex-col gap-3">
            <p
              className="font-mono uppercase"
              style={{ fontSize: 9, letterSpacing: "0.16em", color: "oklch(0.42 0.03 285)" }}
            >
              Favorite Feature
            </p>
            {/* Pill */}
            <div
              className="inline-flex w-fit items-center gap-2 px-3 py-1.5"
              style={{
                border: "1px solid oklch(0.28 0.05 285 / 0.7)",
                borderRadius: 8,
                background: "oklch(0.14 0.03 285 / 0.6)",
              }}
            >
              <span style={{ fontSize: 13 }}>{t.favoriteFeature.icon}</span>
              <span
                className="font-body font-medium"
                style={{ fontSize: 13, color: "oklch(0.88 0.01 285)", letterSpacing: "0.01em" }}
              >
                {t.favoriteFeature.label}
              </span>
            </div>
            {/* Description */}
            <p
              className="font-body leading-relaxed"
              style={{ fontSize: 13, color: "oklch(0.55 0.03 285)", lineHeight: 1.65, maxWidth: 320 }}
            >
              {t.featureNote}
            </p>
          </div>

          {/* TOP USE CASE */}
          <div className="flex flex-col gap-3">
            <p
              className="font-mono uppercase"
              style={{ fontSize: 9, letterSpacing: "0.16em", color: "oklch(0.42 0.03 285)" }}
            >
              Top Use Case
            </p>
            {/* Pill */}
            <div
              className="inline-flex w-fit items-center gap-2 px-3 py-1.5"
              style={{
                border: "1px solid oklch(0.28 0.05 285 / 0.7)",
                borderRadius: 8,
                background: "oklch(0.14 0.03 285 / 0.6)",
              }}
            >
              <span style={{ fontSize: 13 }}>{t.topUseCase.icon}</span>
              <span
                className="font-body font-medium"
                style={{ fontSize: 13, color: "oklch(0.88 0.01 285)", letterSpacing: "0.01em" }}
              >
                {t.topUseCase.label}
              </span>
            </div>
            {/* Description */}
            <p
              className="font-body leading-relaxed"
              style={{ fontSize: 13, color: "oklch(0.55 0.03 285)", lineHeight: 1.65, maxWidth: 320 }}
            >
              {t.useCaseNote}
            </p>
          </div>
        </div>

        {/* RIGHT — Testimonial quote */}
        <div
          ref={quoteRef}
          className="flex flex-col justify-center px-10 py-10 md:px-12 md:py-12"
        >
          {/* Opening mark */}
          <div
            className="mb-4 font-heading select-none leading-none"
            style={{ fontSize: 64, color: "oklch(0.3 0.04 285)", lineHeight: 0.7 }}
            aria-hidden="true"
          >
            "
          </div>

          {/* Quote body */}
          <blockquote
            className="font-body"
            style={{
              fontSize: 17,
              lineHeight: 1.78,
              color: "oklch(0.68 0.025 285)",
              maxWidth: "92%",
            }}
          >
            {renderQuote()}
          </blockquote>

          {/* Attribution */}
          <div className="mt-10 flex items-center gap-2.5">
            {(() => {
              const Icon = PersonaIcon[t.id];
              return (
                <Icon
                  style={{ width: 12, height: 12, color: "oklch(0.4 0.03 285)", flexShrink: 0 }}
                />
              );
            })()}
            <span
              className="font-mono uppercase"
              style={{ fontSize: 9, letterSpacing: "0.18em", color: "oklch(0.42 0.03 285)" }}
            >
              {t.role}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function UseCasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set([headRef.current, cardRef.current], { opacity: 0, y: 24 });
      const st = {
        trigger: sectionRef.current,
        start: "top 82%",
        toggleActions: "play none none none",
      };
      gsap.to(headRef.current, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", scrollTrigger: st });
      gsap.to(cardRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.12, scrollTrigger: st });
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
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, oklch(0.4 0.2 295 / 0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px]">

        {/* Heading */}
        <div ref={headRef} className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-block h-px w-5 bg-primary/60" />
            Use Cases
          </div>
          <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-[64px]">
            Security intelligence
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.7 0.18 295), oklch(0.78 0.2 310), oklch(0.9 0.05 285))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              for every workflow.
            </span>
          </h2>
          <p className="font-body mt-4 max-w-[480px] text-[14px] leading-relaxed text-muted-foreground">
            Whether you're shipping code, running a company, or doing recon —
            CyberSec Toolkit adapts to your workflow and delivers the answers you need.
          </p>
        </div>

        {/* Testimonial card */}
        <div ref={cardRef}>
          <TestimonialCard />
        </div>

      </div>
    </section>
  );
}
