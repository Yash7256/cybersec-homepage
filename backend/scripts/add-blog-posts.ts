import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const db = createClient(SUPABASE_URL, SERVICE_KEY);

/* ─── Fill in your blog post below ─── */

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  reading_time: number;
  featured: boolean;
  cover_url?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_image?: string;
  status: "draft" | "published";
  author: string;
  tags: string[];
  categories: string[];
}

const posts: BlogPost[] = [
  {
    title: "How to Scan for Open Ports Online (Free Tool + Step-by-Step Guide)",
    slug: "how-to-scan-open-ports-online",
    excerpt: "",
    content: `Introduction

If you run a website or manage a server, there's a good chance you've never actually checked which ports are open to the internet. Most people don't, until something goes wrong.

An open port isn't automatically a problem. Ports are how your server talks to the rest of the world. But an open port you didn't know about, running a service you forgot to secure, is one of the easiest ways attackers get a foothold.

This guide walks you through what ports actually are, why scanning them matters, and how to scan for open ports online without installing anything or touching a terminal. By the end, you'll know how to read your scan results and what to do about the ports that shouldn't be open.

Table of Contents
What Is a Port, Really
Why Open Ports Matter for Security
Common Ports and What They're Used For
How to Scan for Open Ports Online (Step-by-Step)
How to Scan Open Ports From the Command Line
Reading Your Scan Results
What to Do About Unwanted Open Ports
Common Mistakes When Scanning Ports
FAQ
Conclusion
What Is a Port, Really

Think of your server's IP address as a building's street address. That gets you to the building. A port is more like the specific door you knock on once you're there.

A single server can run many services at once: a website, an email server, a database, a remote login tool. Each of these listens on a different numbered "door," so incoming traffic knows exactly where to go.

Ports range from 0 to 65535. Some are reserved for well-known services (like port 443 for HTTPS), and others are used freely by applications.

A port is considered:

Open if a service is actively listening and accepting connections.
Closed if nothing is listening, but the device still responds to the connection attempt.
Filtered if a firewall is blocking the connection attempt entirely, so you get no response either way.
Why Open Ports Matter for Security

Every open port is a potential entry point. That doesn't mean every open port is dangerous. Port 443 being open on a web server is normal and expected. The risk comes from ports you didn't intend to expose.

A few real-world scenarios where this bites people:

A developer opens a database port for local testing and forgets to close it before deploying.
An old admin panel gets left running on a random port, unpatched for years.
A default install (like Redis or MongoDB) ships with no authentication and gets exposed by accident.

None of these require a sophisticated attacker. Automated bots scan the entire internet constantly, looking for exactly these mistakes. If a port is open and the service behind it is weak, it will get found.

This is why checking your own exposed ports regularly is one of the simplest, highest-value security habits you can build, right alongside checking your SSL certificate or reviewing your DNS records.

Common Ports and What They're Used For

You don't need to memorize all 65,536 ports. In practice, a small set shows up constantly. Here's a reference table for the ones you'll actually see in scan results.

Port	Service	Notes
21	FTP	File transfer, often unencrypted. Should usually be closed or replaced with SFTP.
22	SSH	Remote server access. Should be restricted to known IPs where possible.
25	SMTP	Email sending. Commonly abused for spam if misconfigured.
53	DNS	Domain name resolution.
80	HTTP	Standard web traffic, unencrypted.
443	HTTPS	Encrypted web traffic. Normal and expected to be open.
3306	MySQL	Database access. Should almost never be open to the public internet.
3389	RDP	Windows remote desktop. A frequent target for brute-force attacks.
6379	Redis	In-memory database. Notorious for being left open with no password.
8080	HTTP Alternate	Often used for dev servers or proxies, sometimes forgotten in production.

If you see a database, admin, or remote access port open to the public and you didn't explicitly configure it that way, that's worth investigating immediately.

How to Scan for Open Ports Online (Step-by-Step)

You don't need to install any software to check open ports on a website or server. Browser-based scanners handle this in a few seconds. Here's the general process.

Step 1: Know what you're allowed to scan

Only scan servers and domains you own or have explicit permission to test. Scanning infrastructure you don't control, even with a free online tool, can violate terms of service or, in some cases, the law.

Step 2: Choose an online port scanner

Look for a scanner that lets you enter a domain or IP address and returns a readable list of open ports, not just a raw data dump. This matters more than it sounds. A tool that just says "port 6379 is open" is far less useful than one that tells you that's Redis and explains why it's risky to expose.

Tools like CyberSec Toolkit's Port Scanner are built for exactly this. You enter a domain or IP, and it checks common ports and flags anything that looks unusual, without requiring you to interpret raw scan output.

Step 3: Enter your domain or IP address

You can scan by domain name (like example.com) or by direct IP address. Scanning by domain is usually more practical since it's what you'll remember and what maps to your actual website.

Step 4: Run the scan and review the results

The scanner will check a range of common ports and report their status. This typically takes a few seconds to a couple of minutes, depending on how many ports are being checked.

Step 5: Cross-reference with what you expect to be open

This is the step people skip. A list of open ports means nothing on its own. You need to compare it against what you know your server is supposed to be running. If you're only running a website, ports 80 and 443 being open is fine. Anything else needs an explanation.

How to Scan Open Ports From the Command Line

If you're comfortable with a terminal, a local scan gives you more control and doesn't rely on a third-party tool reaching your server over the internet.

On most Linux and macOS systems, nmap is the standard tool:

nmap example.com

This runs a basic scan against the most common 1,000 ports. For a specific range:

nmap -p 1-1000 example.com

On Windows, you can achieve something similar using PowerShell's Test-NetConnection for individual ports:

Test-NetConnection -ComputerName example.com -Port 443

The tradeoff with command-line tools is that they check from your own network's perspective. If you're behind a corporate firewall or VPN, your results may not reflect what the public internet actually sees. Online scanners test from outside your network, which is usually what you actually want to know.

Reading Your Scan Results

Once you have a list of open ports, the real work is figuring out what to do with it. A few questions to walk through for each open port:

Do I recognize this service? If you don't know why a port is open, that's the first thing to investigate. Unrecognized open ports are often leftover from old configurations or default installs nobody cleaned up.

Does it need to be public? Plenty of services need to run, but not all of them need to be reachable from the entire internet. Database ports, admin panels, and internal tools should typically be restricted to specific IPs or accessible only over a VPN.

Is the service authenticated? An open port running a service with no password, or a weak default password, is a much bigger problem than an open port running something properly secured.

Is it up to date? Old, unpatched software behind an open port is a common way attackers get in, even without a sophisticated exploit.

What to Do About Unwanted Open Ports

Once you've identified a port that shouldn't be open, here's the general path to closing the gap:

Stop the service if it's not needed. If nothing should be listening on that port, disable or uninstall the service entirely.
Restrict access with a firewall. If the service is needed but shouldn't be public, use firewall rules to limit access to specific IP addresses.
Move it behind a VPN. For internal tools like admin dashboards or databases, putting them behind a VPN removes them from public exposure entirely.
Change default credentials. If a service must stay exposed, make sure it isn't running on default settings with default passwords.
Re-scan after making changes. Confirm the port actually closed or became filtered. Configuration changes don't always take effect the way you expect on the first try.
Common Mistakes When Scanning Ports

A few patterns show up again and again when people start checking their own infrastructure:

Scanning once and never again. Servers change over time. New software gets installed, configurations drift, and a port that was closed six months ago might be open now.
Assuming closed means safe. A closed port just means nothing is currently listening. It doesn't mean the port can never be opened again by a future misconfiguration.
Ignoring filtered ports. A filtered port usually means a firewall is doing its job. That's good, but it's worth confirming the firewall rule is intentional and not accidental.
Only checking from inside your own network. As mentioned earlier, this can give a false sense of security if it doesn't match what's visible externally.
FAQ

Is it legal to scan for open ports? Scanning your own servers and domains is legal. Scanning infrastructure you don't own or don't have permission to test can violate laws like the Computer Fraud and Abuse Act in the US, or equivalent laws elsewhere. Always confirm ownership or written permission first.

What's the difference between an open port and a vulnerability? An open port just means a service is listening. A vulnerability is a specific weakness in that service, like outdated software or missing authentication, that could be exploited. An open port is a starting point for investigation, not proof of a problem.

Which ports should never be open to the public internet? Database ports (like 3306 for MySQL or 5432 for PostgreSQL), remote desktop ports (3389), and admin interfaces are the usual suspects. These should be restricted to internal networks or specific IPs.

Can scanning my own server cause downtime? A standard port scan is lightweight and shouldn't affect server performance. Aggressive or high-volume scanning techniques can occasionally strain older or poorly configured systems, but typical scans used for security checks are safe.

How often should I scan for open ports? Monthly is a reasonable baseline for most small sites and servers. If you're actively deploying new services or changing infrastructure, scan after every significant change.

Why does my scan show different results than last time? Server configurations, firewall rules, and running services change over time. New deployments, software updates, or forgotten test environments can all open or close ports between scans.

Does closing unused ports actually improve security? Yes. Every open port is a potential target. Closing ports you don't need reduces what's called your attack surface, the total number of ways an attacker could try to get in.

Can a port scanner see what's running behind an open port? Basic scanners just report open, closed, or filtered. More detailed scanners can attempt to identify the specific service and version running on a port, which is useful for figuring out if it needs an update.

Conclusion

Checking for open ports isn't something you need deep security expertise to do. It's a five-minute habit that tells you exactly what your server is exposing to the internet, and whether that matches what you actually intended.

The goal isn't to have zero open ports. It's to make sure every open port is one you recognize, expect, and have secured properly. If you haven't checked yours recently, that's the first place to start.

Call to Action

If you want a quick way to check what's exposed on your own domain, CyberSec Toolkit's free Port Scanner checks common ports in seconds and flags anything that looks unusual, without needing you to install anything or run terminal commands.`,
    reading_time: 10,
    featured: true,
    cover_url: "https://res.cloudinary.com/ivcyemvw/image/upload/f_auto,q_auto/port_scanner_qhzhtk",
    meta_title: "How to Scan for Open Ports Online: Free Step-by-Step Guide",
    meta_description: "Learn how to scan for open ports online for free. A simple, step-by-step guide covering tools, common ports, and what your scan results actually mean.",
    status: "published",
    author: "Admin",
    tags: [],
    categories: [],
  },
];

