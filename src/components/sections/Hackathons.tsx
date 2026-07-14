import Reveal from "@/components/Reveal";
import HackathonMap from "@/components/HackathonMap";
import { mapData } from "@/lib/hackathonMap";

export default function Hackathons() {
  return (
    <section id="hackathons" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[820px] px-6">
        <Reveal>
          <p className="kicker text-accent-2">02 — Hackathons</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mt-5 text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.05]">
            I also really love{" "}
            <span className="text-accent-2">hackathons</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Four cities, four builds, a couple of awards — I book the flight
            first and figure out the project on the plane.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 sm:mt-20">
        <HackathonMap data={mapData} />
      </div>
    </section>
  );
}
