import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import navbarLogo from "../../assets/logo.png";

function Logo({ className = "" }: { className?: string }) {
  return <img src={navbarLogo} alt="CyberSec" className={`h-auto object-contain ${className}`} />;
}

export function SiteNavbar({ small = false }: { small?: boolean }) {
  const location = useLocation();
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Pricing", path: "/pricing" },
    { label: "Docs", path: "/docs" },
    { label: "Product", path: "/product" },
  ];
  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => location.pathname === item.path),
  );
  const [indicatorIndex, setIndicatorIndex] = useState(activeIndex);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIndicatorIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`grid grid-cols-[1fr_auto_1fr] items-center ${small ? "px-6 pt-[40px] pb-[60px]" : "px-8 pt-[40px] pb-[60px]"}`}
      >
        <div className="pl-[78px]">
          <a href="/" aria-label="CyberSec home">
            <Logo className={small ? "w-56" : "w-64"} />
          </a>
        </div>
        <nav className="relative grid grid-cols-4 items-center justify-self-center overflow-hidden rounded-full border border-white/12 bg-[#7d61aa]/58 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md">
          <div
            className="absolute top-2 bottom-2 left-2 rounded-full border border-white/20 bg-[#000000] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: "calc((100% - 16px) / 4)",
              transform: `translateX(${indicatorIndex * 100}%)`,
            }}
          />
          {navItems.map((item, index) =>
            item.label === "Product" ? (
              <a
                key={item.label}
                href="https://cybersec1.tech"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-body relative z-10 min-w-[98px] rounded-full px-8 py-3 text-center text-sm font-medium transition-colors duration-300 ${
                  indicatorIndex === index
                    ? "text-[#ffffff]"
                    : "text-[#ded5ed] hover:bg-white/8 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                className={`font-body relative z-10 min-w-[98px] rounded-full px-8 py-3 text-center text-sm font-medium transition-colors duration-300 ${
                  indicatorIndex === index
                    ? "text-[#ffffff]"
                    : "text-[#ded5ed] hover:bg-white/8 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center justify-end gap-5 pr-[42px]">
          <Link
            to="/auth/login"
            className="font-body flex h-14 min-w-[150px] items-center justify-center rounded-full border border-white/70 bg-black/70 px-8 text-base font-normal text-[#e8e3ec] transition hover:border-white hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
          >
            Sign Up
          </Link>
          <Link
            to="/auth/login"
            className="font-body flex h-14 min-w-[160px] items-center justify-center rounded-full border border-white/45 bg-gradient-to-b from-[#f4efff] to-[#b7b1bd] px-8 text-base font-normal text-[#151019] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] transition hover:scale-[1.02] hover:from-white hover:to-[#cbc5d1] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