/* ─── Script logic (no need to edit below) ─── */

async function ensureTag(name: string, slug: string): Promise<string> {
  const { data: existing } = await db
    .from("tags")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) return existing.id;

  const { data, error } = await db
    .from("tags")
    .insert({ name, slug })
    .select("id")
    .single();

  if (error) {
    console.error(`  Failed to create tag "${name}":`, error.message);
    return "";
  }

  console.log(`  Created tag: ${name}`);
  return data.id;
}

async function ensureCategory(name: string, slug: string): Promise<string> {
  const { data: existing } = await db
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) return existing.id;

  const { data, error } = await db
    .from("categories")
    .insert({ name, slug })
    .select("id")
    .single();

  if (error) {
    console.error(`  Failed to create category "${name}":`, error.message);
    return "";
  }

  console.log(`  Created category: ${name}`);
  return data.id;
}

async function insertPost(post: BlogPost): Promise<boolean> {
  const { data: existing } = await db
    .from("posts")
    .select("id")
    .eq("slug", post.slug)
    .maybeSingle();

  if (existing) {
    console.log(`  Skipped (slug exists): ${post.title}`);
    return false;
  }

  const { data, error } = await db
    .from("posts")
    .insert({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      reading_time: post.reading_time,
      featured: post.featured,
      cover_url: post.cover_url || null,
      meta_title: post.meta_title || null,
      meta_description: post.meta_description || null,
      canonical_url: post.canonical_url || null,
      og_image: post.og_image || null,
      status: post.status,
      author: post.author,
      published_at: post.status === "published" ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error) {
    console.error(`  Failed to create post "${post.title}":`, error.message);
    return false;
  }

  const postId = data.id;

  // Link tags
  for (const tagName of post.tags) {
    const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
    const tagId = await ensureTag(tagName, tagSlug);
    if (tagId) {
      await db.from("post_tags").upsert(
        { post_id: postId, tag_id: tagId },
        { onConflict: "post_id,tag_id" },
      );
    }
  }

  // Link categories
  for (const catName of post.categories) {
    const catSlug = catName.toLowerCase().replace(/\s+/g, "-");
    const catId = await ensureCategory(catName, catSlug);
    if (catId) {
      await db.from("post_categories").upsert(
        { post_id: postId, category_id: catId },
        { onConflict: "post_id,category_id" },
      );
    }
  }

  console.log(`  Created post: ${post.title}`);
  return true;
}

async function main() {
  console.log("Adding blog posts...\n");

  let created = 0;
  let skipped = 0;

  for (const post of posts) {
    const ok = await insertPost(post);
    if (ok) created++;
    else skipped++;
  }

  console.log(`\nDone — ${created} created, ${skipped} skipped.`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});