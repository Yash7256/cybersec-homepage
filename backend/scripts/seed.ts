import { createClient } from "@supabase/supabase-js";

const API = process.env.API_URL ?? "http://localhost:3001/api/blog";
const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const ADMIN_EMAIL = "admin@cybersec1.tech";
const ADMIN_PASSWORD = "admin123456";

const admin = createClient(SUPABASE_URL, SERVICE_KEY);

let jwt = "";

async function ensureAdminUser() {
  const { data: existing } = await admin.auth.admin.getUserByEmail(ADMIN_EMAIL);
  if (existing?.user) {
    console.log("Admin user exists:", existing.user.id);
    return existing.user.id;
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });

  if (error) {
    console.error("Failed to create admin user:", error.message);
    process.exit(1);
  }

  console.log("Created admin user:", data.user.id);
  return data.user.id;
}

async function ensureAdminProfile(userId: string) {
  const { data: existing } = await admin
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (existing) {
    console.log("Admin profile exists");
    return;
  }

  const { error } = await admin.from("profiles").insert({
    id: userId,
    email: ADMIN_EMAIL,
    name: "CyberSec Admin",
    role: "admin",
    bio: "Site administrator and content curator.",
  });

  if (error) {
    console.error("Failed to create admin profile:", error.message);
    process.exit(1);
  }

  console.log("Created admin profile");
}

async function loginAsAdmin() {
  const anon = createClient(SUPABASE_URL, process.env.SUPABASE_ANON_KEY ?? "");
  const { data, error } = await anon.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });

  if (error) {
    console.error("Login failed:", error.message);
    process.exit(1);
  }

  jwt = data.session.access_token;
  console.log("Logged in as admin");
}

let skippedCount = 0;

async function apiPost(path: string, body: Record<string, unknown>, label: string) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok) {
    skippedCount++;
    return null;
  }
  console.log(`  Created ${label}`);
  return json.data;
}

async function seedTags(): Promise<Record<string, string>> {
  const tags = [
    { name: "Penetration Testing", slug: "penetration-testing" },
    { name: "Vulnerability Research", slug: "vulnerability-research" },
    { name: "Network Security", slug: "network-security" },
    { name: "Web Security", slug: "web-security" },
    { name: "Cloud Security", slug: "cloud-security" },
    { name: "Malware Analysis", slug: "malware-analysis" },
    { name: "Red Team", slug: "red-team" },
    { name: "Blue Team", slug: "blue-team" },
  ];

  const ids: Record<string, string> = {};

  for (const tag of tags) {
    const data = await apiPost("/tags", tag, tag.name);
    if (data) {
      ids[tag.name] = data.id;
    }
  }

  return ids;
}

async function seedCategories(): Promise<Record<string, string>> {
  const categories = [
    { name: "Tutorials", slug: "tutorials" },
    { name: "Research", slug: "research" },
    { name: "Case Studies", slug: "case-studies" },
    { name: "Industry News", slug: "industry-news" },
    { name: "Tools & Reviews", slug: "tools-reviews" },
  ];

  const ids: Record<string, string> = {};

  for (const cat of categories) {
    const data = await apiPost("/categories", cat, cat.name);
    if (data) {
      ids[cat.name] = data.id;
    }
  }

  return ids;
}

