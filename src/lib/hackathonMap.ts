import DottedMap from "dotted-map";
import { hackathons } from "@/data/content";

// Runs at build time (server). Produces a full-globe dotted map SVG + pin
// coordinates (in viewBox units) for the HackathonMap section.
const map = new DottedMap({ height: 60, grid: "diagonal" });

const rawSvg = map.getSVG({
  radius: 0.32,
  color: "#8f8b7f", // muted dark grey on the warm-paper background
  shape: "circle",
  backgroundColor: "transparent",
});

// Parse the generated viewBox (dotted-map bounds the dots tightly, so the
// northern continents sit flush at the top edge → looks "cut off").
const [ox, oy, ow, oh] = (rawSvg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 100 50")
  .split(" ")
  .map(Number);

// Pad the window so there's ocean/breathing room around the whole map. A bit
// more on top, where the chop was most visible. Pins keep the ORIGINAL dot
// coordinate space; only the visible window grows.
const PAD_TOP = 10;
const PAD_BOTTOM = 6;
const PAD_X = 6;
const vbX = ox - PAD_X;
const vbY = oy - PAD_TOP;
const vbW = ow + PAD_X * 2;
const vbH = oh + PAD_TOP + PAD_BOTTOM;

const dotsSvg = rawSvg
  .replace("<svg ", '<svg preserveAspectRatio="xMidYMid meet" ')
  .replace(/viewBox="[^"]+"/, `viewBox="${vbX} ${vbY} ${vbW} ${vbH}"`);

export type MapData = {
  dotsSvg: string;
  vbX: number;
  vbY: number;
  vbW: number;
  vbH: number;
  pins: { city: string; x: number; y: number }[];
};

export const mapData: MapData = {
  dotsSvg,
  vbX,
  vbY,
  vbW,
  vbH,
  pins: hackathons.map((h) => {
    const p = map.getPin({ lat: h.lat, lng: h.lng });
    return { city: h.city, x: p?.x ?? 0, y: p?.y ?? 0 };
  }),
};
