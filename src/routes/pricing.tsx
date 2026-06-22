import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronDown } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroGrid from "../../assets/GRID.png";
import previewVector from "../../assets/Vector.png";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
  head: () => ({
    meta: [
      { title: "CyberSec — Pricing" },
      {
        name: "description",
        content: "Simple pricing plans for CyberSec vulnerability scanning and reporting.",
      },
    ],
  }),
});

const plans = [
  {
    name: "Starter",
    price: "$19",
    cta: "Get Started",
    features: ["Up to 5 team members", "10 GB storage", "Basic analytics"],
  },
  {
    name: "Pro",
    price: "$59",
    cta: "Get Started",
    featured: true,
    badge: "-20 %",
    features: [
      "Unlimited team members",
      "500 GB storage",
      "Advanced analytics & reports",
      "SSO & custom domain",
    ],
  },
  {
    name: "Enterprise",
    price: "$149",
    cta: "Get Started",
    features: [
      "Everything in Pro",
      "5 TB storage",
      "Dedicated account manager",
      "SLA guarantee (99.99%)",
    ],
  },
];

const faqs = [
  {
    question: "What counts as one scan or lookup?",
    answer:
      "Each time you run a tool against a target — a Port Scanner run, a Geo IP lookup, a WHOIS query, a Ping, etc. — counts as one scan against your plan's limit.",
  },
  {
    question: "Do unused scans roll over to the next month?",
    answer: "No rollover policy — unused scans do not carry over to the next billing period.",
  },
  {
    question: "What happens when I hit my plan's scan limit?",
    answer:
      "You'll see a notice in the tool letting you know you've reached your limit, and further scans will be blocked until your limit resets (or you upgrade). Results from scans you've already run remain accessible.",
  },
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes. Upgrades take effect immediately; downgrades take effect at the start of your next billing cycle so you don't lose access mid-cycle.",
  },
  {
    question: "Is there a free trial of Pro, Team, or Enterprise?",
    answer: "No free trial is currently offered for paid plans.",
  },
  {
    question: "Do you offer monthly and annual billing?",
    answer: "Yes. Annual billing is offered at a discount compared to paying monthly.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit card payments and PayPal. Enterprise customers can pay via invoice.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Canceling stops future billing; you keep access through the end of your current paid period. No long-term contract is required outside Enterprise agreements.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Full refund within 7 days of a new subscription, no refunds on renewals.",
  },
  {
    question: "What can I do on the Free plan?",
    answer:
      "You get full access to every tool in the toolkit — there are no feature-locked tools — but with a lower number of scans per day than the paid plans. It's meant for occasional use, testing the toolkit out, or light personal projects.",
  },
  {
    question: "Is the Free plan really free forever?",
    answer: "Yes, the Free plan is free forever with no credit card required.",
  },
  {
    question: "Why is my Free plan scan limit measured per day, not per month?",
    answer:
      "Smaller, more frequent resets keep the Free tier usable for casual needs without requiring a long wait if you hit the limit.",
  },
  {
    question: "Who is the Pro plan for?",
    answer:
      "Individual users — freelancers, students, independent security researchers, or developers — who scan regularly enough that the Free plan's daily limit isn't enough, but who don't need multiple seats or team features.",
  },
  {
    question: "How many scans do I get on Pro?",
    answer: "Scans per month, reset on your billing date (not the calendar month).",
  },
  {
    question: "Does Pro include every tool?",
    answer:
      "Yes — every plan, including Free, includes every tool in the toolkit. Plans differ by scan volume and seats, not by which tools you can access.",
  },
  {
    question: "What's different about Team vs. Pro?",
    answer:
      "Team includes multiple seats, so multiple people on the same organization can run scans under one subscription, plus a higher combined scan allowance than a single Pro seat.",
  },
  {
    question: "How are scans shared across the team?",
    answer:
      "All seats on a Team plan draw from one shared monthly scan pool, not per individual seat.",
  },
  {
    question: "Can I add more seats to my Team plan?",
    answer:
      "Yes, additional seats can be added per seat/month, billed at a prorated rate for the remainder of your current cycle.",
  },
  {
    question: "Do Team members share scan history and results?",
    answer: "Each member's history stays private within their own account.",
  },
  {
    question: "What does Enterprise include that Team doesn't?",
    answer:
      "Custom/unlimited scan volume, dedicated support, SSO, custom contract terms, on-premise or private deployment options, SLA guarantees, and audit logs.",
  },
  {
    question: "How is Enterprise pricing determined?",
    answer:
      "Enterprise pricing is custom, based on scan volume, number of seats, and any additional requirements like SSO or dedicated support. Contact us for a quote.",
  },
  {
    question: "Can Enterprise customers get a custom scan limit or unlimited usage?",
    answer: "Enterprise plans can have custom scan limits or unlimited usage based on your needs.",
  },
  {
    question: "Do you offer dedicated support for Enterprise customers?",
    answer: "Yes, Enterprise customers get dedicated support with guaranteed response time SLA.",
  },
];

