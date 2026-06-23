import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "CyberSec — Terms of Use" },
      {
        name: "description",
        content: "Terms of Use for the CyberSec Toolkit.",
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

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-[#cfc7da]">{children}</p>;
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

function Terms() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed top-[-56px] left-1/2 z-0 h-[390px] w-[min(780px,100vw)] -translate-x-1/2 rounded-[780px] bg-[#8f43dd] opacity-60 blur-[190px]" />

      <div className="relative z-10">
        <SiteNavbar />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-[128px] pb-24">
        <h1 className="font-heading text-4xl font-bold text-[#ffffff]">Terms of Use</h1>
        <p className="mt-3 text-sm text-[#aaaaaa]">Last updated: [DATE]</p>

        <div className="mt-8 rounded-lg border border-[#f97316]/30 bg-[#f97316]/10 p-4">
          <p className="text-sm leading-relaxed text-[#f97316]">
            ⚠️ <strong>Draft notice:</strong> This document was generated as a starting template and
            has not been reviewed by a lawyer. Given that this service performs network scanning of
            third-party systems, please have a qualified lawyer (ideally one familiar with Indian IT
            law and the Information Technology Act, 2000) review this before publishing it live.
            Bracketed items like <code>[X]</code> must be filled in before this is usable as a real
            legal document.
          </p>
        </div>

        <Section id="who" title="1. Who this agreement is with">
          <P>
            CyberSec Toolkit ("the Service," "we," "us," "our") is currently operated by an
            individual, [Your Full Name], based in India, and not by a registered company or LLP. By
            using the Service, you are entering into this agreement directly with that individual
            operator.
          </P>
          <P>
            If a company or LLP is formed to operate the Service in the future, these terms will be
            updated to reflect that, and you will be notified via the website.
          </P>
        </Section>

        <Section id="acceptance" title="2. Acceptance of these terms">
          <P>
            By accessing or using the Service at [cybersec1.tech] (the "Site") — including running
            any scan, lookup, or tool available through the Site — you agree to be bound by these
            Terms of Use ("Terms"). If you do not agree, do not use the Service.
          </P>
          <P>
            These Terms apply to all visitors, whether or not you create an account, and regardless
            of whether you use the free usage tier or any paid tier introduced in the future.
          </P>
        </Section>

        <Section id="what" title="3. What the Service is">
          <P>
            The Service provides a set of cybersecurity reconnaissance and diagnostic tools —
            including but not limited to port scanning, OS fingerprinting, GeoIP lookup, WHOIS
            lookup, subdomain enumeration, ping, traceroute, HTTP header analysis, SSL certificate
            inspection, and AI-generated summary reports — accessible through a web interface, made
            available on a usage-limited basis.
          </P>
          <P>
            The Service is provided for legitimate security testing, research, diagnostics, and
            educational purposes only.
          </P>
        </Section>

        <Section id="eligibility" title="4. Eligibility">
          <P>
            You must be at least [18] years old, or the age of majority in your jurisdiction, to use
            the Service. By using the Service, you represent that you meet this requirement.
          </P>
        </Section>

        <Section
          id="authorized-use"
          title="5. Authorized use only — this is the most important section"
        >
          <P>
            <strong className="text-[#ffffff]">
              You may only run scans, lookups, or any other tool in this Service against systems,
              domains, IP addresses, or networks that you own, or for which you have obtained
              explicit, verifiable, prior authorization to test.
            </strong>
          </P>
          <P>This includes but is not limited to:</P>
          <Bullets
            items={[
              "Port scanning",
              "OS fingerprinting",
              "Subdomain enumeration",
              "Web application scanning",
              "Any other tool capable of probing a system you do not own or control",
            ]}
          />
          <P>
            You agree that you will <strong className="text-[#ffffff]">not</strong> use the Service
            to:
          </P>
          <Bullets
            items={[
              "Scan, probe, fingerprint, or otherwise test any system without the explicit authorization of its owner or operator.",
              "Attempt to gain unauthorized access to any system, network, or data.",
              "Use the Service as part of any attack, intrusion, denial-of-service attempt, or other malicious activity against any third party.",
              "Violate any applicable law, including but not limited to the Information Technology Act, 2000 (India), the Computer Fraud and Abuse Act (United States), the Computer Misuse Act (United Kingdom), or equivalent unauthorized-access laws in any other jurisdiction.",
              "Use the Service to violate the rights of any third party, including privacy, intellectual property, or contractual rights.",
              "Resell, sublicense, or provide the Service's output as if it were your own product without attribution where required.",
              "Attempt to circumvent, disable, or interfere with usage limits, rate limiting, or any other access control on the Service.",
              "Use automated means (bots, scripts) to access the Service beyond what the Service's own interface provides, in a way that degrades the Service for other users.",
            ]}
          />
          <P>
            <strong className="text-[#ffffff]">
              Unauthorized scanning of a system you do not own or have permission to test may be
              illegal in your jurisdiction, regardless of intent.
            </strong>{" "}
            You are solely responsible for determining whether your use of the Service is lawful
            before running any tool.
          </P>
        </Section>

        <Section id="no-warranty-accuracy" title="6. No warranty of accuracy">
          <P>
            The Service's tools — including GeoIP location, WHOIS data, OS fingerprinting,
            port/service detection, vulnerability/CVE matching, and AI-generated executive reports —
            rely on third-party data sources, probabilistic detection techniques, and AI models.{" "}
            <strong className="text-[#ffffff]">
              Results may be incomplete, inaccurate, outdated, or wrong.
            </strong>
          </P>
          <P>
            You agree not to rely on any result from the Service as the sole basis for a security,
            legal, financial, or operational decision. Always verify critical findings independently
            before acting on them.
          </P>
        </Section>

        <Section id="ai-content" title="7. AI-generated content">
          <P>
            Some features (such as the AI Executive Report) use third-party AI models (including but
            not limited to Groq-hosted and Google Gemini models) to generate summaries and
            remediation suggestions. AI-generated content can contain errors, omissions, or
            "hallucinated" details that sound plausible but are incorrect — including incorrect CVE
            references or remediation steps. AI output is provided for convenience and must be
            independently verified before being acted on, especially in a production environment.
          </P>
        </Section>

        <Section id="usage-limits" title="8. Usage limits">
          <P>
            The Service is currently provided on a usage-limited basis without requiring account
            creation. Usage limits may change at any time, without notice, at our discretion. We may
            introduce paid tiers with different usage limits in the future; any such change will be
            reflected in updated Terms and, where applicable, a separate pricing page.
          </P>
        </Section>

        <Section id="no-storage" title="9. No persistent storage of your data (current state)">
          <P>
            As of the date of these Terms, the Service does not persistently store scan results,
            lookup history, or other user-submitted data tied to an individual user or account after
            your session ends. See our [Privacy Policy] for full details, and note that this may
            change as the Service evolves — any change affecting data retention will be reflected in
            an updated Privacy Policy.
          </P>
        </Section>

        <Section id="ip" title="10. Intellectual property">
          <P>
            The Service, including its design, code, branding, and documentation (excluding
            third-party data such as WHOIS/RDAP/NVD records, which belong to their respective
            sources), is the property of the operator. You may not copy, modify, reverse-engineer,
            or redistribute the Service itself without permission. Output you generate by using the
            Service (e.g. a scan report for your own system) is yours to use.
          </P>
        </Section>

        <Section id="third-party" title="11. Third-party services and data">
          <P>
            The Service relies on third-party providers for certain data, including but not limited
            to IP geolocation providers, RDAP/WHOIS registries, the National Vulnerability Database
            (NVD), and AI model providers (Groq, Google). We do not control these third parties and
            are not responsible for their accuracy, availability, or any changes to their terms that
            may affect the Service.
          </P>
        </Section>

        <Section id="disclaimer" title="12. Disclaimer of warranties">
          <P>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR NON-INFRINGEMENT. WE DO
            NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
          </P>
        </Section>

        <Section id="liability" title="13. Limitation of liability">
          <P>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE OPERATOR SHALL NOT BE LIABLE FOR
            ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
            PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING FROM YOUR USE OF, OR
            INABILITY TO USE, THE SERVICE — INCLUDING ANY DAMAGES ARISING FROM YOUR USE OF THE
            SERVICE TO SCAN A THIRD-PARTY SYSTEM WITHOUT AUTHORIZATION, WHICH IS YOUR SOLE
            RESPONSIBILITY AND LIABILITY, NOT OURS.
          </P>
          <div className="rounded-lg border border-[#f97316]/30 bg-[#f97316]/10 p-4">
            <p className="text-sm leading-relaxed text-[#f97316]">
              [This section in particular needs lawyer review — limitation of liability clauses have
              specific enforceability requirements that vary by jurisdiction, and as an individual
              operator without a corporate liability shield, you have real personal exposure here
              that a lawyer should help you understand and mitigate.]
            </p>
          </div>
        </Section>

        <Section id="indemnification" title="14. Indemnification">
          <P>
            You agree to indemnify and hold harmless the operator from any claims, damages, losses,
            or expenses (including legal fees) arising from: (a) your violation of these Terms; (b)
            your unauthorized use of the Service against any third-party system; or (c) your
            violation of any law or third-party right in connection with your use of the Service.
          </P>
        </Section>

        <Section id="changes" title="15. Changes to the Service or these Terms">
          <P>
            We may modify, suspend, or discontinue the Service, or any part of it, at any time
            without notice. We may update these Terms from time to time; the "Last updated" date at
            the top will reflect the most recent revision. Continued use of the Service after a
            change constitutes acceptance of the updated Terms.
          </P>
        </Section>

        <Section id="termination" title="16. Termination">
          <P>
            We may restrict or terminate your access to the Service at any time, for any reason,
            including suspected violation of these Terms, without prior notice.
          </P>
        </Section>

        <Section id="governing-law" title="17. Governing law">
          <P>
            These Terms are governed by the laws of India, without regard to conflict of law
            principles. Any dispute arising from these Terms or your use of the Service will be
            subject to the exclusive jurisdiction of the courts of [Your City], India.
          </P>
        </Section>

        <Section id="contact" title="18. Contact">
          <P>
            For questions about these Terms, contact:{" "}
            <strong className="text-[#ffffff]">
              [support email — not yet set up; add one before publishing, e.g.
              support@cybersec1.tech]
            </strong>
          </P>
        </Section>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-sm leading-relaxed text-[#aaaaaa] italic">
            This document is a template and does not constitute legal advice. Consult a qualified
            lawyer before relying on it.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
