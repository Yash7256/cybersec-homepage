/**
 * BentoFeatures — pixel-faithful Figma bento grid
 * Source: https://www.figma.com/design/REID0z9Gj2koestcgyLszB/...?node-id=2010-116
 *
 * Card layout (Figma 1200×900):
 *   A  262×396  left tall
 *   B  556×396  center wide tall
 *   C  262×157  right top small
 *   D  262×211  right mid
 *   E  262×219  left bottom top
 *   F  262×165  left bottom bottom
 *   G  264×412  center bottom
 *   H  554×412  right wide bottom
 *   Circle: 270×270 centred at (600,450)
 */

import { useLayoutEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";
import serverLottie      from "../../assets/server.lottie?url";
import aiLottie          from "../../assets/AI.lottie?url";
import developmentLottie from "../../assets/Development.lottie?url";
import centerImg         from "../../assets/bento/center.png";
import securityTeamImg   from "../../assets/bento/Securityteammain.png";
import card1Img          from "../../assets/bento/1.png";
import card2Img          from "../../assets/bento/2.png";
import card3Img          from "../../assets/bento/3.png";
import card4Img          from "../../assets/bento/4.png";
import card5Img          from "../../assets/bento/5.png";
import card6Img          from "../../assets/bento/6.png";
import card9Img          from "../../assets/bento/9.png";
import developerImg      from "../../assets/bento/Developermain.png";
import secResearcherImg  from "../../assets/bento/securityresearchersmain.png";

gsap.registerPlugin(ScrollTrigger);

/* ─── Design tokens ──────────────────────────────────────────────────────── */
const CARD_BG = "#1d1d3b";
const BG      = "#03061c";

const card: React.CSSProperties = {
  background: CARD_BG,
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "24px",
  position: "relative",
  overflow: "hidden",
};

/* ─── Hover accent line ──────────────────────────────────────────────────── */
function Accent() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: "linear-gradient(90deg,transparent,oklch(0.7 0.18 295/0.55),transparent)" }}
    />
  );
}

