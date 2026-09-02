import { Reveal } from "@/components/reveal";

export function SecurityStandardSection() {
  return (
    <section className="border-y border-border/50 bg-background px-6 py-14 md:py-16 lg:min-h-[245px] lg:py-[53px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="max-w-[1260px] font-heading text-[clamp(2rem,2.5vw,2.5rem)] font-medium leading-[1.04] tracking-[-0.035em] text-muted-foreground">
            <span className="text-foreground">A new species of security tool.</span> Purpose-built
            for solo builders and lean teams who ship fast, CyberSec Toolkit sets a new standard for
            finding and fixing what attackers see first.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
