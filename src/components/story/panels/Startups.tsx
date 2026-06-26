import Panel from "@/components/story/Panel";
import Tile from "@/components/story/Tile";
import { startupTiles } from "@/data/slides";

export default function Startups() {
  const [lead, ...rest] = startupTiles;
  return (
    <Panel index="01" kicker="Plug & Play · VC Intern">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="display text-[20vw] leading-[0.8] text-accent sm:text-[10vw] lg:text-[8vw]">
            Top 6
          </p>
          <p className="mt-2 text-lg text-muted sm:text-xl">
            of 250+ interns. Then I tried to automate the whole job.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border">
          <Tile tile={lead} className="col-span-2" />
          {rest.map((t) => (
            <Tile key={t.name} tile={t} />
          ))}
        </div>
      </div>
    </Panel>
  );
}