/* ─── Scroll-scrubbed Lottie ─────────────────────────────────────────────── */
function Lottie({
  src,
  triggerRef,
}: {
  src: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const dlRef   = useRef<DotLottie | null>(null);
  const stRef   = useRef<ScrollTrigger | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  const onReady = useCallback(
    (dl: DotLottie | null) => {
      if (!dl) { dlRef.current = null; return; }
      dlRef.current = dl;
      dl.pause();
      if (reduced) {
        const go = () => dl.setFrame(dl.totalFrames - 1);
        dl.totalFrames > 0 ? go() : dl.addEventListener("load", go);
        return;
      }
      const setup = () => {
        const total = dl.totalFrames;
        if (!total || !triggerRef.current) return;
        stRef.current = ScrollTrigger.create({
          trigger: triggerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1.2,
          onUpdate: (s) => dlRef.current?.setFrame(s.progress * (total - 1)),
        });
        dl.setFrame(0);
      };
      dl.totalFrames > 0 ? setup() : dl.addEventListener("load", setup);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reduced],
  );

  useLayoutEffect(() => () => { stRef.current?.kill(); }, []);

  return (
    <DotLottieReact
      src={src}
      autoplay={false}
      loop={false}
      dotLottieRefCallback={onReady}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  );
}

/* ─── Card label ─────────────────────────────────────────────────────────── */
function CL({ n, t }: { n: string; t: string }) {
  return (
    <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/40">
      {n} · {t}
    </p>
  );
}

/* ─── Mini illustrations ─────────────────────────────────────────────────── */
function ScanBars() {
  return (
    <div className="mt-auto flex flex-col gap-1.5 pt-4">
      {[100, 72, 91, 52, 84, 38].map((w, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full"
          style={{
            width: `${w}%`,
            background:
              i % 3 === 0
                ? "oklch(0.7 0.18 295/0.55)"
                : i % 3 === 1
                  ? "oklch(0.85 0.25 145/0.38)"
                  : "oklch(0.42 0.04 285/0.35)",
          }}
        />
      ))}
    </div>
  );
}

function RiskBars() {
  return (
    <div className="mt-auto flex items-end gap-1 pt-4" style={{ height: 52 }}>
      {[40, 65, 45, 80, 55, 90, 70, 50, 85, 60].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${h * 0.56}px`,
            background:
              h > 75
                ? "oklch(0.65 0.22 25/0.7)"
                : h > 55
                  ? "oklch(0.7 0.18 295/0.5)"
                  : "oklch(0.42 0.04 285/0.35)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export function BentoFeatures({ embedded = false }: { embedded?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const circleRef  = useRef<HTMLDivElement>(null);

  const refA = useRef<HTMLDivElement>(null);
  const refB = useRef<HTMLDivElement>(null);
  const refH = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (!embedded && headRef.current) {
        gsap.set(headRef.current, { opacity: 0, y: 24 });
        gsap.to(headRef.current, {
          opacity: 1, y: 0, duration: 0.75, ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      const cards = gridRef.current?.querySelectorAll("[data-c]");
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 32 });
        ScrollTrigger.batch(cards, {
          start: "top 93%", once: true,
          onEnter: (b) =>
            gsap.to(b, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.06, overwrite: true }),
        });
      }

      /* Circle rotates freely as you scroll — 720° over the section's scroll distance */
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          rotation: 720,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, embedded ? gridRef : sectionRef);

    return () => ctx.revert();
  }, [embedded]);

  /* ── The bento grid — shared between standalone and embedded modes ── */
  const bentoGrid = (
    <div className="relative" ref={gridRef}>
      {/* THE CIRCLE — center.png fills it, rotates on scroll */}
      <div
        ref={circleRef}
        className="absolute z-20 overflow-hidden"
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          left: "calc((262 / 1080) * 100% + 20px + (556 / 1080) * 50% - 70px)",
          top: 217,
          border: `4px solid ${BG}`,
          boxShadow: `0 0 0 3px ${CARD_BG}, 0 0 0 6px oklch(0.7 0.18 295/0.2)`,
        }}
      >
        <img
          src={centerImg}
          alt="Platform centre"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* 3-column grid */}
      <div className="grid" style={{ gridTemplateColumns: "262fr 556fr 262fr", gap: 20 }}>

        {/* ── COL 1 ── */}
        <div className="flex flex-col gap-[20px]">
          {/* Card A */}
          <div data-c className="group flex flex-col" style={{ ...card, height: 277 }}>
            <Accent />
            <div
              ref={refA}
              className="relative mx-3 my-3 flex-1 overflow-hidden rounded-xl"
              style={{ border: "1px solid oklch(0.28 0.05 285/0.3)" }}
            >
              <img src={card1Img} alt="" className="h-full w-full object-cover object-top" />
            </div>
          </div>

          {/* Card E */}
          <div data-c className="group flex flex-col p-6" style={{ ...card, height: 153 }}>
            <Accent />
            <ScanBars />
          </div>

          {/* Card F */}
          <div data-c className="group flex flex-col p-6" style={{ ...card, height: 115 }}>
            <Accent />
            <img src={card5Img} alt="" className="h-full w-full object-cover object-top rounded-xl" />
          </div>
        </div>

        {/* ── COL 2 ── */}
        <div className="flex flex-col gap-[20px]">
          {/* Card B */}
          <div data-c className="group flex flex-col" style={{ ...card, height: 277 }}>
            <Accent />
            <div
              ref={refB}
              className="relative mx-3 my-3 flex-1 overflow-hidden rounded-xl"
              style={{ border: "1px solid oklch(0.28 0.05 285/0.3)" }}
            >
              <img src={card2Img} alt="" className="h-full w-full object-cover object-top" />
            </div>
          </div>

          {/* Card G */}
          <div data-c className="group flex flex-col p-6" style={{ ...card, height: 288 }}>
            <Accent />
            <img src={card6Img} alt="" className="h-full w-full object-cover object-top rounded-xl" />
          </div>
        </div>

        {/* ── COL 3 ── */}
        <div className="flex flex-col gap-[20px]">
          {/* Card C */}
          <div data-c className="group flex flex-col p-6" style={{ ...card, height: 110 }}>
            <Accent />
            <img src={card3Img} alt="" className="h-full w-full object-cover object-top rounded-xl" />
          </div>

          {/* Card D */}
          <div data-c className="group flex flex-col p-6" style={{ ...card, height: 148 }}>
            <Accent />
            <img src={card4Img} alt="" className="h-full w-full object-cover object-top rounded-xl" />
          </div>

          {/* Card 9 (below Card D) */}
          <div data-c className="group flex flex-col p-6" style={{ ...card, height: 288 }}>
            <Accent />
            <img src={card9Img} alt="" className="h-full w-full object-cover object-top rounded-xl" />
          </div>
        </div>

      </div>
    </div>
  );

  /* Embedded: just the grid, no section wrapper or heading */
  if (embedded) {
    return bentoGrid;
  }

  /* Standalone: full section with heading */
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-[100px]"
      style={{ background: BG, borderTop: "1px solid oklch(0.28 0.05 285/0.7)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%,oklch(0.4 0.2 295/0.08),transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px]">
        <div ref={headRef} className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-block h-px w-5 bg-primary/60" />
            Platform Features
          </div>
          <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-[48px]">
            Everything you need.{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,oklch(0.7 0.18 295),oklch(0.78 0.2 310),oklch(0.9 0.05 285))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              In one place.
            </span>
          </h2>
          <p className="font-body mt-4 max-w-[480px] text-[14px] leading-relaxed text-muted-foreground">
            Every tool you need to understand, assess, and act on your security
            posture — unified in a single platform.
          </p>
        </div>

        {bentoGrid}
      </div>
    </section>
  );
}
