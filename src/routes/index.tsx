import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import {
  Crosshair,
  MapPin,
  IdCard,
  Search,
  Network,
  Wifi,
  Globe,
  Lock,
  Route as RouteIcon,
  Server,
  FileText,
  ShieldCheck,
  Zap,
  FileBarChart,
  LayoutDashboard,
  ListChecks,
  CheckCheck,
  Play,
  X,
  ArrowRight,
} from "lucide-react";
import heroGrid from "../../assets/GRID.png";
import previewVector from "../../assets/Vector.png";
import playIcon from "../../assets/play icon.png";
import ptIcon from "../../assets/pt.png";
import vsIcon from "../../assets/vs.png";
import srIcon from "../../assets/sr.png";
import allIcon from "../../assets/all.png";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CyberSec" },
      {
        name: "description",
        content:
          "Async vulnerability scanning with live AI analysis built for security professionals who don't wait for batch reports.",
      },
    ],
  }),
});

const marqueeServices = [
  { label: "Port Scanner", Icon: Network },
  { label: "Web App Scanner", Icon: ShieldCheck },
  { label: "DNS Lookup", Icon: Globe },
  { label: "WHOIS", Icon: Server },
  { label: "Ping", Icon: Zap },
  { label: "Traceroute", Icon: RouteIcon },
  { label: "SSL Check", Icon: Lock },
  { label: "HTTP Headers", Icon: FileText },
  { label: "Subdomains", Icon: Search },
  { label: "GeoIP", Icon: MapPin },
];

