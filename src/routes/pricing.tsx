import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronDown } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
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
  "Can I change my plan later ?",
  "Can I change my plan later ?",
  "Can I change my plan later ?",
  "Can I change my plan later ?",
  "Can I change my plan later ?",
];

function PricingCard({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <article
      className={`relative flex min-h-[410px] flex-col overflow-hidden rounded-xl border p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] ${
        plan.featured
          ? "border-[#8062af] bg-[linear-gradient(180deg,rgba(110,54,170,0.82)_0%,rgba(0,0,0,0.94)_42%)]"
          : "border-white/18 bg-[#403b4e]/72 backdrop-blur-md"
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

          <div className="mt-9 space-y-3 text-left">
            {faqs.map((faq, index) => (
              <button
                key={`${faq}-${index}`}
                className="flex w-full items-center justify-between rounded-xl border border-[#6c588c] bg-[#24173d] px-6 py-5 text-sm text-[#eee8f8] transition hover:border-[#9478c4] md:text-base"
              >
                <span>{faq}</span>
                <ChevronDown className="h-5 w-5" />
              </button>
            ))}
          </div>

          <p className="mt-10 text-base text-[#ded8e7]">
            Still have questions ?{" "}
            <a href="/contact" className="text-[#a985ff] underline underline-offset-4">
              Contact Us
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
