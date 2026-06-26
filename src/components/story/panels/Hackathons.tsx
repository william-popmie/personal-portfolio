import Panel from "@/components/story/Panel";
import Tile from "@/components/story/Tile";
import { hackathonTiles } from "@/data/slides";

export default function Hackathons() {
  return (
    <Panel index="02" kicker="Hackathons" soft>
      <div className="mb-8">
        <h2 className="display text-[14vw] leading-[0.82] sm:text-[9vw] lg:text-[7vw]">
          4 countries.
          <br />
          <span className="text-accent">Laptop, will travel.</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {hackathonTiles.map((t) => (
          <Tile key={t.name} tile={t} />
        ))}
      </div>
    </Panel>
  );
}
