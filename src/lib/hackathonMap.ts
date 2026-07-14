import DottedMap from "dotted-map";
import { hackathons } from "@/data/content";

// Runs at build time (server). Produces the dotted map SVG + pin coordinates
// (in viewBox units) for the scroll-driven MapJourney.
// Atlantic-centered crop: full Americas + Europe + Africa, Asia mostly cut —
// still reads as a world map, but frames the hackathon cities much tighter
// than the full 360° world would.
const map = new DottedMap({
  height: 160,
  grid: "diagonal",
  region: { lat: { min: -58, max: 85 }, lng: { min: -170, max: 180 } },
});

const dotsSvg = map
  .getSVG({
    radius: 0.2,
    color: "#353535ff",
    shape: "circle",
    backgroundColor: "transparent",
  })
  // show the whole world, contained (floats in whitespace — no box/edge)
  .replace("<svg ", '<svg preserveAspectRatio="xMidYMid meet" ');

const [, , vbW, vbH] = (
  dotsSvg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 100 50"
)
  .split(" ")
  .map(Number);

export type MapData = {
  dotsSvg: string;
  vbW: number;
  vbH: number;
  pins: { city: string; x: number; y: number }[];
};

export const mapData: MapData = {
  dotsSvg,
  vbW,
  vbH,
  pins: hackathons.map((h) => {
    const p = map.getPin({ lat: h.lat, lng: h.lng });
    return { city: h.city, x: p?.x ?? 0, y: p?.y ?? 0 };
  }),
};