const posts = [
  {
    title: "Getting Started with Penetration Testing: A Beginner's Guide",
    slug: "getting-started-with-penetration-testing",
    excerpt:
      "Learn the fundamentals of penetration testing, from reconnaissance to reporting, and discover the essential tools every ethical hacker should know.",
    content: `# Getting Started with Penetration Testing

Penetration testing (pentesting) is the practice of simulating cyberattacks on systems, networks, and applications to identify vulnerabilities before malicious actors can exploit them.

## What You'll Need

Before diving in, make sure you have:

- A solid understanding of networking fundamentals (TCP/IP, DNS, HTTP)
- Familiarity with Linux command line
- A lab environment (VirtualBox/VMware with vulnerable VMs)
- Authorization in writing before testing any system

## The Pentesting Methodology

### 1. Reconnaissance

Gather information about the target:

\`\`\`bash
# Passive recon with whois
whois example.com

# DNS enumeration
nslookup example.com
dig example.com ANY

# Subdomain discovery (passive)
curl -s "https://crt.sh/?q=%25.example.com&output=json" | jq .
\`\`\`

### 2. Scanning & Enumeration

Identify open ports and services:

\`\`\`bash
# Quick port scan
nmap -sS -F target.com

# Detailed service enumeration
nmap -sV -sC -p- target.com

# Web directory enumeration
gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt
\`\`\`

### 3. Exploitation

Attempt to leverage discovered vulnerabilities. Always stay within scope.

### 4. Post-Exploitation

After gaining access, enumerate the internal network, escalate privileges, and maintain persistence.

### 5. Reporting

Document every finding with screenshots, severity ratings, and remediation steps.

## Recommended Tools for Beginners

- **Nmap** — Network scanning
- **Burp Suite** — Web application testing
- **Metasploit** — Exploitation framework
- **Wireshark** — Packet analysis
- **John the Ripper** — Password cracking

> **Remember**: Always get written permission before testing any system. Unauthorized access is illegal.
`,
    reading_time: 8,
    featured: true,
    tagNames: ["Penetration Testing", "Network Security", "Web Security"],
    categoryNames: ["Tutorials"],
  },
  {
    title: "Top 10 OWASP Vulnerabilities in Modern Web Applications",
    slug: "top-10-owasp-vulnerabilities-2025",
    excerpt:
      "An in-depth analysis of the most critical web application security risks and how to defend against them in modern development pipelines.",
    content: `# Top 10 OWASP Vulnerabilities

The OWASP Top 10 is the industry standard for web application security awareness. Here's what you need to know about the most critical risks.

## 1. Broken Access Control

Applications fail to properly enforce user permissions, allowing attackers to access unauthorized resources.

**Example**: A user can access \`/api/admin/users\` by simply changing their user ID in the URL.

## 2. Cryptographic Failures

Sensitive data exposed due to weak encryption, missing TLS, or hardcoded secrets.

**Prevention**:
- Use TLS 1.3 everywhere
- Never roll your own crypto
- Store passwords with bcrypt/argon2

## 3. Injection

SQL, NoSQL, OS command, and LDAP injection remain prevalent.

\`\`\`javascript
// ❌ Vulnerable
const query = \`SELECT * FROM users WHERE id = '\${userId}'\`;

// ✅ Safe (parameterized)
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);
\`\`\`

## 4. Insecure Design

Missing security controls during the design phase lead to exploitable patterns.

## 5. Security Misconfiguration

Default credentials, unnecessary features enabled, improper permissions.

## Defense in Depth

Never rely on a single security control. Layer your defenses:
- WAF at the perimeter
- Input validation in the application
- Least-privilege at the database
- Monitoring and alerting everywhere
`,
    reading_time: 10,
    featured: true,
    tagNames: ["Web Security", "Vulnerability Research"],
    categoryNames: ["Research", "Tutorials"],
  },
  {
    title: "Cloud Security Best Practices for 2025",
    slug: "cloud-security-best-practices-2025",
    excerpt:
      "Secure your cloud infrastructure with these battle-tested strategies for AWS, Azure, and GCP environments.",
    content: `# Cloud Security Best Practices

As organizations migrate more workloads to the cloud, securing that infrastructure becomes paramount.

## The Shared Responsibility Model

Remember: security **of** the cloud is the provider's job. Security **in** the cloud is yours.

## Key Practices

### 1. Identity & Access Management

- Enforce least-privilege access
- Use temporary credentials (STS) instead of long-lived keys
- Enable MFA for all users

### 2. Network Security

\`\`\`hcl
# Terraform: Restrict ingress traffic
resource "aws_security_group" "web" {
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }
}
\`\`\`

### 3. Data Encryption

- Encrypt data at rest (AES-256)
- Encrypt data in transit (TLS 1.3)
- Use customer-managed keys (CMK) for sensitive workloads

### 4. Monitoring & Logging

Enable AWS CloudTrail, Azure Monitor, or GCP Cloud Logging. Set up alerts for:
- Root account activity
- Unauthorized API calls
- IAM policy changes

## Common Cloud Misconfigurations

| Issue | Risk |
|-------|------|
| Public S3 buckets | Data exposure |
| Overly permissive IAM | Privilege escalation |
| Unrestricted egress | Data exfiltration |
| Disabled logging | Blind spot for incidents |
`,
    reading_time: 7,
    featured: false,
    tagNames: ["Cloud Security", "Network Security"],
    categoryNames: ["Tutorials", "Industry News"],
  },
  {
    title: "Malware Analysis 101: Static vs Dynamic Analysis",
    slug: "malware-analysis-static-vs-dynamic",
    excerpt:
      "Understand the two primary approaches to malware analysis and when to use each technique.",
    content: `# Malware Analysis 101

Malware analysis is the process of understanding the behavior and purpose of malicious software. There are two main approaches.

## Static Analysis

Examining the malware without executing it.

### Techniques
- **File fingerprinting**: SHA-256 hashes against VirusTotal
- **String extraction**: \`strings malware.exe\`
- **PE analysis**: Check sections, imports, and compilation timestamps
- **Disassembly**: IDA Pro, Ghidra, or Radare2

\`\`\`bash
# Quick static analysis
file sample.exe
strings sample.exe | grep -i "http\\|https\\|api\\|key"
pescan sample.exe
\`\`\`

## Dynamic Analysis

Executing the malware in a controlled sandbox to observe behavior.

### Setup
- Isolated VM (FLARE VM or REMnux)
- Network monitoring (FakeNet-NG, INetSim)
- API monitoring (API Monitor, Procmon)

### What to Watch
- Registry modifications
- File system changes
- Network connections
- Process injection attempts

## When to Use Each

| Scenario | Approach |
|----------|----------|
| Quick triage | Static analysis |
| Unknown binary | Both |
| Obfuscated/packed | Dynamic analysis |
| APT sample | Deep static + dynamic |

> **Safety First**: Always analyze malware in an air-gapped environment. Never connect to production networks.
`,
    reading_time: 6,
    featured: false,
    tagNames: ["Malware Analysis", "Vulnerability Research"],
    categoryNames: ["Tutorials"],
  },
  {
    title: "Red Team vs Blue Team: Building a Better Defense",
    slug: "red-team-vs-blue-team",
    excerpt:
      "How adversarial simulation and defensive operations work together to strengthen your organization's security posture.",
    content: `# Red Team vs Blue Team

Security teams are often divided into two groups: Red (offense) and Blue (defense). The best organizations leverage both.

## Red Team

Simulates real-world attackers to test defenses.

### Typical Activities
- Social engineering campaigns
- Physical security testing
- Advanced persistent threat simulation
- Zero-day research

## Blue Team

Defends against attacks and maintains security operations.

### Typical Activities
- SIEM monitoring and alerting
- Incident response
- Threat hunting
- Vulnerability management

## Purple Team

The integration of Red and Blue Teams for continuous improvement.

\`\`\`python
# Simple log correlation example
def correlate_alerts(logs):
    suspicious = []
    for log in logs:
        if log.severity == "HIGH" and log.source not in whitelist:
            suspicious.append(log)
    return suspicious
\`\`\`

## Metrics That Matter

- **Red**: Time to compromise, techniques detected
- **Blue**: Mean time to detect (MTTD), mean time to respond (MTTR)
- **Purple**: Improvement in detection coverage over time

Building a mature security program requires both perspectives. Don't let your team become one-dimensional.
`,
    reading_time: 5,
    featured: false,
    tagNames: ["Red Team", "Blue Team", "Penetration Testing"],
    categoryNames: ["Case Studies"],
  },
  {
    title: "Securing Your CI/CD Pipeline: A Practical Guide",
    slug: "securing-cicd-pipeline",
    excerpt:
      "Integrate security into every stage of your software delivery lifecycle with these actionable techniques.",
    content: `# Securing Your CI/CD Pipeline

Modern software development moves fast. Security shouldn't slow it down — it should be built in.

## Shift Left

Move security testing earlier in the development lifecycle.

### What to Add at Each Stage

**Code** → SAST (Static Application Security Testing)
\`\`\`yaml
# GitHub Actions: SAST step
- name: Semgrep Scan
  uses: semgrep/semgrep-action@v1
  with:
    config: p/default
\`\`\`

**Build** → SCA (Software Composition Analysis)
- Scan dependencies for known CVEs
- Fail the build on critical vulnerabilities

**Test** → DAST (Dynamic Application Security Testing)
- Run ZAP or Burp against staging

**Deploy** → IaC scanning
- Check Terraform/CloudFormation for misconfigurations

## Secrets Management

Never hardcode secrets:

\`\`\`bash
# ❌ Bad
DB_PASSWORD="supersecret"

# ✅ Good
DB_PASSWORD=\${{ secrets.DB_PASSWORD }}
\`\`\`

Use tools like:
- HashiCorp Vault
- AWS Secrets Manager
- GitHub Secrets / GitLab CI variables

## Supply Chain Security

- Pin dependency versions (lockfiles)
- Verify package signatures
- Use private registries for critical packages
- Sign your own artifacts with Sigstore/cosign

## Continuous Monitoring

Security doesn't stop at deployment. Monitor your pipeline itself for anomalies and unauthorized changes.
`,
    reading_time: 9,
    featured: true,
    tagNames: ["Web Security", "Cloud Security"],
    categoryNames: ["Tutorials", "Tools & Reviews"],
  },
];

async function seedPosts(tagIds: Record<string, string>, catIds: Record<string, string>) {
  let count = 0;

  for (const post of posts) {
    const tag_ids = post.tagNames
      .map((name) => tagIds[name])
      .filter(Boolean);

    const category_ids = post.categoryNames
      .map((name) => catIds[name])
      .filter(Boolean);

    const data = await apiPost("/posts", {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      reading_time: post.reading_time,
      featured: post.featured,
      status: "published",
      tag_ids,
      category_ids,
    }, post.title);

    if (data) count++;
  }

  console.log("Created", count, "posts");
}

async function main() {
  console.log("Seeding blog content via API...\n");

  const userId = await ensureAdminUser();
  await ensureAdminProfile(userId);
  await loginAsAdmin();

  console.log("\nCreating tags...");
  const tagIds = await seedTags();

  console.log("\nCreating categories...");
  const catIds = await seedCategories();

  console.log("\nCreating posts...");
  await seedPosts(tagIds, catIds);

  if (skippedCount > 0) {
    console.log(`\n(${skippedCount} items skipped — already exist or errored)`);
  }
  console.log("\nDone! Visit /blog to see your content.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
