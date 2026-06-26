import Panel from "@/components/story/Panel";
import Tile from "@/components/story/Tile";
import { builtTiles } from "@/data/slides";

export default function Built() {
  return (
    <Panel index="03" kicker="Built when I should've been studying">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="display text-[12vw] leading-[0.82] sm:text-[8vw] lg:text-[6vw]">
          Things I <span className="text-accent">made</span>
        </h2>
        <p className="max-w-xs text-sm text-muted">
          Exam season is when my best procrastination ships.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-3">
        {builtTiles.map((t) => (
          <Tile key={t.name} tile={t} />
        ))}
      </div>
    </Panel>
  );
}
