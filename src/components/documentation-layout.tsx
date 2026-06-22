import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import heroGrid from "../../assets/GRID.png";
import previewVector from "../../assets/Vector.png";
import { useEffect, useState } from "react";

interface DocSection {
  title: string;
  items: Array<{
    label: string;
    prefix?: string;
    href: string;
    active?: boolean;
  }>;
}

interface DocumentationLayoutProps {
  children: React.ReactNode;
  sections: DocSection[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
  version?: string;
  lastUpdated?: string;
}

export function DocumentationLayout({
  children,
  sections,
  eyebrow = "DOCUMENTATION",
  title,
  subtitle,
  version = "v1.0.0",
  lastUpdated = "June 19, 2026",
}: DocumentationLayoutProps) {
  const [activeHref, setActiveHref] = useState<string>("");

  useEffect(() => {
    // Get all section hrefs
    const allHrefs = sections.flatMap((section) => section.items.map((item) => item.href));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for navbar

      // Find the section that's currently in view
      for (const href of allHrefs) {
        const element = document.querySelector(href);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;

          if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
            setActiveHref(href);
            return;
          }
        }
      }

      // If no section is in view, default to the first one
      if (allHrefs.length > 0) {
        setActiveHref(allHrefs[0]);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Update sections with active state
  const sectionsWithActive = sections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      active: item.href === activeHref,
    })),
  }));

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Fixed Background Effects */}
      <div className="pointer-events-none fixed top-[-56px] left-1/2 z-0 h-[390px] w-[min(780px,100vw)] -translate-x-1/2 rounded-[780px] bg-[#8f43dd] opacity-75 blur-[190px]" />
      <img
        src={heroGrid}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 z-0 h-[300px] w-[min(820px,100vw)] -translate-x-1/2 object-fill opacity-65 mix-blend-screen"
      />
      <img
        src={previewVector}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed right-[-18%] bottom-[-48px] left-[-18%] z-0 h-[540px] w-[136%] max-w-none object-fill opacity-80"
      />

      {/* Navbar */}
      <div className="relative z-10">
        <SiteNavbar />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-[88px] h-[calc(100vh-88px)] w-[280px] border-r border-white/12 bg-[#0c0c12]/50 backdrop-blur-sm">
          <div className="flex h-full flex-col">
            {/* On This Page Label */}
            <div className="px-6 pt-8 pb-4">
              <span className="text-xs font-medium uppercase tracking-wider text-[#71717a]">
                On This Page
              </span>
            </div>

            {/* Scrollable Navigation */}
            <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
              <nav className="space-y-6">
                {sectionsWithActive.map((section, sectionIndex) => (
                  <div key={section.title}>
                    {/* Section Header */}
                    <h3 className="mb-3 px-2 text-sm font-semibold text-[#fafafa]">
                      {section.title}
                    </h3>
                    {/* Section Items */}
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className={`group flex items-center px-2 py-1.5 text-sm transition-colors ${
                              item.active
                                ? "border-l-2 border-[#a855f7] bg-white/5 text-[#a855f7]"
                                : "border-l-2 border-transparent text-[#a1a1aa] hover:text-[#e4e4e7] hover:bg-white/3"
                            }`}
                          >
                            {item.prefix && (
                              <span className="mr-2 font-mono text-[#71717a] group-hover:text-[#a1a1aa]">
                                {item.prefix}
                              </span>
                            )}
                            <span className="font-medium">{item.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>

            {/* Divider */}
            <div className="mx-4 my-4 border-t border-white/10" />

            {/* Utility Links */}
            <div className="px-4 pb-6 space-y-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#a1a1aa] transition-colors hover:text-[#e4e4e7]"
              >
                <ExternalLink className="h-4 w-4" />
                <span>View on GitHub</span>
              </a>
              <a
                href="/support"
                className="block text-sm text-[#a1a1aa] transition-colors hover:text-[#e4e4e7]"
              >
                Get Support
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-[280px] flex-1 pt-[88px]">
          <div className="mx-auto max-w-4xl px-8 py-12">
            {/* Header Block */}
            <div className="mb-8">
              {/* Eyebrow */}
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#a855f7]">
                {eyebrow}
              </p>
              {/* Title */}
              <h1 className="mb-3 text-4xl font-bold text-[#fafafa] font-mono">{title}</h1>
              {/* Subtitle */}
              {subtitle && <p className="mb-4 text-base text-[#a1a1aa]">{subtitle}</p>}
              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-[#71717a]">
                <span>{version}</span>
                <span>•</span>
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="mb-8 border-t border-white/10" />

            {/* Body Content */}
            <div className="prose prose-invert max-w-none">{children}</div>
          </div>
          <SiteFooter />
        </main>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
