import { Link } from "@tanstack/react-router";
import { SiteNavbar } from "@/components/site-navbar";
import heroGrid from "../../assets/GRID.png";

export function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground pt-[88px]">
      {/* Background Effects */}
      <div className="pointer-events-none absolute top-[-56px] left-1/2 z-0 h-[390px] w-[min(780px,100vw)] -translate-x-1/2 rounded-[780px] bg-[#8f43dd] opacity-75 blur-[190px]" />
      <img
        src={heroGrid}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 z-0 h-[300px] w-[min(820px,100vw)] -translate-x-1/2 object-fill opacity-65 mix-blend-screen"
      />

      <div className="relative z-20">
        <SiteNavbar />
      </div>
      <Link
        to="/"
        aria-label="Back to home"
        className="absolute top-[62.2%] left-[3.45%] z-10 h-[9.1%] w-[19.6%] rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#100d1d] focus-visible:outline-none"
      >
        <span className="sr-only">Back To Home</span>
      </Link>
    </main>
  );
}
