import { site } from "@/data/site";

export default function Intro() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between px-6 py-16 sm:px-12 lg:px-20">
      <div className="bg-lines pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="relative flex items-center justify-between">
        <span className="kicker text-muted">00 — Portfolio</span>
        <span className="kicker text-muted">{site.name}</span>
      </div>

      <div className="relative">
        <h1 className="display text-[15vw] leading-[0.86] sm:text-[12vw] lg:text-[9.5vw]">
          William
          <br />
          Ragnarsson
          <br />
          <span className="text-accent">builds cool shit.</span>
        </h1>
      </div>

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-md text-muted">
          CS student · ex-VC intern · full-time builder.
        </p>
        <p className="kicker flex items-center gap-3 text-foreground">
          scroll
          <span className="inline-block h-px w-12 bg-accent" />
          <span className="text-accent">→</span>
        </p>
      </div>
    </section>
  );
}
