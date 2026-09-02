import { createContext, type ReactNode, useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis, { type ScrollToOptions } from "lenis";

gsap.registerPlugin(ScrollTrigger);

type ScrollController = {
  scrollTo: (target: string | number | HTMLElement, opts?: ScrollToOptions) => void;
};

const ScrollContext = createContext<ScrollController | null>(null);

export function useSmoothScroll(): ScrollController {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    return { scrollTo: () => {} };
  }
  return ctx;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: ScrollController["scrollTo"] = (target, opts) => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(target, opts);
  };

  return <ScrollContext.Provider value={{ scrollTo }}>{children}</ScrollContext.Provider>;
}
