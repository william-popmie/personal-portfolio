import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { ArrowUpRight } from "@/components/ui/icons";

export default function PlugAndPlay() {
  return (
    <section className="mx-auto max-w-[820px] px-6 py-24 sm:py-32">
      <Reveal>
        <p className="kicker text-accent">01 — The internship</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="display mt-5 text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.05]">
          Internship @ Plug and Play, located in{" "}
          <span className="text-accent">San Francisco</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-7 text-lg leading-relaxed text-muted">
          I spent it as a VC intern, reading pitch decks all day — so I{" "}
          <span className="font-medium text-foreground">
            built an AI for end-to-end VC analysis
          </span>
          . Paste a deck, get scored like a partner would score it.
        </p>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-8 flex flex-wrap gap-5 text-sm">
          <a
            href={site.vcDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium transition-colors hover:text-accent"
          >
            Try it out yourself <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/william-popmie/vc-analyst"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
          >
            Source <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