function HeroPreview() {
  const [typedTarget, setTypedTarget] = useState("");
  const [typedLiveScan, setTypedLiveScan] = useState("");
  const [visibleLines, setVisibleLines] = useState(0);
  const [statusFill, setStatusFill] = useState(false);

  const targetText = "example.com";
  const liveScanText = "LIVE SCAN IN PROGRESS...";
  const terminalLines = [
    "14:32:11  > Initializing async engine...",
    "14:32:11  > Target received: example.com (93.184.216.34)",
    "14:32:13  > Querying nameserver.probes...",
    "14:32:14  > DNS resolution started",
    "14:32:18  > WHOIS lookup initiated",
    "14:32:21  > Port scan running (1000 ports)",
    "14:32:24  >   22/tcp   = open    (ssh)",
    "14:32:24  >   80/tcp   = open    (http)",
    "14:32:24  >   443/tcp  = open    (https)",
    "14:32:36  > SSL/TLS analysis in progress...",
    "14:32:14  > TLS 1.0 detected → deprecated",
    "14:32:14  > Weak cipher suites identified",
    "14:32:39  > Subdomain enumeration started",
    "14:32:39  > Found: api.example.com",
    "14:32:39  > Found: dev.example.com",
    "14:32:14  > Vulnerability scan running...",
    "14:32:14  > CVE-2349-2034 detected (CVSS 9.8)",
    "14:32:14  > CVE-1023-4892s detected (CVSS 7.5)",
    "14:32:15  > Mapping to MITRE ATT&CK...",
    "14:32:17  > T1190 → Exploit Public-Facing Application",
    "14:32:17  > T1068 → Privilege Escalation",
  ];

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    const typeString = (
      text: string,
      setter: (value: string) => void,
      speed: number,
      onComplete?: () => void,
    ) => {
      let index = 0;

      const tick = () => {
        if (index <= text.length) {
          setter(text.slice(0, index));
          index += 1;
          timers.push(setTimeout(tick, speed));
        } else {
          onComplete?.();
        }
      };

      tick();
    };

    typeString(targetText, setTypedTarget, 100, () => {
      timers.push(
        setTimeout(() => {
          typeString(liveScanText, setTypedLiveScan, 50, () => setVisibleLines(1));
        }, 250),
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!visibleLines) return;

    if (visibleLines < terminalLines.length) {
      const timer = setTimeout(() => setVisibleLines((prev) => prev + 1), 120);
      return () => clearTimeout(timer);
    }

    const fillTimer = setTimeout(() => setStatusFill(true), 400);
    return () => clearTimeout(fillTimer);
  }, [visibleLines, terminalLines.length]);

  const summaryItems = useMemo(
    () => [
      { title: "Attack Surface Score", target: 72, tag: "High" },
      { title: "Critical Issues", target: 3 },
      { title: "High Issues", target: 12 },
      { title: "Medium Issues", target: 25 },
      { title: "Low Issues", target: 43 },
      { title: "Information", target: 18 },
    ],
    [],
  );

  const [summaryCounts, setSummaryCounts] = useState<number[]>(() => summaryItems.map(() => 0));

  useEffect(() => {
    if (!statusFill) return;

    const timers: Array<ReturnType<typeof setTimeout>> = [];
    summaryItems.forEach((item, index) => {
      const duration = 700 + (index % 3) * 120;
      const steps = Math.max(10, Math.round(duration / 40));
      const increment = Math.max(1, Math.ceil(item.target / steps));
      let current = 0;

      const tick = () => {
        current = Math.min(item.target, current + increment);
        setSummaryCounts((prev) => {
          const next = [...prev];
          next[index] = current;
          return next;
        });

        if (current < item.target) {
          timers.push(setTimeout(tick, duration / steps));
        }
      };

      timers.push(setTimeout(tick, 300 + index * 90));
    });

    return () => timers.forEach(clearTimeout);
  }, [statusFill, summaryItems]);

  const services = [
    { icon: Crosshair, label: "Unified Scan", pct: 100 },
    { icon: MapPin, label: "Geo IP", pct: 100 },
    { icon: IdCard, label: "WHOIS", pct: 70 },
    { icon: Search, label: "Subdomain", pct: 100 },
    { icon: Network, label: "Port Scanner", pct: 100 },
    { icon: Wifi, label: "Ping", pct: 100 },
    { icon: RouteIcon, label: "Traceroute", pct: 100 },
    { icon: FileText, label: "HTTP Headers", pct: 100 },
    { icon: ShieldCheck, label: "SSL Check", pct: 100 },
    { icon: LayoutDashboard, label: "Web App Scanner", pct: 60 },
  ].map((service, index) => ({
    ...service,
    delay: 80 + index * 40,
    duration: 650 + (index % 4) * 120,
  }));

  const sidebar = [
    { icon: Crosshair, label: "Unified Scan", active: true },
    { icon: MapPin, label: "Geo IP" },
    { icon: IdCard, label: "WHOIS" },
    { icon: Search, label: "Subdomains" },
    { icon: Network, label: "Port Scanner" },
    { icon: Wifi, label: "Ping" },
    { icon: RouteIcon, label: "Traceroute" },
    { icon: FileText, label: "HTTP Headers" },
    { icon: ShieldCheck, label: "SSL Check" },
  ];

  return (
    <div
      className="relative mx-auto mt-16 max-w-[1100px] overflow-hidden rounded-2xl border border-[#8B5CF6]/70 bg-[#10081d]/90 p-4 backdrop-blur"
      style={{
        boxShadow:
          "0 -10px 34px rgba(168, 85, 247, 0.45), 0 24px 90px rgba(0, 0, 0, 0.68), 0 0 120px rgba(139, 92, 246, 0.22)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#A855F7]/45 to-transparent" />
      <div className="mt-2 flex gap-4 px-2 pb-4">
        {/* Sidebar */}
        <div className="flex w-56 flex-col gap-2">
          {sidebar.map((s) => (
            <button
              key={s.label}
              className={`flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs transition ${
                s.active
                  ? "border-[#A855F7] bg-[#A855F7]/12 text-[#EFE8FF]"
                  : "border-[#8B5CF6]/35 bg-[#08050f]/45 text-[#c7b8ea] hover:border-[#A855F7]/70"
              }`}
            >
              <s.icon className="h-3.5 w-3.5 text-[#C084FC]" />
              {s.label}
            </button>
          ))}
        </div>

        {/* Main panel */}
        <div className="flex-1">
          <div className="text-[10px] font-semibold tracking-wider text-[#b7a3e8]">
            TARGET(IP, DOMAIN OR CIDR)
          </div>
          <div className="mt-2 flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-[#8B5CF6]/35 bg-black/75 px-4 py-2">
              <span className="flex-1 text-xs text-foreground">
                {typedTarget}
                <span className="text-primary">
                  {typedTarget.length < targetText.length ? "|" : ""}
                </span>
              </span>
              <X className="h-3.5 w-3.5 text-destructive" />
            </div>
            <div className="flex-1 rounded-full border border-[#8B5CF6]/35 bg-black/75 px-4 py-2" />
          </div>

          <div className="mt-4 grid grid-cols-[1.2fr_0.7fr_1fr] gap-4 rounded-xl border border-[#8B5CF6]/40 bg-black/90 p-4">
            {/* Terminal */}
            <div className="font-mono text-[9px] leading-relaxed text-[oklch(0.85_0.25_145)]">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.25_145)]" />
                <span className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-[0.15em] uppercase text-foreground">
                  {typedLiveScan}
                  {typedLiveScan.length < liveScanText.length ? (
                    <span className="animate-pulse">|</span>
                  ) : null}
                </span>
              </div>
              {terminalLines.slice(0, visibleLines).map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>

            {/* Services */}
            <div>
              <div className="mb-2 text-[10px] font-semibold tracking-wider text-[#b7a3e8]">
                SERVICES
              </div>
              <div className="space-y-2">
                {services.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-1.5 text-[10px] text-[#e9ddff]"
                  >
                    <s.icon className="h-3 w-3 text-[#C084FC]" />
                    {s.label}
                  </div>
                ))}
                <div className="flex items-center gap-1.5 pt-1 text-[10px] text-[oklch(0.85_0.25_145)]">
                  <CheckCheck className="h-3 w-3" /> Overall Progress
                </div>
              </div>
            </div>

            {/* Status bars */}
            <div>
              <div className="mb-2 text-[10px] font-semibold tracking-wider text-[#b7a3e8]">
                STATUS
              </div>
              <div className="space-y-2">
                {services.map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#08050f]">
                      <div
                        className="h-full rounded-full bg-[oklch(0.85_0.25_145)] transition-all ease-out"
                        style={{
                          width: statusFill ? `${s.pct}%` : "0%",
                          transitionDuration: `${s.duration}ms`,
                          transitionDelay: `${statusFill ? s.delay : 0}ms`,
                        }}
                      />
                    </div>
                    <span className="w-8 text-right text-[9px] text-muted-foreground">
                      {statusFill ? `${s.pct} %` : "0 %"}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-1">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#08050f]">
                    <div
                      className="h-full rounded-full bg-foreground transition-all duration-700 ease-out"
                      style={{ width: statusFill ? "75%" : "0%" }}
                    />
                  </div>
                  <span className="w-8 text-right text-[9px] text-muted-foreground">
                    {statusFill ? "75 %" : "0 %"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scan summary */}
          <div className="mt-4 text-[10px] font-semibold tracking-wider text-[#b7a3e8]">
            SCAN SUMMARY
          </div>
          <div className="mt-2 grid grid-cols-6 gap-2">
            {summaryItems.map((item, index) => (
              <SummaryCard
                key={item.title}
                title={item.title}
                big={String(summaryCounts[index])}
                tag={item.tag}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, big, tag }: { title: string; big: string; tag?: string }) {
  const accent =
    title === "Critical Issues"
      ? "from-[#ef4444]/55 via-[#ef4444]/20"
      : title === "High Issues"
        ? "from-[#f59e0b]/55 via-[#f59e0b]/20"
        : title === "Medium Issues"
          ? "from-[#eab308]/55 via-[#eab308]/20"
          : title === "Low Issues"
            ? "from-[#22c55e]/55 via-[#22c55e]/20"
            : "from-[#A855F7]/45 via-[#A855F7]/16";

  return (
    <div className="rounded-lg border border-[#8B5CF6]/35 bg-black/90 p-2.5">
      <div className="font-body text-[9px] text-[#b7a3e8]">{title}</div>
      <div className="mt-1 flex items-end justify-between">
        <div className="font-heading text-2xl font-bold text-foreground">{big}</div>
        {tag && <div className="font-body text-[9px] text-[#fb7185]">{tag}</div>}
      </div>
      <div className={`mt-1 h-6 w-full bg-gradient-to-r ${accent} to-transparent`} />
    </div>
  );
}

function FeatureCard({
  Icon,
  title,
  desc,
  image,
}: {
  Icon?: typeof Crosshair;
  title: string;
  desc: string;
  image?: string;
}) {
  return (
    <div className="flex min-h-[138px] items-center gap-4 rounded-[20px] border border-[#5f4a82] bg-[#25193E] px-12 py-14 shadow-[0_22px_70px_rgba(0,0,0,0.24)] md:gap-5">
      {image ? (
        <img src={image} alt="" className="h-[80px] w-[80px] shrink-0 md:h-[80px] md:w-[80px]" />
      ) : Icon ? (
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#dbc5ff] via-[#ae7aff] to-[#9b48f4] shadow-[0_12px_22px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.45)] md:h-[58px] md:w-[58px]">
          <Icon className="h-5 w-5 text-[#13091f] md:h-6 md:w-6" />
        </div>
      ) : null}
      <div>
        <h3 className="font-heading text-lg leading-tight font-medium text-[#f8f5ff]">{title}</h3>
        <p className="font-body mt-2 max-w-[300px] text-sm leading-snug text-[#d4cde3]">{desc}</p>
      </div>
    </div>
  );
}

function Step({
  num,
  title,
  desc,
  Icon,
}: {
  num: string;
  title: string;
  desc: string;
  Icon: typeof Crosshair;
}) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div
        className="font-heading select-none text-[116px] font-black leading-none text-[#7f6aa5]/35 md:text-[140px]"
        style={{
          textShadow: "0 18px 42px rgba(0,0,0,0.34)",
        }}
      >
        {num}
      </div>
      <div className="-mt-10 flex h-[94px] w-[94px] items-center justify-center rounded-full border-2 border-[#f7f0ff] bg-[#180d29]/70 shadow-[0_22px_54px_rgba(0,0,0,0.38)] backdrop-blur md:h-[108px] md:w-[108px]">
        <Icon className="h-8 w-8 text-[#b993ff]" />
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="font-heading text-4xl leading-none font-bold text-[#f8f5ff]">{num}</span>
        <span className="font-body text-sm text-[#d4cde3]">{title}</span>
      </div>
      <p className="font-body mt-2 max-w-[150px] text-[11px] leading-tight text-[#bcb2cd]">
        {desc}
      </p>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <style>{`
        .scan-cta-gradient::before {
          content: "";
          position: absolute;
          inset: -80%;
          z-index: 0;
          background: conic-gradient(from 180deg, #8B5CF6 0%, #8B5CF6E6 8%, #8B5CF61A 20%, #F9731621 34%, #F97316 50%, #F97316B3 62%, #8B5CF61A 78%, #8B5CF6 100%);
          will-change: transform;
        }

        .scan-cta-gradient:hover::before {
          animation: scan-cta-gradient-spin 1.8s linear 1;
        }

        .scan-cta-glow::before {
          content: "";
          position: absolute;
          inset: -10px;
          z-index: 0;
          border-radius: inherit;
          background: conic-gradient(from 180deg, #8B5CF6 0%, #8B5CF6E6 8%, #8B5CF61A 20%, #F9731621 34%, #F97316 50%, #F97316B3 62%, #8B5CF61A 78%, #8B5CF6 100%);
          filter: blur(14px);
          opacity: 0.42;
          will-change: transform;
        }

        @keyframes scan-cta-gradient-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .post-strip-background {
          background:
            radial-gradient(ellipse 42% 18% at 50% 56%, rgba(117, 55, 189, 0.22), transparent 72%),
            linear-gradient(180deg, #0e0718 0%, #14091f 38%, #170b28 70%, #10061c 100%);
        }
      `}</style>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-[160px]">
        <div className="pointer-events-none absolute top-[-56px] left-1/2 z-0 h-[390px] w-[min(780px,100vw)] -translate-x-1/2 rounded-[780px] bg-[#8f43dd] opacity-75 blur-[190px]" />
        <img
          src={heroGrid}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 z-0 h-[300px] w-[min(820px,100vw)] -translate-x-1/2 object-fill opacity-65 mix-blend-screen"
        />
        <div className="relative z-10">
          <SiteNavbar />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-14 text-center md:pt-16">
          <h1 className="font-heading text-4xl leading-tight font-medium tracking-normal whitespace-nowrap md:text-[70px]">
            Scan. Analyze. Understand.
          </h1>
          <p className="font-body mx-auto mt-2.5 max-w-[520px] text-lg leading-relaxed text-[#d7d0df]">
            Async vulnerability scanning with live AI analysis built for security professionals who
            don't wait for batch reports.
          </p>
          <div className="mt-5 flex items-center justify-center gap-5">
            <div className="scan-cta-glow relative inline-block rounded-full">
              <div className="scan-cta-gradient relative z-10 inline-block overflow-hidden rounded-full p-[1.5px]">
                <button
                  className="relative z-10 cursor-pointer rounded-full px-12 py-4 text-base font-medium text-[#efe9f8] transition-all duration-200 hover:scale-[1.03] hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                  style={{
                    borderRadius: "40px",
                    border: "none",
                    background: "#0a0810",
                  }}
                  onClick={() => window.open("https://cybersec1.tech", "_blank")}
                >
                  Start Scanning
                </button>
              </div>
            </div>
            <button
              className="flex cursor-pointer items-center justify-center gap-2 px-10 py-4 text-base font-medium text-background transition-all duration-200 hover:scale-[1.03] hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              style={{
                borderRadius: "40px",
                border: "1px solid #FFF",
                background: "linear-gradient(180deg, #EFE8FF 0%, #999 125.6%)",
              }}
            >
              <img src={playIcon} alt="" className="h-7 w-7" /> Watch It Work
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-0">
          <img
            src={previewVector}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-[20px] left-1/2 -z-10 h-[430px] w-screen max-w-none -translate-x-1/2 object-fill opacity-100"
          />
          <HeroPreview />
        </div>

        {/* Marquee */}
        <div className="relative z-10 mt-[96px] overflow-hidden border-y border-border/40 bg-[#000000] py-3">
          <div
            className="flex w-max gap-16 whitespace-nowrap text-xs text-[#ffffff]"
            style={{ "--gap": "4rem", animation: "marquee 60s linear infinite" } as CSSProperties}
          >
            {Array.from({ length: 2 }).map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-16" aria-hidden={groupIndex === 1}>
                {Array.from({ length: 8 }).map((_, itemIndex) => (
                  <span key={itemIndex}>From target to full report in under 60 seconds.</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="post-strip-background relative z-10">
          <div className="mx-auto max-w-[700px] pt-[160px] pb-[80px] text-center">
            <h1 className="font-heading text-4xl leading-tight font-medium tracking-normal whitespace-nowrap md:text-[70px]">
              Everything You Need,
              <br />
              <span className="bg-gradient-to-br from-primary to-white bg-clip-text text-transparent">
                In One Place
              </span>
            </h1>
            <p className="mt-4 text-[16px] text-[#ffffff] font-body">
              Powerful tools to find vulnerabilities, save time and
              <br />
              secure what matters
            </p>
          </div>
        </div>
      </section>

      {/* Features + How it works */}
      <section className="post-strip-background relative overflow-hidden px-6 pt-[20px] pb-[140px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(168,85,247,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="grid gap-[16px] md:grid-cols-2">
            <FeatureCard
              image={ptIcon}
              title="Port Scanner"
              desc="Discover open ports and services with fast, accurate scanning."
            />
            <FeatureCard
              image={vsIcon}
              title="Vulnerability Scanner"
              desc="Detect security flaws in web apps and known vulnerabilities."
            />
            <FeatureCard
              image={srIcon}
              title="Smart Report"
              desc="Get detailed, easy to understand reports with risk ratings."
            />
            <FeatureCard
              image={allIcon}
              title="All-in-one Dashboard"
              desc="Run multiple scans, track results and manage everything in one place."
            />
          </div>

          <div className="mt-[64px] flex justify-center">
            <div className="rounded-full bg-black px-7 py-2 text-xs text-[#d7d0df] shadow-[0_0_42px_rgba(168,85,247,0.72)]">
              How it works
            </div>
          </div>

          <div className="mt-[48px] grid grid-cols-1 items-start gap-[48px] md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-[48px]">
            <Step
              num="01"
              title="Add Target"
              desc="Enter your target URL or IP address"
              Icon={Crosshair}
            />
            <ArrowRight className="hidden h-8 w-8 self-center text-[#f8f5ff] md:block" />
            <Step
              num="02"
              title="Choose Scans"
              desc="Select the scan you want to run."
              Icon={ListChecks}
            />
            <ArrowRight className="hidden h-8 w-8 self-center text-[#f8f5ff] md:block" />
            <Step
              num="03"
              title="Get Results"
              desc="View results instantly & export results."
              Icon={CheckCheck}
            />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
