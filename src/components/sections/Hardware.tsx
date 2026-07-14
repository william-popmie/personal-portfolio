import Reveal from "@/components/Reveal";

export default function Hardware() {
  return (
    <section className="mx-auto max-w-[820px] px-6 py-24 sm:py-32">
      <Reveal>
        <p className="kicker text-accent">04 — Before software</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="display mt-5 text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.05]">
          I did my own{" "}
          <span className="text-accent">startup</span> in my first year of
          university.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-7 text-lg leading-relaxed text-muted">
          This was a hardware startup, one I&apos;ve luckily moved on from —{" "}
          <span className="font-medium text-foreground">
            100% head first into software
          </span>{" "}
          now.
        </p>
      </Reveal>
    </section>
  );
}
