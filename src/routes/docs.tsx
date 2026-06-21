import { createFileRoute } from "@tanstack/react-router";
import { DocumentationLayout } from "@/components/documentation-layout";

export const Route = createFileRoute("/docs")({
  component: Docs,
  head: () => ({
    meta: [
      { title: "CyberSec - Documentation" },
      {
        name: "description",
        content: "Comprehensive documentation for CyberSec vulnerability scanning platform.",
      },
    ],
  }),
});

function Docs() {
  const sections = [
    {
      title: "Guidelines",
      items: [{ label: "Responsible Use", href: "#responsible-use", active: true }],
    },
    {
      title: "Overview",
      items: [
        { label: "Getting Around", href: "#getting-around" },
        { label: "Quick Reference", href: "#quick-reference" },
      ],
    },
    {
      title: "Tools",
      items: [
        { label: "Unified Scan", href: "#unified-scan", prefix: "1" },
        { label: "Geo IP", href: "#geo-ip", prefix: "2" },
        { label: "WHOIS", href: "#whois", prefix: "3" },
        { label: "Subdomains", href: "#subdomains", prefix: "4" },
        { label: "Port Scanner", href: "#port-scanner", prefix: "5" },
        { label: "OS Fingerprinting", href: "#os-fingerprinting", prefix: "6" },
        { label: "Ping", href: "#ping", prefix: "7" },
        { label: "Traceroute", href: "#traceroute", prefix: "8" },
        { label: "HTTP Headers", href: "#http-headers", prefix: "9" },
        { label: "SSL Check", href: "#ssl-check", prefix: "10" },
        { label: "Web App Scanner", href: "#web-app-scanner", prefix: "11" },
        { label: "AI Executive Report", href: "#ai-executive-report", prefix: "12" },
      ],
    },
    {
      title: "FAQ",
      items: [
        { label: "General", href: "#faq-general", prefix: "G" },
        { label: "Geo IP", href: "#faq-geo-ip", prefix: "G" },
        { label: "WHOIS", href: "#faq-whois", prefix: "W" },
        { label: "Subdomains", href: "#faq-subdomains", prefix: "S" },
        { label: "Port Scanner", href: "#faq-port-scanner", prefix: "P" },
        { label: "OS Fingerprinting", href: "#faq-os-fingerprinting", prefix: "O" },
        { label: "Ping", href: "#faq-ping", prefix: "P" },
        { label: "Traceroute", href: "#faq-traceroute", prefix: "T" },
        { label: "HTTP Headers", href: "#faq-http-headers", prefix: "H" },
        { label: "SSL Check", href: "#faq-ssl-check", prefix: "S" },
        { label: "Web App Scanner", href: "#faq-web-app-scanner", prefix: "W" },
      ],
    },
  ];

  return (
    <DocumentationLayout
      sections={sections}
      title="CyberSec Toolkit - Web Interface Guide"
      subtitle="Complete guide to every tool available on the dashboard"
      version="v2.1.0"
      lastUpdated="June 19, 2026"
    >
      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4" id="responsible-use">
        A Note on Responsible Use
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        Every tool in this toolkit is built for testing systems you own, manage, or have explicit
        written permission to assess. Scanning, fingerprinting, or probing systems without
        authorization can be illegal even when no damage is done. When in doubt, don't scan it.
      </p>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="getting-around">
        Getting Around
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        The sidebar on the left lists every tool. Click any tool name to open it. Every tool follows
        the same basic pattern:
      </p>
      <ol className="space-y-3 text-[#a1a1aa] list-decimal list-inside mb-6">
        <li>
          <strong>Type your target</strong> into the input box at the top (an IP address, a domain
          name, or a URL, depending on the tool).
        </li>
        <li>
          <strong>Press Enter or click Run.</strong> A spinner shows while the scan is working.
        </li>
        <li>
          <strong>Read the results</strong> in the panel below. Most tools also let you{" "}
          <strong>export</strong> your results as PDF, JSON, or CSV, or copy a quick summary to
          share.
        </li>
      </ol>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        If a tool shows a red error message instead of results, double-check your input - most
        errors are caused by a typo, a missing <code>https://</code>, or a target that's unreachable
        from the internet (like a private home IP).
      </p>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="unified-scan">
        1. Unified Scan
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Runs multiple tools against one target in a single pass, so
        you get a broad picture without clicking through every tool individually.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>How to use it:</strong> Enter a domain or IP and run it like any other tool. This is
        the best starting point if you're not sure which specific tool you need yet.
      </p>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="geo-ip">
        2. Geo IP
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Tells you where an IP address or domain is
        physically/network-located - country, city, internet provider, and whether it's sitting
        behind a CDN (like Cloudflare) rather than a real origin server.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What to type in:</strong> A public IP address (<code>8.8.8.8</code>) or a hostname (
        <code>example.com</code>). Private IPs (like <code>192.168.x.x</code> or{" "}
        <code>127.0.0.1</code>) are blocked on purpose - they can't be looked up externally and
        would never give a meaningful result.
      </p>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a855f7] mb-3">
        Reading the results:
      </h3>
      <ul className="space-y-3 text-[#a1a1aa] mb-6">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Top summary</strong> - the IP it resolved to, whether the lookup is fresh or
            served from cache, and a one-line description like "resolves to 1.1.1.1 on Cloudflare
            edge infrastructure in United States."
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Location panel</strong> - country, region, city, postal code, coordinates, and a
            live embedded map. If a target has no public coordinates, the map area will say so
            instead of showing a blank map.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Network Information</strong> - ISP, organization name, ASN (the "network ID" an
            IP belongs to), and the domain tied to that ASN.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Security Information</strong> - whether the IP is a known CDN/proxy, whether it
            looks like shared hosting, and a confidence rating (<code>high</code>/
            <code>medium</code>/<code>low</code>) for how much you should trust the location data.
            CDN-fronted sites (most big websites) will show{" "}
            <strong>high confidence that the location is the edge node, not the real server</strong>{" "}
            - this is expected and explained in the infrastructure note.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>All Resolved IPs</strong> - if a domain resolves to multiple IPs (common for big
            sites), each one gets its own row with ASN, organization, city, and reverse DNS.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Export & Share</strong> - download the full result as JSON, or copy a one-line
            summary.
          </span>
        </li>
      </ul>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> Checking where a website is hosted, verifying if a suspicious
        email/login came from an unexpected country, or confirming a CDN is active.
      </p>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="whois">
        3. WHOIS
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Looks up domain or IP registration records - who registered
        it, when, with which registrar, and when it expires.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What to type in:</strong> A domain (<code>example.com</code>) or an IP address.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>Reading the results:</strong> Look for the registrar name, creation/expiration
        dates, and name servers. A domain that was registered very recently, or whose registration
        info is hidden behind a privacy service, isn't necessarily suspicious - but it's a signal
        worth weighing alongside other findings (for example, a brand-new domain claiming to be your
        bank).
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> Verifying domain ownership, checking how old a website is before
        trusting it, or investigating a suspicious link.
      </p>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="subdomains">
        4. Subdomains
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Discovers subdomains of a target domain (like{" "}
        <code>mail.</code>, <code>dev.</code>, <code>staging.</code>, <code>api.</code> in front of{" "}
        <code>example.com</code>) that are publicly reachable, and checks whether each one actually
        responds.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What to type in:</strong> A root domain (<code>example.com</code> - no{" "}
        <code>https://</code>, no <code>www.</code>).
      </p>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a855f7] mb-3">
        Reading the results:
      </h3>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        Results stream in live as the scan runs, so the counters at the top will keep climbing -
        this is normal, not an error.
      </p>
      <ul className="space-y-3 text-[#a1a1aa] mb-6">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Discovery Overview</strong> - a circular chart showing found vs. failed
            subdomains at a glance.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Enumerated Subdomains table</strong> - every candidate checked, whether it
            resolved, how fast its DNS responded, and which detection source found it.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Wildcard DNS</strong> warning - some domains are configured to "catch all"
            subdomains and resolve everything to the same IP, which can make every guess look like a
            hit. If wildcard DNS is detected, treat individual subdomain hits with extra caution.
          </span>
        </li>
      </ul>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> Mapping out a company's exposed infrastructure (e.g. forgotten
        staging servers) during a security review of your own domain.
      </p>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="port-scanner">
        5. Port Scanner
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Checks which network ports are open on a target and tries to
        identify what service (web server, database, SSH, etc.) is running on each one - plus flags
        any known vulnerabilities tied to outdated software it detects.
      </p>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a855f7] mb-3">
        What to type in:
      </h3>
      <ul className="space-y-3 text-[#a1a1aa] mb-6">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Target IP or domain</strong> - e.g. <code>192.168.1.1</code> or{" "}
            <code>example.com</code>.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Port range</strong> - choose one:
          </span>
        </li>
        <li className="flex items-start gap-3 ml-6">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <em>Common Ports</em> - the ~100 most frequently used ports (fastest, good default).
          </span>
        </li>
        <li className="flex items-start gap-3 ml-6">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <em>All Ports (1–65535)</em> - a full sweep (much slower, more thorough).
          </span>
        </li>
        <li className="flex items-start gap-3 ml-6">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <em>Custom Range</em> - type specific ports or ranges, e.g. <code>80,443,8080</code> or{" "}
            <code>1-1000</code>.
          </span>
        </li>
      </ul>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>Reading the results:</strong> Each open port gets a row showing the service name,
        detected version, and a risk badge. Click <strong>View Details</strong> on any row to see
        the full banner/version fingerprint and any CVE (known vulnerability) matches tied to that
        version.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> Auditing your own server's exposed services before deploying to
        production, or understanding what's publicly reachable on a machine you manage.
      </p>
      <div className="my-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
        <p className="text-sm text-yellow-200">
          ⚠️ Only scan systems you own or have explicit permission to test. Port scanning
          third-party systems without authorization may violate the law in your jurisdiction.
        </p>
      </div>

      <h2
        className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8"
        id="os-fingerprinting"
      >
        6. OS Fingerprinting
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Estimates the operating system running on a target machine by
        analyzing subtle network-level signals (TTL values, TCP behavior, open service banners) -
        without needing direct access to the machine.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What to type in:</strong> A hostname or IP, e.g. <code>scanme.nmap.org</code>.
      </p>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a855f7] mb-3">
        Reading the results:
      </h3>
      <ul className="space-y-3 text-[#a1a1aa] mb-6">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Top card</strong> - the most likely OS, a confidence percentage, and the
            detection quality (how reliable the signals were).
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>OS Probability Engine</strong> - if more than one OS is plausible, you'll see a
            ranked list with percentage likelihoods for each.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>Three tabs let you dig deeper:</span>
        </li>
        <li className="flex items-start gap-3 ml-6">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Fingerprinting & Identification</strong> - breaks down exactly which signals
            (TTL, banners, port behavior, TCP/IP stack) contributed to the guess.
          </span>
        </li>
        <li className="flex items-start gap-3 ml-6">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Security & Vulnerability Analysis</strong> - maps the detected OS to relevant
            attack techniques (MITRE ATT&CK) and flags any end-of-life software versions found.
          </span>
        </li>
        <li className="flex items-start gap-3 ml-6">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Service discovery & History</strong> - lists every open service found during the
            scan, with risk levels.
          </span>
        </li>
      </ul>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> Understanding what kind of system you're dealing with before
        deeper testing, or as a sanity check that a server is running the OS version you expect.
      </p>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="ping">
        7. Ping
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Sends repeated network "are you there?" requests to a target
        and measures how fast it answers, how consistent the response time is, and whether any
        requests get lost along the way.
      </p>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a855f7] mb-3">
        What to type in:
      </h3>
      <ul className="space-y-3 text-[#a1a1aa] mb-6">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Target</strong> - hostname or IP, e.g. <code>8.8.8.8</code>.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Packet count</strong> - how many pings to send (1–100, default 4).
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Live mode</strong> - toggle this on to keep pinging continuously every few
            seconds instead of running once. Useful for watching a connection over time (e.g. while
            troubleshooting a flaky network).
          </span>
        </li>
      </ul>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a855f7] mb-3">
        Reading the results:
      </h3>
      <ul className="space-y-3 text-[#a1a1aa] mb-6">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Avg / Min / Max latency</strong> - response time in milliseconds. Lower is
            better; under ~50ms is generally excellent for most uses.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Jitter</strong> - how much the response time varies between pings. High jitter
            can cause choppy video calls or laggy gaming even if average latency looks fine.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Packet loss</strong> - the percentage of pings that got no response at all. Any
            sustained loss above 1–2% usually points to a real network problem.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Live Latency Graph</strong> - a running chart of each ping's response time, with
            dropped packets marked in red.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Recommendations</strong> - plain-language notes on what the numbers mean and
            whether the connection looks suitable for things like video calls or gaming.
          </span>
        </li>
      </ul>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> Diagnosing a slow or unstable internet connection, or checking if
        a server is reachable and responsive.
      </p>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="traceroute">
        8. Traceroute
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Maps the path your traffic takes, hop by hop, to reach a
        target - showing every router along the way and how much delay each one adds.
      </p>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a855f7] mb-3">
        What to type in:
      </h3>
      <ul className="space-y-3 text-[#a1a1aa] mb-6">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Target</strong> - hostname or IP.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Max hops</strong> - the maximum number of hops to trace before giving up (1–64,
            default 30).
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Live mode</strong> - re-runs the trace periodically to watch for route changes
            over time.
          </span>
        </li>
      </ul>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a855f7] mb-3">
        Reading the results:
      </h3>
      <ul className="space-y-3 text-[#a1a1aa] mb-6">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Hop Visualization Timeline</strong> - each router along the path, with its IP,
            location (when known), response quality, and any latency spike flagged. Some hops may
            show "No ICMP response" - that's normal; some routers are configured not to reply, it
            doesn't mean the connection is broken.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Interactive Network Map</strong> - a visual plot of the route.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Hop Response Time Graph</strong> - a bar chart comparing delay at each hop, so
            you can spot exactly where slowdowns happen.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Route Risk</strong> and <strong>Routing Intelligence</strong> - flags unusual
            routing patterns, like traffic crossing international borders unexpectedly.
          </span>
        </li>
      </ul>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> Figuring out <em>where</em> in the network a slowdown is
        happening (your ISP, an intermediate network, or the destination itself), or spotting
        unexpected routing.
      </p>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="http-headers">
        9. HTTP Headers
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Fetches a website's HTTP response headers and grades its
        security posture - checking for missing protections, cookie security, caching behavior, and
        what technology stack it's running.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What to type in:</strong> A full URL, including <code>https://</code> (e.g.{" "}
        <code>https://example.com</code>).
      </p>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a855f7] mb-3">
        Reading the results:
      </h3>
      <ul className="space-y-3 text-[#a1a1aa] mb-6">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Header Security score</strong> (0–100) - a circular gauge showing how many
            recommended security headers are present vs. missing.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Security Header Matrix</strong> - every important security header
            (Content-Security-Policy, Strict-Transport-Security, etc.), whether it's present, and
            what it protects against if missing.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Cookie Security</strong> - checks whether cookies are flagged{" "}
            <code>Secure</code>, <code>HttpOnly</code>, and <code>SameSite</code> - missing flags
            here can expose sessions to theft.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Redirect Chain</strong> - if the URL redirects (e.g. HTTP → HTTPS → final page),
            every hop is shown.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Response Header Explorer</strong> - every raw header returned by the server,
            with a plain-language explanation of what it does.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          <span>
            <strong>Recommendations</strong> - concrete suggestions for headers to add or fix.
          </span>
        </li>
      </ul>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> Checking your own website's security hardening before launch, or
        understanding what a site is built on (CDN, WAF, server software).
      </p>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="ssl-check">
        10. SSL Check
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Inspects a domain's HTTPS/TLS certificate - who issued it,
        when it expires, and whether the connection is configured securely.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What to type in:</strong> A domain name (e.g. <code>example.com</code> - no{" "}
        <code>https://</code> needed).
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>Reading the results:</strong> Look at the certificate expiration date (renew well
        before it lapses), the issuing authority, and any warnings about weak protocols or
        configuration issues. A valid, properly configured certificate should show no critical
        warnings.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> Making sure your website's HTTPS certificate hasn't expired or
        isn't misconfigured, which browsers will otherwise flag to your visitors as "not secure."
      </p>

      <h2
        className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8"
        id="web-app-scanner"
      >
        11. Web App Scanner
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Runs a broader security check against an entire website
        rather than just one endpoint - looking for common web application weaknesses across the
        site.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What to type in:</strong> A full URL (e.g. <code>https://example.com</code>).
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>Reading the results:</strong> Findings are grouped by issue type and severity. Each
        finding typically explains what was detected, why it matters, and what to do about it.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> A general first-pass security review of a website you own before
        a deeper manual audit.
      </p>
      <div className="my-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
        <p className="text-sm text-yellow-200">
          ⚠️ Only scan websites you own or are authorized to test.
        </p>
      </div>

      <h2
        className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8"
        id="ai-executive-report"
      >
        12. AI Executive Report
      </h2>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>What it does:</strong> Generates a plain-English summary report pulling together
        findings from your other scans, written for a non-technical audience (e.g. to share with a
        manager or client).
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-4">
        <strong>How to use it:</strong> Open the <strong>Executive Report</strong> page and click
        generate - no target field is needed; it summarizes recent activity. Use this after running
        a few of the other tools so there's something to summarize.
      </p>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        <strong>Good for:</strong> Turning raw scan data into something you can hand off without
        needing to explain every technical term yourself.
      </p>

      <h2
        className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8"
        id="quick-reference"
      >
        Quick Reference Table
      </h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm text-[#a1a1aa]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 font-semibold text-[#fafafa]">Tool</th>
              <th className="text-left py-3 px-4 font-semibold text-[#fafafa]">What you type in</th>
              <th className="text-left py-3 px-4 font-semibold text-[#fafafa]">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">Unified Scan</td>
              <td className="py-3 px-4">domain or IP</td>
              <td className="py-3 px-4">Fast, broad overview</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">Geo IP</td>
              <td className="py-3 px-4">IP or domain</td>
              <td className="py-3 px-4">Where is this hosted?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">WHOIS</td>
              <td className="py-3 px-4">domain or IP</td>
              <td className="py-3 px-4">Who owns this?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">Subdomains</td>
              <td className="py-3 px-4">root domain</td>
              <td className="py-3 px-4">What's exposed under this domain?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">Port Scanner</td>
              <td className="py-3 px-4">IP/domain + port range</td>
              <td className="py-3 px-4">What services are running?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">OS Fingerprinting</td>
              <td className="py-3 px-4">IP or domain</td>
              <td className="py-3 px-4">What OS is this?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">Ping</td>
              <td className="py-3 px-4">IP or domain</td>
              <td className="py-3 px-4">Is it reachable? How fast?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">Traceroute</td>
              <td className="py-3 px-4">IP or domain</td>
              <td className="py-3 px-4">Where's the slowdown happening?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">HTTP Headers</td>
              <td className="py-3 px-4">full URL</td>
              <td className="py-3 px-4">Is this site's security hardened?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">SSL Check</td>
              <td className="py-3 px-4">domain</td>
              <td className="py-3 px-4">Is the HTTPS certificate healthy?</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 px-4">Web App Scanner</td>
              <td className="py-3 px-4">full URL</td>
              <td className="py-3 px-4">Broad website security check</td>
            </tr>
            <tr>
              <td className="py-3 px-4">AI Executive Report</td>
              <td className="py-3 px-4">(none - summarizes recent scans)</td>
              <td className="py-3 px-4">Non-technical summary</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="faq">
        Frequently Asked Questions
      </h2>

      <h3 className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="faq-general">
        General
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Do I need an account to use these tools?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            No. Open any tool from the sidebar, type in a target, and run it.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why did my scan return an error instead of results?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed mb-2">The most common causes:</p>
          <ul className="space-y-2 text-[#a1a1aa] list-disc list-inside ml-4">
            <li>
              A typo in the target (e.g. missing <code>https://</code> for HTTP Headers, SSL Check,
              or Web App Scanner, which all require a full URL).
            </li>
            <li>
              The target is unreachable from the public internet - this includes private IPs like{" "}
              <code>192.168.x.x</code>, <code>10.x.x.x</code>, or <code>127.0.0.1</code>. These are
              blocked on purpose (see below) rather than silently failing.
            </li>
            <li>The target's DNS doesn't resolve - double-check the spelling of the domain.</li>
            <li>
              The target is timing out or actively blocking automated requests (some servers
              rate-limit or firewall scanning traffic).
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why are private/local IP addresses blocked?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Tools like Geo IP send your target to external lookup services. Sending a private IP (
            <code>192.168.1.1</code>, <code>127.0.0.1</code>, link-local addresses, etc.) would leak
            internal network information to a third party and wouldn't return a meaningful result
            anyway, since those addresses aren't routable on the public internet. This block is
            intentional and can't be disabled from the interface.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Is it legal to scan a website with these tools?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Only scan systems you own or have explicit written permission to test. Unauthorized
            scanning, port probing, or fingerprinting of third-party systems can be illegal even if
            no damage occurs, depending on your jurisdiction. When in doubt, don't run it against a
            target you don't control.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Can I scan the same target repeatedly without being rate-limited?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Some tools (like Geo IP) cache results for a period of time, so repeating the exact same
            lookup quickly will return a cached result rather than re-querying external services.
            This is normal and is shown in the results as <code>Cached</code> vs. <code>Fresh</code>
            .
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why does my result say "Cached" instead of "Fresh"?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            It means the same target was already looked up recently and the tool is reusing that
            data instead of querying the provider again. This makes repeat lookups faster and avoids
            hitting external rate limits. Cached results automatically expire and refresh after a
            set period.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="faq-geo-ip">
        Geo IP
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why does the location shown not match where the website's content actually is?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Many websites sit behind a CDN like Cloudflare, Akamai, or Amazon CloudFront. Geo IP can
            only see the public-facing edge server that answered the request - not the origin server
            behind it. When this happens, the results page shows an infrastructure note and a{" "}
            <code>high</code> confidence label specifically meaning "we're confident this is an
            edge/proxy node," not that the location is necessarily where the actual content is
            hosted.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why are there multiple IPs listed for one domain?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Large sites often resolve to several IP addresses for load balancing or redundancy. Geo
            IP looks up every IP a domain resolves to and lists them all under "All Resolved IPs,"
            each with its own ASN, organization, and location.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            What does "confidence" mean in the results?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            It reflects how much the tool trusts the location/ownership data it found -{" "}
            <code>high</code> usually means strong signals were available (e.g. a recognized CDN or
            clear ASN/org match), while <code>low</code> or <code>medium</code> means the data is
            less certain or sparse.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Can I look up a hostname instead of an IP?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Yes - type a domain name and it will be resolved automatically before the lookup runs.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="faq-whois">
        WHOIS
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why does the registrant information say "Redacted" or "Privacy Service"?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Many domain registrars offer (or now require, by default) privacy protection that hides
            the real registrant's contact details behind a proxy service. This is extremely common
            and isn't itself a red flag.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Is a recently registered domain automatically suspicious?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Not automatically - many legitimate businesses launch new domains. But a brand-new
            domain combined with other red flags (impersonating a known brand, poor SSL setup,
            mismatched hosting location) is worth treating with extra caution.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="faq-subdomains">
        Subdomains
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why does the result count keep climbing while the scan is running?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Subdomain enumeration streams results live as they're found rather than waiting for the
            entire scan to finish. The counters and table update in real time - this is expected
            behavior, not a glitch.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            What is "Wildcard DNS" and why does it matter?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Some domains are configured to resolve <em>any</em> subdomain - even ones that don't
            really exist - to the same IP address. If wildcard DNS is detected, individual subdomain
            "hits" should be treated with more skepticism, since the domain may be resolving
            everything regardless of whether it's real.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why do some subdomains show as resolved but not "verified"?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            A subdomain can resolve in DNS (meaning it has an IP) without necessarily responding to
            an HTTP request or being a real, live service. "Verified" generally means both DNS
            resolution and a live HTTP response were confirmed.
          </p>
        </div>
      </div>

      <h3
        className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8"
        id="faq-port-scanner"
      >
        Port Scanner
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            What's the difference between "Common Ports" and "All Ports"?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Common Ports checks roughly the 100 most frequently used ports (web servers, databases,
            email, SSH, etc.) and finishes quickly. All Ports scans the full 1–65535 range, which is
            far more thorough but takes significantly longer.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            How do I scan specific ports only?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Choose "Custom Range" from the port dropdown, then enter ports as a comma-separated list
            (<code>80,443,8080</code>) or a range (<code>1-1000</code>), or a mix of both.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why does a port show as open but the service is "Unknown"?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            The port responded to a connection attempt, but the scanner couldn't confidently
            identify what software is running behind it - often because the service doesn't return
            an identifying banner, or it's using a non-standard protocol.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Is port scanning a target I don't own allowed?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            No. Only scan systems you own or have explicit permission to test.
          </p>
        </div>
      </div>

      <h3
        className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8"
        id="faq-os-fingerprinting"
      >
        OS Fingerprinting
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            How accurate is the OS guess?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            It's a probability estimate based on indirect network signals (TTL values, TCP/IP stack
            behavior, service banners) - not a guarantee. The confidence percentage and "detection
            quality" label indicate how strong the underlying signals were. Treat low-confidence
            results as a hint, not a fact.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why does it show multiple possible operating systems?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            When the network signals are ambiguous, several OS families can produce similar
            fingerprints. The "OS Probability Engine" lists each candidate with its relative
            likelihood so you can judge it yourself.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="faq-ping">
        Ping
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            What counts as "good" latency?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Generally: under ~20ms is excellent, under ~50ms is good for most everyday use
            (browsing, calls), 50–100ms is moderate, and above 100ms starts to feel noticeable for
            real-time activities like gaming or video calls. The tool labels this automatically as
            part of "Connection Quality."
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            What is "jitter" and why does it matter?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Jitter measures how much response times vary between consecutive pings. Even with good
            average latency, high jitter can cause choppy calls or stuttering in real-time
            applications because the timing is inconsistent rather than just slow.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why are some packets shown as "dropped"?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            A dropped packet means no response came back within the expected window. Occasional
            drops can happen on any network; sustained or frequent loss usually points to a real
            connectivity problem worth investigating.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            What does Live mode do, and will it run forever?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Live mode re-runs the ping check automatically every few seconds so you can watch a
            connection over time instead of running one-off checks. Turn it off by clicking the Live
            button again - it only runs while that toggle is on and the page is open.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="faq-traceroute">
        Traceroute
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why do some hops show "No ICMP response"?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Some routers are deliberately configured not to reply to traceroute probes for security
            or policy reasons. This is normal and doesn't necessarily mean that hop is broken - it
            just means it stays silent. The hop before and after it are usually enough to understand
            the path.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            What does "Route Changed" mean in Live mode?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            It means the path your traffic took to reach the target shifted between two consecutive
            trace runs - common with load-balanced or cloud-hosted infrastructure, and not
            necessarily a problem on its own.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why does the route cross international borders unexpectedly?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Internet routing doesn't always follow geographic logic - traffic can hop through
            another country's infrastructure even if both you and the destination are local,
            depending on how ISPs peer with each other. The tool flags this as a routing insight,
            not necessarily an error.
          </p>
        </div>
      </div>

      <h3
        className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8"
        id="faq-http-headers"
      >
        HTTP Headers
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            What does the security score actually measure?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            It reflects how many recommended security headers (like Content-Security-Policy or
            Strict-Transport-Security) are present on the response, out of the full set the tool
            checks for. It's a hardening signal, not a full vulnerability scan.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            My site is missing some headers - does that mean it's hackable?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Not directly. Missing security headers reduce a browser's built-in protections (like
            clickjacking or script-injection defenses) but aren't exploits by themselves. The
            Recommendations section explains what each missing header would add.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Why does the tool show cookies as "high risk"?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Usually because a cookie is missing the <code>Secure</code>, <code>HttpOnly</code>, or{" "}
            <code>SameSite</code> flag - meaning it could potentially be intercepted or accessed by
            malicious scripts more easily than a properly flagged cookie.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8" id="faq-ssl-check">
        SSL Check
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            What happens if my certificate is about to expire?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            The tool will flag the expiration date so you can renew in time. An expired certificate
            causes browsers to show visitors a "not secure" warning, which can scare away traffic -
            renew well before the expiration date shown.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Do I need to type "https://" for the SSL Check tool?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            No - just the domain name itself, e.g. <code>example.com</code>.
          </p>
        </div>
      </div>

      <h3
        className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8"
        id="faq-web-app-scanner"
      >
        Web App Scanner / AI Executive Report
      </h3>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            How is the Web App Scanner different from the Port Scanner?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            Port Scanner looks at network-level ports and services. Web App Scanner looks at the
            website application itself - checking for common web-layer issues across the whole site
            rather than just open ports.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Do I need to run other scans before using the AI Executive Report?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            It's most useful after you've already run a few scans, since it summarizes recent
            findings in plain language. Running it with no prior activity won't have much to
            summarize.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#a855f7] mb-2">
            Who is the Executive Report meant for?
          </h4>
          <p className="text-[#a1a1aa] leading-relaxed">
            It's written for a non-technical audience - useful for sharing a summary with a manager,
            client, or stakeholder who doesn't need the raw technical output.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#fafafa] font-mono mb-4 mt-8">Still stuck?</h3>
      <p className="text-[#a1a1aa] leading-relaxed mb-6">
        If a tool consistently fails on a target you're confident is correct and reachable, try a
        known-good target first (e.g. <code>8.8.8.8</code> or <code>example.com</code>) to confirm
        the tool itself is working, then compare what's different about your target.
      </p>
    </DocumentationLayout>
  );
}
