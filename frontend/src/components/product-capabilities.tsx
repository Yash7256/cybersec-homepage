import { useCallback, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";
import serverLottie from "../../assets/server.lottie?url";
import aiLottie from "../../assets/AI.lottie?url";
import developmentLottie from "../../assets/Development.lottie?url";

gsap.registerPlugin(ScrollTrigger);

/* ─── FIG. 01 — Lottie scroll-scrub illustration ────────────────────────── */

/**
 * Renders the server.lottie file with its playback driven entirely by scroll.
 * No autoplay, no loop. GSAP ScrollTrigger scrubs a proxy value whose onUpdate
 * calls dotLottie.setFrame() for smooth, direct frame control.
 *
 * Reduced-motion: ScrollTrigger is skipped and the animation jumps to its last
 * frame once the asset loads, giving a stable final-state image.
 */
function ServerLottieIllustration({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const dotLottieRef = useRef<DotLottie | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Called by DotLottieReact with the instance on mount, and null on unmount
  const handleDotLottieReady = useCallback(
    (dl: DotLottie | null) => {
      // Library passes null when the canvas unmounts — guard every access
      if (!dl) {
        dotLottieRef.current = null;
        return;
      }

      dotLottieRef.current = dl;

      // Pause immediately — we drive frames manually
      dl.pause();

      if (reducedMotion) {
        // Show final frame for reduced-motion users
        const showFinal = () => dl.setFrame(dl.totalFrames - 1);
        if (dl.totalFrames > 0) {
          showFinal();
        } else {
          dl.addEventListener("load", showFinal);
        }
        return;
      }

      // Wait for the animation to load so totalFrames is known
      const setup = () => {
        const total = dl.totalFrames;
        if (!total || !containerRef.current) return;

        stRef.current = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1.2,
          onUpdate: (self) => {
            // Guard: instance may have been destroyed between frames
            if (!dotLottieRef.current) return;
            dotLottieRef.current.setFrame(self.progress * (total - 1));
          },
        });

        // Start at frame 0 visually
        dl.setFrame(0);
      };

      if (dl.totalFrames > 0) {
        setup();
      } else {
        dl.addEventListener("load", setup);
      }
    },
    // containerRef is a stable ref — intentionally excluded from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reducedMotion],
  );

  // Clean up ScrollTrigger when component unmounts
  useLayoutEffect(() => {
    return () => {
      stRef.current?.kill();
      stRef.current = null;
    };
  }, []);

  return (
    <DotLottieReact
      src={serverLottie}
      autoplay={false}
      loop={false}
      dotLottieRefCallback={handleDotLottieReady}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  );
}

/* ─── FIG. 02 — AI Lottie scroll-scrub illustration ─────────────────────── */

function AILottieIllustration({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const dotLottieRef = useRef<DotLottie | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleDotLottieReady = useCallback(
    (dl: DotLottie | null) => {
      if (!dl) {
        dotLottieRef.current = null;
        return;
      }

      dotLottieRef.current = dl;
      dl.pause();

      if (reducedMotion) {
        const showFinal = () => dl.setFrame(dl.totalFrames - 1);
        if (dl.totalFrames > 0) {
          showFinal();
        } else {
          dl.addEventListener("load", showFinal);
        }
        return;
      }

      const setup = () => {
        const total = dl.totalFrames;
        if (!total || !containerRef.current) return;

        stRef.current = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1.2,
          onUpdate: (self) => {
            if (!dotLottieRef.current) return;
            dotLottieRef.current.setFrame(self.progress * (total - 1));
          },
        });

        dl.setFrame(0);
      };

      if (dl.totalFrames > 0) {
        setup();
      } else {
        dl.addEventListener("load", setup);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reducedMotion],
  );

  useLayoutEffect(() => {
    return () => {
      stRef.current?.kill();
      stRef.current = null;
    };
  }, []);

  return (
    <DotLottieReact
      src={aiLottie}
      autoplay={false}
      loop={false}
      dotLottieRefCallback={handleDotLottieReady}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  );
}

/* ─── FIG. 03 — Development Lottie scroll-scrub illustration ────────────── */

function DevelopmentLottieIllustration({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const dotLottieRef = useRef<DotLottie | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleDotLottieReady = useCallback(
    (dl: DotLottie | null) => {
      if (!dl) {
        dotLottieRef.current = null;
        return;
      }

      dotLottieRef.current = dl;
      dl.pause();

      if (reducedMotion) {
        const showFinal = () => dl.setFrame(dl.totalFrames - 1);
        if (dl.totalFrames > 0) {
          showFinal();
        } else {
          dl.addEventListener("load", showFinal);
        }
        return;
      }

      const setup = () => {
        const total = dl.totalFrames;
        if (!total || !containerRef.current) return;

        stRef.current = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1.2,
          onUpdate: (self) => {
            if (!dotLottieRef.current) return;
            dotLottieRef.current.setFrame(self.progress * (total - 1));
          },
        });

        dl.setFrame(0);
      };

      if (dl.totalFrames > 0) {
        setup();
      } else {
        dl.addEventListener("load", setup);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reducedMotion],
  );

  useLayoutEffect(() => {
    return () => {
      stRef.current?.kill();
      stRef.current = null;
    };
  }, []);

  return (
    <DotLottieReact
      src={developmentLottie}
      autoplay={false}
      loop={false}
      dotLottieRefCallback={handleDotLottieReady}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  );
}