function PricingCard({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-xl border p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] ${
        plan.featured
          ? "min-h-[480px] border-[#8062af] bg-[linear-gradient(180deg,rgba(110,54,170,0.82)_0%,rgba(0,0,0,0.94)_42%)]"
          : "min-h-[410px] border-white/18 bg-[#403b4e]/72 backdrop-blur-md"
      }`}
    >
      {!plan.featured && (
        <img
          src={previewVector}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-36%] top-0 h-[240px] max-w-none opacity-60"
        />
      )}
      <div className="relative z-10 flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#f7f2ff]">{plan.name}</h2>
        {plan.badge ? (
          <span className="rounded-full bg-white/16 px-6 py-2 text-xs font-semibold text-[#d8d0e4]">
            {plan.badge}
          </span>
        ) : null}
      </div>

      <div className="relative z-10 mt-8 flex items-end gap-1">
        <span className="text-5xl leading-none font-bold text-white md:text-6xl">{plan.price}</span>
        <span className="pb-1.5 text-xs font-medium text-[#e5deed]">/mo per user</span>
      </div>

      {plan.featured ? (
        <div className="pro-cta-glow relative z-10 mt-7 rounded-full">
          <div className="pro-cta-border relative z-10 overflow-hidden rounded-full p-[1.5px]">
            <button className="relative z-10 h-12 w-full rounded-full bg-black text-sm font-bold text-[#a8a3ad] transition hover:text-[#d2ccd6]">
              {plan.cta}
            </button>
          </div>
        </div>
      ) : (
        <div className="white-cta-glow relative z-10 mt-7 rounded-full">
          <button className="relative z-10 h-11 w-full rounded-full bg-gradient-to-b from-[#f2eef5] to-[#c7c0ca] text-sm font-bold text-[#120d19] transition hover:scale-[1.02]">
            {plan.cta}
          </button>
        </div>
      )}

      <ul className="relative z-10 mt-8 space-y-4 text-[#ded8e7]">
        {plan.features.map((feature) => (
          <li key={feature} className="font-body flex items-center gap-3 text-xs md:text-sm">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center ${
                plan.featured ? "rounded-lg bg-white text-black" : "text-white"
              }`}
            >
              <Check className="h-4 w-4 stroke-[3]" />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Pricing() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <style>{`
        .scan-cta-gradient::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background: conic-gradient(from 145deg at 50% 50%, #F97316 0deg, #F97316 62deg, #24101a 126deg, #0a0810 190deg, #3e1a72 258deg, #A985FF 318deg, #F97316 360deg);
        }

        .scan-cta-glow::before {
          content: "";
          position: absolute;
          inset: -10px;
          z-index: 0;
          border-radius: inherit;
          background: conic-gradient(from 145deg at 50% 50%, #F97316 0deg, #F9731675 80deg, #0000 150deg, #8B5CF64D 250deg, #A985FF 320deg, #F97316 360deg);
          filter: blur(14px);
          opacity: 0.44;
          transition:
            opacity 180ms ease,
            filter 180ms ease;
        }

        .scan-cta-glow:hover::before {
          filter: blur(20px);
          opacity: 0.78;
        }

        .pro-cta-border::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background: conic-gradient(from 222deg at 50% 50%, #8B5CF6 0deg, #8B5CF6 78deg, #151019 132deg, #000 190deg, #4f2a14 252deg, #F97316 318deg, #8B5CF6 360deg);
        }

        .pro-cta-glow::before {
          content: "";
          position: absolute;
          inset: -20px -24px;
          z-index: 0;
          border-radius: inherit;
          background: conic-gradient(from 222deg at 50% 50%, #8B5CF680 0deg, #8B5CF666 82deg, #0000 156deg, #F973162E 258deg, #F9731670 320deg, #8B5CF680 360deg);
          filter: blur(22px);
          opacity: 0.52;
          transition:
            opacity 180ms ease,
            filter 180ms ease;
        }

        .pro-cta-glow:hover::before {
          filter: blur(28px);
          opacity: 0.82;
        }

        .white-cta-glow::before {
          content: "";
          position: absolute;
          inset: -12px -18px;
          z-index: 0;
          border-radius: inherit;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.34), rgba(210,198,226,0.18) 42%, transparent 72%);
          filter: blur(16px);
          opacity: 0.78;
          transition:
            opacity 180ms ease,
            filter 180ms ease;
        }

        .white-cta-glow:hover::before {
          filter: blur(22px);
          opacity: 1;
        }
      `}</style>
      <section className="relative isolate overflow-hidden pt-[88px]">
        <div className="pointer-events-none absolute top-[-56px] left-1/2 z-0 h-[390px] w-[min(780px,100vw)] -translate-x-1/2 rounded-full bg-[#8e45dc] opacity-70 blur-[190px]" />
        <img
          src={heroGrid}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 z-0 h-[300px] w-[min(820px,100vw)] -translate-x-1/2 object-fill opacity-60 mix-blend-screen"
        />
        <div className="relative z-10">
          <SiteNavbar />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-14 text-center md:pt-16">
          <div className="scan-cta-glow relative inline-block rounded-full">
            <div className="scan-cta-gradient relative z-10 inline-block overflow-hidden rounded-full p-[1.5px]">
              <div className="relative z-10 min-w-[190px] rounded-full bg-[#0a0810] px-11 py-3 text-center text-sm font-medium text-[#efe9f8]">
                Pricing Plans
              </div>
            </div>
          </div>
          <h1 className="font-heading mt-7 text-4xl leading-tight font-medium tracking-normal whitespace-nowrap md:text-[70px]">
            Simple Plans.
            <br />
            Enterprise <span className="text-[#a985ff]">Security.</span>
          </h1>
          <p className="font-body mx-auto mt-2.5 max-w-[520px] text-lg leading-relaxed text-[#d7d0df]">
            Choose the plan that fits your needs.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-12 grid max-w-5xl items-center gap-5 px-6 pb-[80px] md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <img
          src={previewVector}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-18%] bottom-[-48px] left-[-18%] z-0 h-[540px] w-[136%] max-w-none object-fill opacity-80"
        />
      </section>

      <section className="relative px-6 pt-8 pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full bg-black px-12 py-2 text-sm text-[#eee8f8] shadow-[0_0_32px_rgba(168,85,247,0.34)]">
            FAQs
          </div>
          <h2 className="font-heading mt-8 text-3xl leading-tight font-medium tracking-normal whitespace-nowrap md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="font-body mt-4 text-sm text-[#ded8e7] md:text-base">
            Everything you need to know about our pricing
          </p>

          <div className="mt-9 text-left">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={`${faq.question}-${index}`}
                  value={`item-${index}`}
                  className="rounded-xl border border-[#6c588c] bg-[#24173d]"
                >
                  <AccordionTrigger className="px-6 py-5 text-sm text-[#eee8f8] hover:text-[#eee8f8] hover:no-underline md:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-sm text-[#ded8e7] md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="mt-10 text-base text-[#ded8e7]">
            Still have questions ?{" "}
            <a href="/contact" className="text-[#a985ff] underline underline-offset-4">
              Contact Us
            </a>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
