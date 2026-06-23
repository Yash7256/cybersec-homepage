import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "CyberSec — Privacy Policy" },
      {
        name: "description",
        content: "Privacy Policy for the CyberSec Toolkit.",
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

function Privacy() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed top-[-56px] left-1/2 z-0 h-[390px] w-[min(780px,100vw)] -translate-x-1/2 rounded-[780px] bg-[#8f43dd] opacity-60 blur-[190px]" />

      <div className="relative z-10">
        <SiteNavbar />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-[128px] pb-24">
        <h1 className="font-heading text-4xl font-bold text-[#ffffff]">Privacy Policy</h1>
        <p className="mt-3 text-sm text-[#aaaaaa]">Last updated: [DATE]</p>

        <div className="mt-8">
          <Note>
            ⚠️ <strong>Draft notice:</strong> This is a starting template, not reviewed by a lawyer
            or a data-protection professional. India's Digital Personal Data Protection Act, 2023
            (DPDPA) applies if you process personal data of individuals in India, and its rules are
            still being finalized as of this writing — have this reviewed before publishing, and
            check for DPDPA rule updates closer to launch. Bracketed items must be filled in.
          </Note>
        </div>

        <Section id="who-we-are" title="1. Who we are">
          <P>
            CyberSec Toolkit ("the Service," "we," "us") is currently operated by an individual
            based in India, [Your Full Name], not a registered company. This Privacy Policy explains
            what data is (and isn't) collected when you use the Service at [cybersec1.tech].
          </P>
        </Section>

        <Section id="core-principle" title="2. Our core data principle">
          <P>
            <strong className="text-[#ffffff]">
              The Service does not require account creation and does not persistently store your
              scan results, lookup history, or target inputs tied to your identity after your
              session ends.
            </strong>{" "}
            This is true as of the date of this Policy. If this changes — for example, if we
            introduce optional accounts with saved scan history — this Policy will be updated first,
            and the change will be clearly noted.
          </P>
        </Section>

        <Section id="data-we-process" title="3. What data we do process">
          <SubHeading>3.1 The targets you scan</SubHeading>
          <P>
            When you enter a target (an IP address, domain, or URL) into a tool, that target is sent
            to our backend to run the requested scan or lookup, and may be sent to third-party data
            providers (see Section 5) to retrieve results (for example, a GeoIP or WHOIS provider).
            This data is used only to produce your result and is not linked to your identity.
          </P>

          <SubHeading>3.2 Technical/usage data</SubHeading>
          <P>To keep the Service running and enforce usage limits, we may process:</P>
          <Bullets
            items={[
              "Your IP address (used to apply usage limits and for basic abuse prevention — e.g. rate limiting scan requests)",
              "Browser/device information (user agent) for compatibility and troubleshooting",
              "Timestamps and which tool was used, for rate-limiting and operational monitoring",
            ]}
          />
          <Note>
            [Confirm exactly what's logged once this is finalized — e.g. do server/error logs
            capture submitted targets or IPs, and for how long? Update this section to match reality
            before publishing, since claiming "no logs" when logs exist is a real compliance
            problem, not just a documentation gap.]
          </Note>

          <SubHeading>3.3 Cookies / local storage</SubHeading>
          <Note>
            [Confirm: does the frontend use any cookies or browser storage today — e.g. for
            rate-limit tracking or UI preferences? If yes, list what and why. If none, state that
            explicitly: "The Service does not currently use cookies or tracking technologies."]
          </Note>

          <SubHeading>3.4 Payment information (future)</SubHeading>
          <P>
            If paid tiers are introduced, payment processing will be handled by a third-party
            payment processor (e.g. Stripe, Razorpay). We will not directly store your full card
            details. This section will be expanded with specifics once a payment provider is chosen.
          </P>
        </Section>

        <Section id="what-we-dont-do" title="4. What we do not do">
          <Bullets
            items={[
              "We do not require you to create an account or provide your name, email, or other identity information to use the core tools.",
              "We do not sell your data. There is nothing meaningful to sell, since we don't retain personally identifiable scan history.",
              "We do not run advertising trackers or third-party analytics that build an advertising profile of you. [Confirm: if you add Google Analytics or similar later, this line must be updated and a cookie notice added.]",
            ]}
          />
        </Section>

        <Section id="third-party-services" title="5. Third-party services we rely on">
          <P>
            Running a scan or lookup may involve sending your target (not your personal identity) to
            these categories of third-party services:
          </P>
          <Bullets
            items={[
              <>
                <strong className="text-[#ffffff]">GeoIP/IP intelligence providers</strong> — to
                resolve location and network ownership data for an IP or domain you submit.
              </>,
              <>
                <strong className="text-[#ffffff]">WHOIS/RDAP registries</strong> — to retrieve
                domain/IP registration records.
              </>,
              <>
                <strong className="text-[#ffffff]">
                  The National Vulnerability Database (NVD)
                </strong>{" "}
                — to retrieve CVE data related to detected software/services.
              </>,
              <>
                <strong className="text-[#ffffff]">AI model providers (Groq, Google Gemini)</strong>{" "}
                — to generate AI-assisted summaries and remediation suggestions. The scan findings
                you generate may be sent to these providers' APIs to produce the AI report.
                [Confirm: check Groq's and Google's API data-retention/training-use policies and
                link to them here, since you are forwarding user-submitted scan data to their APIs.]
              </>,
            ]}
          />
          <P>
            We do not control these third parties' own privacy practices. Review their respective
            privacy policies if you have concerns about a specific provider.
          </P>
        </Section>

        <Section id="data-retention" title="6. Data retention">
          <P>
            Because the Service does not persistently store scan results tied to a user, there is
            generally nothing to retain beyond the active session.
          </P>
          <Note>
            [Confirm and state explicitly: how long do server/access logs persist, if at all? E.g.
            "Server logs, which may include IP addresses, are retained for up to [X] days for
            security and abuse-prevention purposes, then deleted."]
          </Note>
        </Section>

        <Section id="data-security" title="7. Data security">
          <P>
            We take reasonable technical measures to protect data in transit (e.g. HTTPS) and limit
            what is collected in the first place by not requiring accounts or persistent storage.
            However, no system can be guaranteed 100% secure, and we cannot guarantee absolute
            security of any data transmitted to or processed by the Service.
          </P>
          <P>
            If a security incident affecting user data occurs, we will take reasonable steps to
            notify affected users and relevant authorities as required by applicable law.
          </P>
        </Section>

        <Section id="your-rights" title="8. Your rights">
          <P>
            Because the Service does not tie scan data to your identity or require an account, there
            is generally no stored personal data tied to you for us to provide, correct, or delete
            on request. If this changes (e.g. with future account features), this section will be
            updated to describe how to exercise applicable rights, which may include rights under
            India's Digital Personal Data Protection Act, 2023, such as the right to access,
            correct, or erase your personal data, and to withdraw consent.
          </P>
          <P>
            If you believe we hold data about you and want to inquire, contact us at the email in
            Section 11.
          </P>
        </Section>

        <Section id="childrens-privacy" title="9. Children's privacy">
          <P>
            The Service is not directed at children under [18], and we do not knowingly collect
            personal data from children. If you believe a child has used the Service in a way that
            involves their personal data, contact us so we can address it.
          </P>
        </Section>

        <Section id="international-users" title="10. International users">
          <P>
            The Service is operated from India. If you access it from outside India, your
            target/lookup data may be processed in India and by third-party providers located in
            other countries, including the United States (for AI providers like Groq and Google). By
            using the Service, you consent to this processing.
          </P>
        </Section>

        <Section id="changes" title="11. Changes to this Policy">
          <P>
            We may update this Privacy Policy from time to time. The "Last updated" date above
            reflects the most recent revision. Material changes (such as introducing persistent
            storage or accounts) will be highlighted clearly, not buried in a routine update.
          </P>
        </Section>

        <Section id="contact" title="12. Contact">
          <P>
            For privacy questions or requests, contact:{" "}
            <strong className="text-[#ffffff]">
              [support email — not yet set up; add one before publishing, e.g.
              privacy@cybersec1.tech]
            </strong>
          </P>
        </Section>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-sm leading-relaxed text-[#aaaaaa] italic">
            This document is a template and does not constitute legal advice. Consult a qualified
            lawyer or data-protection professional before relying on it, particularly regarding
            DPDPA 2023 compliance.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
