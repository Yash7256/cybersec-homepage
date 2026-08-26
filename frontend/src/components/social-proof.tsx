/**
 * SocialProof — premium bento grid of community feedback images
 *
 * Layout: asymmetric 12-column CSS grid, 7 cells.
 * Image slots use <img> with object-fit:cover so real screenshots
 * can be dropped in later by swapping the src prop.
 *
 * Colors: 100% existing CyberSec design tokens only.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Image placeholder ──────────────────────────────────────────────────── */

interface FeedbackImageProps {
  /** Drop in the real screenshot src here when ready */
  src?: string;
  alt: string;
  className?: string;
}

function FeedbackImage({ src, alt, className = "" }: FeedbackImageProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      ) : (
        /* Placeholder shown until real images are added */
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3"
          style={{ background: "oklch(0.15 0.035 285)" }}
        >
          {/* Dashed frame to signal "image goes here" */}
          <div
            className="flex h-[calc(100%-32px)] w-[calc(100%-32px)] flex-col items-center justify-center gap-2 rounded-lg"
            style={{
              border: "1px dashed oklch(0.3 0.05 285 / 0.6)",
            }}
          >
            <svg
              width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.2"
              className="text-muted-foreground/30"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/30">
              {alt}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Bento cell wrapper ─────────────────────────────────────────────────── */

interface BentoCellProps {
  children: React.ReactNode;
  className?: string;
  /** grid-column and grid-row shorthand */
  style?: React.CSSProperties;
  /** extra padding override */
  padded?: boolean;
  "data-bento"?: boolean;
}

function BentoCell({ children, className = "", style, padded = false, ...rest }: BentoCellProps) {
  return (
    <div
      {...rest}
      className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-transform duration-300 ease-out hover:-translate-y-[2px] ${className}`}
      style={style}
    >
      {/* Top accent line on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.7 0.18 295 / 0.6), transparent)" }}
      />
      <div className={padded ? "h-full p-5" : "h-full"}>
        {children}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { opacity: 0, y: 24 });
      gsap.to(headRef.current, {
        opacity: 1, y: 0, duration: 0.75, ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      const cells = gridRef.current?.querySelectorAll("[data-bento]");
      if (cells) {
        gsap.set(cells, { opacity: 0, y: 28 });
        ScrollTrigger.batch(cells, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1, y: 0,
              duration: 0.65, ease: "power2.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });
      }
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
            "radial-gradient(ellipse 60% 45% at 70% 30%, oklch(0.4 0.2 295 / 0.055), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px]">

        {/* ── Section heading ── */}
        <div ref={headRef} className="mb-12 max-w-[560px]">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-block h-px w-5 bg-primary/60" />
            Community
          </div>
          <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-[64px]">
            The signal is{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.7 0.18 295), oklch(0.78 0.2 310), oklch(0.9 0.05 285))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              getting louder.
            </span>
          </h2>
          <p className="font-body mt-4 max-w-[440px] text-[14px] leading-relaxed text-muted-foreground">
            Early feedback from developers and cybersecurity professionals
            building, testing, and exploring CyberSec Toolkit.
          </p>
        </div>

        {/* ── Bento grid ── */}
        {/*
          12-column grid. Row heights are explicit so cells have substance.
          Cell layout:
            A  [col 1–7, row 1–2]  large feature image
            B  [col 7–10, row 1]   medium image
            C  [col 10–13, row 1]  small utility cell
            D  [col 7–10, row 2]   medium image (bottom-left of second row)
            E  [col 10–13, row 2]  medium image
            F  [col 1–7, row 3]    medium image (left, third row)
            G  [col 7–13, row 3]   wide image
        */}
        <div
          ref={gridRef}
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "280px 220px 240px",
          }}
        >

          {/* A — large feature cell */}
          <BentoCell
            data-bento
            style={{ gridColumn: "1 / 7", gridRow: "1 / 3" }}
          >
            <FeedbackImage alt="Feature feedback screenshot" />
          </BentoCell>

          {/* B — medium top-right */}
          <BentoCell
            data-bento
            style={{ gridColumn: "7 / 10", gridRow: "1 / 2" }}
          >
            <FeedbackImage alt="Developer feedback screenshot" />
          </BentoCell>

          {/* C — small utility cell */}
          <BentoCell
            data-bento
            padded
            style={{ gridColumn: "10 / 13", gridRow: "1 / 2" }}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                  Real Feedback · Early Access
                </div>
                <p className="font-body text-[13px] leading-relaxed text-foreground/70">
                  Built with feedback,
                  <br />
                  not assumptions.
                </p>
              </div>
              <div
                className="inline-flex items-center gap-1.5 self-start rounded-full border border-border/50 px-3 py-1.5"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.25_145)]"
                  style={{ boxShadow: "0 0 5px oklch(0.85 0.25 145 / 0.6)" }}
                />
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
                  From the community
                </span>
              </div>
            </div>
          </BentoCell>

          {/* D — medium, second row left of right half */}
          <BentoCell
            data-bento
            style={{ gridColumn: "7 / 10", gridRow: "2 / 3" }}
          >
            <FeedbackImage alt="Security professional feedback" />
          </BentoCell>

          {/* E — medium, second row right */}
          <BentoCell
            data-bento
            style={{ gridColumn: "10 / 13", gridRow: "2 / 3" }}
          >
            <FeedbackImage alt="Community reaction screenshot" />
          </BentoCell>

          {/* F — medium, third row left */}
          <BentoCell
            data-bento
            style={{ gridColumn: "1 / 6", gridRow: "3 / 4" }}
          >
            <FeedbackImage alt="Developer comment screenshot" />
          </BentoCell>

          {/* G — wide, third row right */}
          <BentoCell
            data-bento
            style={{ gridColumn: "6 / 13", gridRow: "3 / 4" }}
          >
            <FeedbackImage alt="Extended feedback thread screenshot" />
          </BentoCell>

        </div>

        {/* ── Footer note ── */}
        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/40">
          Screenshots shared with permission · identifying details removed where requested
        </p>

      </div>
    </section>
  );
}
