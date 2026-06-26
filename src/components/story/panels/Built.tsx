import Panel from "@/components/story/Panel";
import FeaturedTile from "@/components/story/FeaturedTile";
import Tile from "@/components/story/Tile";
import { builtTiles } from "@/data/slides";

export default function Built() {
  const featured = builtTiles.filter((t) => t.featured);
  const rest = builtTiles.filter((t) => !t.featured);
  return (
    <Panel
      id="built"
      label="Projects"
      index="03"
      kicker="Projects & coursework"
      title={
        <>
          Things I <span className="text-accent">built.</span>
        </>
      }
      lead="Simulators, databases, dev tools. A lot of it shipped during exam season, when I should've been studying."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((t) => (
          <FeaturedTile key={t.name} tile={t} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {rest.map((t) => (
          <Tile key={t.name} tile={t} />
        ))}
      </div>
    </Panel>
  );
}