/* ─── Section Component ──────────────────────────────────────────────────── */

const capabilityMeta = [
  {
    fig: "FIG. 01",
    title: "Security Infrastructure",
    desc: "End-to-end visibility across ports, services, and network topology — layered defenses built for scale.",
  },
  {
    fig: "FIG. 02",
    title: "AI-Powered Agents",
    desc: "Autonomous agents that correlate findings, map attack surfaces, and surface actionable intelligence in real time.",
  },
  {
    fig: "FIG. 03",
    title: "High-Speed Intelligence",
    desc: "Stream-process scan data at machine speed. Results in seconds, not hours — from target to full report.",
  },
] as const;

export function ProductCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  // Ref to the FIG. 01 illustration container — passed to the Lottie component
  // so it can use the card as the ScrollTrigger target element
  const fig01ContainerRef = useRef<HTMLDivElement>(null);
  // Ref to the FIG. 02 illustration container
  const fig02ContainerRef = useRef<HTMLDivElement>(null);
  // Ref to the FIG. 03 illustration container
  const fig03ContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Label + heading + desc stagger reveal
      gsap.set([labelRef.current, headingRef.current, descRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          defaults: { ease: "power2.out" },
        })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

      // Cards stagger
      const cards = cardsRef.current.filter(Boolean);
      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.15,
            overwrite: true,
          }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-[120px]"
      style={{
        background:
          "radial-gradient(ellipse 70% 40% at 50% 0%, oklch(0.4 0.2 295 / 0.12), transparent 70%)",
      }}
    >
      {/* Subtle horizontal rule at top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.28 0.05 285), oklch(0.7 0.18 295 / 0.3), oklch(0.28 0.05 285), transparent)",
        }}
      />

      {/* Background grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.18 295) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 295) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-[1100px]">
        {/* ── Section intro ── */}
        <div className="mb-[72px] max-w-[640px]">
          <div
            ref={labelRef}
            className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase"
          >
            <span
              className="inline-block h-px w-5"
              style={{ background: "oklch(0.7 0.18 295 / 0.6)" }}
            />
            PRODUCT / CAPABILITIES
          </div>

          <h2
            ref={headingRef}
            className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-[64px]"
          >
            Built for security.
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
              Designed for intelligence.
            </span>
          </h2>

          <p
            ref={descRef}
            className="font-body mt-5 text-[15px] leading-relaxed text-muted-foreground max-w-[480px]"
          >
            CyberSec brings essential security intelligence, network analysis, and AI-powered
            capabilities into one unified platform — so every scan produces actionable insight.
          </p>
        </div>

        {/* ── Capability columns ── */}
        <div className="grid grid-cols-1 gap-px md:grid-cols-3">
          {capabilityMeta.map(({ fig, title, desc }, index) => (
            <div
              key={fig}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative flex flex-col"
              style={{
                borderLeft: index === 0 ? "1px solid oklch(0.28 0.05 285 / 0.7)" : undefined,
                borderRight: "1px solid oklch(0.28 0.05 285 / 0.7)",
              }}
            >
              {/* Top border */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    index === 1
                      ? "linear-gradient(90deg, oklch(0.28 0.05 285 / 0.5), oklch(0.7 0.18 295 / 0.5), oklch(0.28 0.05 285 / 0.5))"
                      : "oklch(0.28 0.05 285 / 0.7)",
                }}
              />

              {/* Hover top accent */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.7 0.18 295 / 0.8), transparent)",
                }}
              />

              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 20%, oklch(0.7 0.18 295 / 0.05), transparent 70%)",
                }}
              />

              <div className="relative z-10 flex flex-col px-8 py-10 h-full">
                {/* Figure label */}
                <div className="mb-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  {fig}
                </div>

                {/* Title */}
                <h3 className="font-heading text-[1.15rem] font-semibold leading-snug text-foreground">
                  {title}
                </h3>

                {/* Description */}
                <p className="font-body mt-2.5 text-[13px] leading-relaxed text-muted-foreground max-w-[240px]">
                  {desc}
                </p>

                {/* Illustration area */}
                <div
                  ref={index === 0 ? fig01ContainerRef : index === 1 ? fig02ContainerRef : fig03ContainerRef}
                  className="cap-illustration-area relative mt-10 flex-1 min-h-[220px] overflow-hidden"
                  style={{
                    borderTop: "1px solid oklch(0.28 0.05 285 / 0.5)",
                  }}
                >
                  <div className="pt-6 h-full">
                    {index === 0 ? (
                      <ServerLottieIllustration containerRef={fig01ContainerRef} />
                    ) : index === 1 ? (
                      // FIG. 02 — Lottie scroll-scrubbed illustration
                      <AILottieIllustration containerRef={fig02ContainerRef} />
                    ) : (
                      // FIG. 03 — Lottie scroll-scrubbed illustration
                      <DevelopmentLottieIllustration containerRef={fig03ContainerRef} />
                    )}
                  </div>

                  {/* Subtle bottom fade */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.13 0.03 285), transparent)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom rule ── */}
        <div
          className="mt-0 h-px"
          style={{
            background: "oklch(0.28 0.05 285 / 0.7)",
          }}
        />
      </div>

      {/* Bottom gradient fade into marquee */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            "linear-gradient(to top, oklch(0.13 0.03 285 / 0.8), transparent)",
        }}
      />
    </section>
  );
}
