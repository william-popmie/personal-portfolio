import Panel from "@/components/story/Panel";
import FeaturedTile from "@/components/story/FeaturedTile";
import Tile from "@/components/story/Tile";
import { hackathonTiles } from "@/data/slides";

export default function Hackathons() {
  const featured = hackathonTiles.filter((t) => t.featured);
  const rest = hackathonTiles.filter((t) => !t.featured);
  return (
    <Panel
      id="hackathons"
      label="Hackathons"
      index="02"
      kicker="Hackathons"
      soft
      title={
        <>
          Four countries, <span className="text-accent">four builds.</span>
        </>
      }
      lead="I book the flight first and figure out the project on the plane. New York, Berlin, Stockholm, Belgium — a couple of podiums along the way."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((t) => (
          <FeaturedTile key={t.name} tile={t} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
        {rest.map((t) => (
          <Tile key={t.name} tile={t} />
        ))}
      </div>
    </Panel>
  );
}
