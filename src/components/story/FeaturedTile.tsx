import type { Tile as TileData } from "@/data/slides";
import Cover from "./Cover";
import { ArrowUpRight } from "@/components/ui/icons";

/**
 * Large project card: cover art on top, then name, a real description, tags.
 * Sharp corners. Whole card links out when it has a destination.
 */
export default function FeaturedTile({ tile }: { tile: TileData }) {
  const href = tile.demo ?? tile.link ?? tile.repo;
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="group flex h-full flex-col border border-border bg-background-soft transition-colors duration-200 hover:border-accent"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
        <Cover kind={tile.cover} image={tile.image} alt={tile.name} />
        {tile.meta ? (
          <span className="absolute left-3 top-3 bg-background/80 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-accent backdrop-blur">
            {tile.meta}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {tile.name}
          </h3>
          {href ? (
            <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
          ) : null}
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {tile.description ?? tile.blurb}
        </p>

        {tile.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tile.tags.map((t) => (
              <span
                key={t}
                className="border border-border px-2 py-1 font-mono text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
}
