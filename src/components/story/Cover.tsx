import type { CoverKind } from "@/data/slides";

/**
 * Generated cover art for featured projects. Conveys what the project is,
 * needs no external asset. A real `image` (when provided) overrides this.
 */
export default function Cover({
  kind,
  image,
  alt,
}: {
  kind?: CoverKind;
  image?: string;
  alt: string;
}) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={image}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="bg-lines absolute inset-0 opacity-30" />
      <svg
        viewBox="0 0 400 225"
        className="relative h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {kind === "pendulum" && <Pendulum />}
        {kind === "vc" && <VC />}
        {kind === "model" && <Model />}
        {kind === "redact" && <Redact />}
        {kind === "zucc" && <Zucc />}
        {kind === "btree" && <BTree />}
        {(!kind || kind === "grid") && <Grid />}
      </svg>
    </div>
  );
}

const A = "var(--accent)";
const F = "var(--foreground)";
const M = "var(--muted)";

function Pendulum() {
  // trace of a chaotic path + two rods
  const pts =
    "200,70 232,96 250,140 235,176 196,182 168,150 178,108 214,90 246,118 240,160";
  return (
    <g fill="none">
      <polyline points={pts} stroke={A} strokeWidth="1.5" opacity="0.5" />
      <line x1="200" y1="40" x2="246" y2="118" stroke={F} strokeWidth="2.5" />
      <line x1="246" y1="118" x2="240" y2="160" stroke={A} strokeWidth="2.5" />
      <circle cx="200" cy="40" r="4" fill={M} />
      <circle cx="246" cy="118" r="6" fill={F} />
      <circle cx="240" cy="160" r="7" fill={A} />
    </g>
  );
}

function VC() {
  const bars = [40, 95, 70, 140, 120, 175];
  return (
    <g>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={60 + i * 50}
          y={195 - h}
          width="26"
          height={h}
          fill={i === bars.length - 1 ? A : M}
          opacity={i === bars.length - 1 ? 1 : 0.5}
        />
      ))}
      <path
        d="M60 150 L110 120 L160 135 L210 90 L260 100 L320 45"
        fill="none"
        stroke={F}
        strokeWidth="2"
      />
      <path d="M320 45 l-14 2 l6 -13 z" fill={F} />
    </g>
  );
}

function Model() {
  const dots: [number, number, boolean][] = [
    [90, 70, true],
    [120, 110, true],
    [150, 80, true],
    [180, 130, true],
    [110, 160, false],
    [160, 150, false],
    [220, 95, true],
    [250, 150, false],
    [290, 120, false],
    [300, 170, false],
    [200, 175, false],
    [80, 120, true],
  ];
  return (
    <g>
      <line
        x1="60"
        y1="40"
        x2="340"
        y2="200"
        stroke={A}
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />
      {dots.map(([x, y, hit], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={hit ? A : M} opacity={hit ? 1 : 0.6} />
      ))}
    </g>
  );
}

function Redact() {
  const rows = [
    [40, 70, 40, 0],
    [90, 60, 50, 70],
    [70, 90, 0, 0],
    [50, 30, 80, 30],
  ];
  let y = 60;
  return (
    <g>
      {rows.map((widths, r) => {
        let x = 60;
        const line = (
          <g key={r}>
            {widths.map((w, i) => {
              if (w === 0) return null;
              const isBlock = i % 2 === 1;
              const rect = (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={w}
                  height="10"
                  fill={isBlock ? A : M}
                  opacity={isBlock ? 1 : 0.4}
                />
              );
              x += w + 8;
              return rect;
            })}
          </g>
        );
        y += 26;
        return line;
      })}
    </g>
  );
}

function Zucc() {
  return (
    <g fill="none" stroke={A} strokeWidth="2">
      <circle cx="200" cy="112" r="55" stroke={M} opacity="0.5" />
      <path d="M150 95 q50 -40 100 0" />
      <path d="M150 130 q50 40 100 0" stroke={F} />
      <circle cx="200" cy="112" r="10" fill={A} stroke="none" />
    </g>
  );
}

function BTree() {
  const node = (x: number, y: number, accent = false) => (
    <rect
      x={x}
      y={y}
      width="46"
      height="22"
      fill={accent ? A : "none"}
      stroke={accent ? A : M}
      strokeWidth="2"
    />
  );
  return (
    <g>
      <line x1="200" y1="62" x2="120" y2="120" stroke={M} strokeWidth="1.5" />
      <line x1="200" y1="62" x2="200" y2="120" stroke={M} strokeWidth="1.5" />
      <line x1="200" y1="62" x2="280" y2="120" stroke={M} strokeWidth="1.5" />
      {node(177, 40, true)}
      {node(97, 120)}
      {node(177, 120)}
      {node(257, 120)}
    </g>
  );
}

function Grid() {
  const dots = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 9; c++)
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={40 + c * 40}
          cy={45 + r * 35}
          r="3"
          fill={(r + c) % 4 === 0 ? A : M}
          opacity={(r + c) % 4 === 0 ? 1 : 0.4}
        />
      );
  return <g>{dots}</g>;
}
