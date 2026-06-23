import footerLogo from "../../assets/logo.png";
import { cn } from "@/lib/utils";

const footerLinks = [
  {
    title: "PRODUCT",
    links: [
      { label: "Features", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "Docs", href: "/docs" },
      { label: "API", href: "/docs" },
      { label: "Changelog", href: "/docs" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Blog", href: "/docs" },
      { label: "Tutorial", href: "/docs" },
      { label: "Community", href: "/docs" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms Of Service", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
];

export function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer
      className={cn("font-body relative bg-[#13081f] px-6 font-normal text-[#efe8ff]", className)}
    >
      <div className="pt-10 pb-8 md:pt-12">
        <div className="rounded-lg border border-[#5f4a82] bg-[#07050d]/55 px-6 py-14 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:px-10">
          <h2 className="text-3xl leading-tight font-normal text-white md:text-4xl">
            Ready to scan your first target?
          </h2>
          <p className="mt-2 text-sm font-normal text-[#cfc4de]">
            Start a vulnerability assessment in under 60 seconds.
          </p>
          <button
            type="button"
            className="mt-6 rounded-full border border-[#f97316]/70 bg-black px-9 py-3 text-sm font-normal text-white shadow-[0_0_28px_rgba(249,115,22,0.26)] transition hover:scale-[1.03] hover:border-[#c084fc] focus-visible:ring-2 focus-visible:ring-[#c084fc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13081f] focus-visible:outline-none"
            onClick={() => window.open("https://cybersec1.tech", "_blank")}
          >
            Start Scanning
          </button>
        </div>

        <div className="pointer-events-none mx-auto my-10 h-px max-w-[90%] bg-gradient-to-r from-transparent via-[#3d2959] to-transparent" />

        <div className="grid gap-10 border-b border-[#3d2959] py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:gap-8 md:py-14">
          <div className="max-w-[280px]">
            <img src={footerLogo} alt="CyberSec" className="h-auto w-60 object-contain" />
            <p className="mt-5 text-sm leading-relaxed font-normal text-[#bdb0cf]">
              Cybersec-CLI helps teams uncover vulnerabilities faster with AI-powered scanning.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="border-[#322344] md:border-l md:pl-12">
              <h3 className="text-sm font-normal text-white">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-normal text-[#c6bad5] transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-11">
          <p className="mb-3 text-sm font-normal text-[#c6bad5]">Get security tips & updates.</p>
          <form
            className="flex max-w-none overflow-hidden rounded-full bg-[#352541]"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              aria-label="Email address"
              placeholder="Email Address"
              className="min-w-0 flex-1 px-6 py-4 text-sm font-normal text-white placeholder:text-[#8f839c]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[#c7a6ff] px-8 py-4 text-sm font-normal text-[#160a24] transition hover:bg-white focus-visible:ring-2 focus-visible:ring-[#c084fc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13081f] focus-visible:outline-none"
            >
              Join Now
            </button>
          </form>
        </div>

        <div className="border-t border-[#3d2959] pt-8 text-center">
          <p className="text-sm leading-relaxed font-normal text-[#8f839c]">
            &copy; 2026 - Cybersec CLI
            <br />
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
