import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

export const Route = createFileRoute("/security")({
  component: Security,
  head: () => ({
    meta: [
      { title: "CyberSec — Security Policy" },
      {
        name: "description",
        content:
          "Security Policy for the CyberSec Toolkit, including how to report a vulnerability.",
      },
    ],
  }),
});

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12">
      <h2 className="font-heading text-2xl font-semibold text-[#ffffff]">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-2 text-lg font-semibold text-[#ba9cff]">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-[#cfc7da]">{children}</p>;
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#f97316]/30 bg-[#f97316]/10 p-4">
      <p className="text-sm leading-relaxed text-[#f97316]">{children}</p>
    </div>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#cfc7da]">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[#cfc7da]">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
}

function Security() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed top-[-56px] left-1/2 z-0 h-[390px] w-[min(780px,100vw)] -translate-x-1/2 rounded-[780px] bg-[#8f43dd] opacity-60 blur-[190px]" />

      <div className="relative z-10">
        <SiteNavbar />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-[128px] pb-24">
        <h1 className="font-heading text-4xl font-bold text-[#ffffff]">Security Policy</h1>
        <p className="mt-3 text-sm text-[#aaaaaa]">Last updated: [DATE]</p>

        <div className="mt-8">
          <Note>
            ⚠️ <strong>Draft notice:</strong> Template based on the project's current architecture
            (FastAPI backend, PostgreSQL, Redis, Groq/Gemini AI integration, Celery-style task
            workers, Docker deployment). Confirm each claim against your actual production setup
            before publishing — a security page that overstates your protections is worse than not
            having one.
          </Note>
        </div>

        <Section id="approach" title="1. Our approach to security">
          <P>
            CyberSec Toolkit is, itself, a security tool — we hold ourselves to the standard we'd
            want from any tool we'd trust with scanning data. This page explains how we handle
            security on our side, and how to report a problem if you find one.
          </P>
        </Section>

        <Section id="reporting" title="2. Reporting a vulnerability">
          <P>
            If you discover a security vulnerability in the Service (the website, backend API, or
            infrastructure — not in a third-party target you scanned), please report it responsibly:
          </P>
          <Bullets
            items={[
              <>
                <strong className="text-[#ffffff]">Email:</strong> [security@cybersec1.tech — not
                yet set up; create a dedicated address before publishing this page]
              </>,
              <>
                <strong className="text-[#ffffff]">What to include:</strong> steps to reproduce,
                affected endpoint/feature, potential impact, and your contact info for follow-up.
              </>,
              <>
                <strong className="text-[#ffffff]">What not to do:</strong> please do not publicly
                disclose a vulnerability before we've had a reasonable chance to fix it, and please
                do not exploit a vulnerability beyond what's needed to demonstrate it (no data
                exfiltration, no service disruption).
              </>,
            ]}
          />
          <P>
            We aim to acknowledge reports within [X business days] and will keep you updated on
            remediation progress. [Decide a real number once you can commit to it — an unspecific or
            unmet promise here is worse than a longer, honest one.]
          </P>
          <SubHeading>Do we offer a bug bounty?</SubHeading>
          <Note>
            [Not currently — state this plainly if true, rather than implying a program that doesn't
            exist. You can always add a bounty program later.]
          </Note>
        </Section>

        <Section id="data-handling" title="3. Data handling and storage">
          <Bullets
            items={[
              <>
                The Service does not require account creation and does not persistently store scan
                results or lookup history tied to your identity. See our [Privacy Policy] for full
                details.
              </>,
              <>
                Where data is processed temporarily to produce a scan result (e.g. in Redis as part
                of a job queue, or in PostgreSQL during an active scan job), it is handled only for
                the duration needed to complete and return that result. [Confirm: is there a
                TTL/cleanup job for Redis-queued scan data and any transient PostgreSQL rows? State
                the actual mechanism and timeframe.]
              </>,
              "All traffic between your browser and the Service is encrypted via HTTPS/TLS.",
            ]}
          />
        </Section>

        <Section id="infrastructure" title="4. Infrastructure security practices">
          <Note>
            [Confirm each of these against your actual deployment before publishing — do not list a
            practice you haven't actually implemented.]
          </Note>
          <Bullets
            items={[
              <>
                <strong className="text-[#ffffff]">Transport encryption:</strong> All connections to
                the Service use TLS.
              </>,
              <>
                <strong className="text-[#ffffff]">Input validation:</strong> User-submitted targets
                are validated before being used in any scan or lookup — for example,
                private/internal IP ranges (RFC 1918 addresses, loopback, link-local) are blocked
                from being sent to external GeoIP/lookup providers to prevent internal network data
                leakage and SSRF-style abuse.
              </>,
              <>
                <strong className="text-[#ffffff]">Rate limiting:</strong> Scanning operations are
                rate-limited (token-bucket based) to prevent the Service itself from being used as a
                tool for abusive traffic volume against a target, and to protect the Service's own
                infrastructure from overload.
              </>,
              <>
                <strong className="text-[#ffffff]">Secrets management:</strong> API keys for
                third-party providers (AI models, GeoIP, etc.) are not exposed to the frontend and
                are rotated/managed server-side. [Confirm: describe your actual key rotation
                approach, e.g. the multi-key rotation manager used for AI provider keys.]
              </>,
              <>
                <strong className="text-[#ffffff]">Dependency management:</strong> [Describe your
                actual practice — e.g. "Backend and frontend dependencies are kept up to date and
                monitored for known vulnerabilities." Only include if true; if you don't have an
                automated dependency-scanning process yet, consider adding one (e.g. GitHub
                Dependabot) before claiming this.]
              </>,
              <>
                <strong className="text-[#ffffff]">Containerized deployment:</strong> The Service
                runs in containerized environments (Docker) [confirm hosting provider(s) if you want
                to name them, e.g. Fly.io / Azure] to isolate workloads.
              </>,
            ]}
          />
        </Section>

        <Section id="what-we-ask" title="5. What we ask of you">
          <P>To help keep the Service and its users safe:</P>
          <Bullets
            items={[
              "Only scan systems you own or are explicitly authorized to test (see our [Terms of Use], Section 5).",
              "Report suspected vulnerabilities to us privately first, using the contact in Section 2, rather than exploiting or publicizing them.",
              "Do not attempt to bypass rate limiting, usage limits, or input validation controls on the Service.",
              "Do not use the Service to launch attacks, generate attack traffic, or otherwise weaponize its tools against systems you don't control — this is both a security and a legal matter (see Terms of Use).",
            ]}
          />
        </Section>

        <Section id="ai-provider-data" title="6. AI provider data handling">
          <P>
            Some features send scan findings to third-party AI providers (Groq, Google Gemini) to
            generate summaries. [Confirm and link to: Groq's data retention and training-use policy,
            and Google's equivalent for the Gemini API, since you are a data controller forwarding
            user-submitted data to their processors. This is both a security and privacy
            disclosure.]
          </P>
        </Section>

        <Section id="incident-response" title="7. Incident response">
          <P>In the event of a security incident affecting the Service or user data, we will:</P>
          <Steps
            items={[
              "Take immediate steps to contain and remediate the issue.",
              "Assess what data, if any, was affected.",
              "Notify affected users and relevant authorities as required by applicable law (including under India's IT Act, 2000 and DPDPA, 2023, where applicable) within the legally required timeframe.",
              "Publish a summary of the incident and remediation once resolved, where appropriate.",
            ]}
          />
          <Note>
            [This is a commitment, not just documentation — make sure there's an actual internal
            process behind it, even an informal one, before publishing.]
          </Note>
        </Section>

        <Section id="limitations" title="8. Limitations">
          <P>
            As a project currently run by an individual operator rather than a funded security team,
            we want to be transparent: this Service does not currently have a dedicated 24/7
            security monitoring team, a formal bug bounty budget, or a SOC2/ISO 27001 certification.
            We follow security best practices appropriate to the project's current scale and will
            scale our security posture and disclosures honestly as the Service grows — we will not
            claim certifications or guarantees we don't actually have.
          </P>
        </Section>

        <Section id="contact" title="9. Contact">
          <P>
            Security reports:{" "}
            <strong className="text-[#ffffff]">
              [security@cybersec1.tech — set this up before publishing]
            </strong>
          </P>
          <P>
            General questions:{" "}
            <strong className="text-[#ffffff]">
              [support email — set this up before publishing]
            </strong>
          </P>
        </Section>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-sm leading-relaxed text-[#aaaaaa] italic">
            This document describes our security practices as accurately as possible at the time of
            writing but is not a guarantee of absolute security. It is also a template and should be
            reviewed against your actual implementation before publishing.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
