import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env manually so this works when run with node (Vercel) or bun (local)
if (!process.env.VITE_SUPABASE_URL) {
  try {
    const envPath = join(__dirname, "..", ".env");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i > 0) {
        const k = t.slice(0, i);
        if (!process.env[k]) process.env[k] = t.slice(i + 1);
      }
    }
  } catch { /* .env not found — skip */ }
}

const DIST = join(__dirname, "..", "dist");
const SITE_URL = "https://home.cybersec1.tech";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHeadTags({ title, description, path, image, canonical, isHome, noindex, extra }) {
  const url = `${SITE_URL}${path}`;
  const img = image || DEFAULT_OG_IMAGE;
  const canonicalUrl = canonical || url;

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${isHome ? "website" : "article"}" />`,
    `<meta property="og:image" content="${escapeHtml(img)}" />`,
    `<meta property="og:site_name" content="CyberSec Toolkit" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(img)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
  ];

  if (noindex) {
    tags.push(`<meta name="robots" content="noindex" />`);
  }

  if (extra) {
    tags.push(extra);
  }

  return tags.join("\n    ");
}

function generateHTML(template, headTagsBlock) {
  return template.replace(
    /<title>[^<]*<\/title>\s*/,
    headTagsBlock + "\n    ",
  );
}

// ── Read built template ────────────────────────────────────
const template = readFileSync(join(DIST, "index.html"), "utf-8");

// ── Static marketing routes ────────────────────────────────
const staticRoutes = [
  {
    path: "/",
    title: "CyberSec Toolkit — Async Vulnerability Scanning with Live AI Analysis",
    desc: "Async vulnerability scanning with live AI analysis built for security professionals who don't wait for batch reports.",
    priority: 1.0,
    isHome: true,
  },
  {
    path: "/pricing",
    title: "CyberSec Toolkit — Pricing",
    desc: "Simple pricing plans for CyberSec vulnerability scanning and reporting.",
    priority: 0.8,
  },
  {
    path: "/docs",
    title: "CyberSec Toolkit — Documentation",
    desc: "Comprehensive documentation for CyberSec vulnerability scanning platform.",
    priority: 0.8,
  },
  {
    path: "/security",
    title: "CyberSec Toolkit — Security Policy",
    desc: "Security Policy for the CyberSec Toolkit, including how to report a vulnerability.",
    priority: 0.6,
  },
  {
    path: "/privacy",
    title: "CyberSec Toolkit — Privacy Policy",
    desc: "Privacy Policy for the CyberSec Toolkit.",
    priority: 0.6,
  },
  {
    path: "/terms",
    title: "CyberSec Toolkit — Terms of Use",
    desc: "Terms of Use for the CyberSec Toolkit.",
    priority: 0.6,
  },
  {
    path: "/blog",
    title: "Blog — CyberSec Toolkit",
    desc: "Security insights, tutorials, and updates from the CyberSec team.",
    priority: 0.8,
  },
];

for (const route of staticRoutes) {
  const headTags = buildHeadTags({
    title: route.title,
    description: route.desc,
    path: route.path,
    isHome: route.isHome,
  });

  const html = generateHTML(template, headTags);

  if (route.path === "/") {
    writeFileSync(join(DIST, "index.html"), html, "utf-8");
  } else {
    const dir = join(DIST, route.path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html, "utf-8");
  }
  console.log(`  ✓ ${route.path}`);
}

// ── Blog posts (build-time Supabase query) ────────────────
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let posts = [];
if (supabaseUrl && serviceRoleKey) {
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, cover_url, meta_title, meta_description, canonical_url, og_image, author, published_at, updated_at",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("  ✗ Blog post query failed:", error.message);
  } else {
    posts = data ?? [];
  }
} else {
  console.log("  ! VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — skipping blog posts");
}

for (const post of posts) {
  const metaTitle = post.meta_title || post.title;
  const metaDesc = post.meta_description || post.excerpt || "";

  const ogImage = post.og_image || post.cover_url || "";
  const slugPath = `/blog/${post.slug}`;
  const canonicalUrl = post.canonical_url || `${SITE_URL}${slugPath}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "CyberSec Toolkit" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

  const headTags = buildHeadTags({
    title: `${metaTitle} — CyberSec Toolkit`,
    description: metaDesc,
    path: slugPath,
    image: ogImage || undefined,
    canonical: canonicalUrl,
    extra: jsonLdTag,
  });

  const html = generateHTML(template, headTags);

  const dir = join(DIST, "blog", post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf-8");
  console.log(`  ✓ /blog/${post.slug}`);
}

// ── Sitemap ────────────────────────────────────────────────
const sitemapUrls = staticRoutes.map((r) => ({
  loc: r.path,
  priority: r.priority,
}));

for (const post of posts) {
  sitemapUrls.push({ loc: `/blog/${post.slug}`, priority: 0.7 });
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((u) => `  <url>\n    <loc>${SITE_URL}${u.loc}</loc>\n    <priority>${u.priority.toFixed(1)}</priority>\n  </url>`).join("\n")}
</urlset>
`;

writeFileSync(join(DIST, "sitemap.xml"), sitemapXml, "utf-8");
console.log(`  ✓ sitemap.xml (${sitemapUrls.length} URLs)`);
