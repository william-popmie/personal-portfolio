import type { Tile as TileData } from "@/data/slides";
import { ArrowUpRight } from "@/components/ui/icons";

/**
 * Sharp, borderless-grid project tile. No rounded corners.
 * Whole tile is a link when it has one; hover floods the name red.
 */
export default function Tile({
  tile,
  className,
}: {
  tile: TileData;
  className?: string;
}) {
  const href = tile.demo ?? tile.link ?? tile.repo;
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`group relative flex flex-col justify-between bg-background p-5 transition-colors duration-200 hover:bg-foreground hover:text-background ${
        tile.featured ? "sm:p-7" : ""
      } ${className ?? ""}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`font-bold tracking-tight transition-colors group-hover:text-background ${
              tile.featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            <span className="text-accent group-hover:text-background">
              {tile.name}
            </span>
          </h3>
          {href ? (
            <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-background" />
          ) : null}
        </div>
        <p
          className={`mt-1.5 text-muted transition-colors group-hover:text-background/80 ${
            tile.featured ? "text-base" : "text-sm"
          }`}
        >
          {tile.blurb}
        </p>
      </div>

      {tile.meta ? (
        <p className="kicker mt-6 text-muted transition-colors group-hover:text-background/70">
          {tile.meta}
        </p>
      ) : null}
    </Wrapper>
  );
}
