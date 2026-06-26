import Panel from "@/components/story/Panel";
import FeaturedTile from "@/components/story/FeaturedTile";
import Tile from "@/components/story/Tile";
import { startupTiles } from "@/data/slides";

const stats = [
  { v: "Top 6", l: "of 250+ interns" },
  { v: "800+", l: "decks reviewed" },
  { v: "765", l: "labeled by hand" },
];

export default function Startups() {
  const featured = startupTiles.filter((t) => t.featured);
  const rest = startupTiles.filter((t) => !t.featured);
  return (
    <Panel
      id="startups"
      label="Startups"
      index="01"
      kicker="Internship — Plug & Play"
      title={
        <>
          A year inside <span className="text-accent">startups.</span>
        </>
      }
      lead="VC intern at Plug & Play, one of the world's most active accelerators. Finished top 6 of 250+ interns — then, because I'm technical, I built AI to do the judgment myself."
    >
      {/* stat strip */}
      <div className="mb-6 grid grid-cols-3 gap-px border border-border bg-border">
        {stats.map((s) => (
          <div key={s.l} className="bg-background px-4 py-3">
            <div className="text-xl font-bold text-accent sm:text-2xl">
              {s.v}
            </div>
            <div className="mt-0.5 text-xs text-muted">{s.l}</div>
          </div>
        ))}
      </div>

      {/* 2 featured above */}
      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((t) => (
          <FeaturedTile key={t.name} tile={t} />
        ))}
      </div>

      {/* 3 compact below */}
      <div className="mt-4 grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
        {rest.map((t) => (
          <Tile key={t.name} tile={t} />
        ))}
      </div>
    </Panel>
  );
}
