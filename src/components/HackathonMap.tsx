"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MapData } from "@/lib/hackathonMap";
import { hackathons, type Hackathon } from "@/data/content";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "@/components/ui/icons";

const CORAL = "#ff5a4d";
const MUTED = "#6b6a60";
const CYCLE_MS = 4500;

function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

export default function HackathonMap({ data }: { data: MapData }) {
  const wide = useWide();

  return (
    <div className="mx-auto max-w-[1240px] px-6">
      {wide ? <AtlasLayout data={data} /> : <StackedLayout data={data} />}
    </div>
  );
}

/* ── Desktop: a large, fully-static map with numbered pins. One detail card
   shows at a time and auto-cycles, with a single connector line gliding to
   the active pin. The map itself never pans, zooms, or transforms. ── */
type Line = { x1: number; y1: number; x2: number; y2: number };

function AtlasLayout({ data }: { data: MapData }) {
  const reduce = useReducedMotion();
  const n = hackathons.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState<Line | null>(null);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, paused, n]);

  // Any manual selection (pin, dot, arrow) pauses autoplay too — otherwise a
  // pending interval tick can silently override the user's choice a moment
  // later, since hover-pause alone doesn't cover keyboard/programmatic clicks.
  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const map = mapRef.current;
      const card = cardRef.current;
      if (!wrap || !map || !card) return;
      const wr = wrap.getBoundingClientRect();
      const mr = map.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      const pin = data.pins[active];
      const fx = (pin.x - data.vbX) / data.vbW;
      const fy = (pin.y - data.vbY) / data.vbH;
      setLine({
        x1: cr.left - wr.left + cr.width / 2,
        y1: cr.top - wr.top,
        x2: mr.left - wr.left + fx * mr.width,
        y2: mr.top - wr.top + fy * mr.height,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [data, active]);

  const current = hackathons[active];

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto max-w-[880px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* static map, hero-sized, fully visible */}
      <div
        ref={mapRef}
        className="relative w-full [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
        style={{ aspectRatio: `${data.vbW} / ${data.vbH}` }}
      >
        <div
          className="absolute inset-0 [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: data.dotsSvg }}
        />

        {/* numbered pins, in the map's own viewBox space */}
        <svg
          viewBox={`${data.vbX} ${data.vbY} ${data.vbW} ${data.vbH}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          {data.pins.map((p, i) => {
            const on = i === active;
            return (
              <g
                key={p.city}
                style={{ cursor: "pointer" }}
                onClick={() => select(i)}
                onMouseEnter={() => select(i)}
              >
                <circle cx={p.x} cy={p.y} r={7} fill="transparent" />
                {on ? (
                  <circle
                    className="pulse-ring"
                    cx={p.x}
                    cy={p.y}
                    r="3.4"
                    fill={CORAL}
                    opacity="0.45"
                  />
                ) : null}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={on ? 3.4 : 2.1}
                  fill={on ? CORAL : "var(--background)"}
                  stroke={on ? "none" : MUTED}
                  strokeWidth={on ? 0 : 0.4}
                />
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={on ? 2.6 : 2.1}
                  fontWeight={700}
                  fill={on ? "#fff" : MUTED}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* single connector line, measured in wrapper-pixel space */}
      {line && !reduce ? (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <motion.line
            initial={false}
            animate={{ x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2 }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            stroke={CORAL}
            strokeWidth={1.25}
            strokeDasharray="3 5"
            strokeLinecap="round"
            opacity={0.5}
          />
        </svg>
      ) : null}

      {/* docked detail card + controls, over the empty ocean */}
      <div
        ref={cardRef}
        className="absolute bottom-4 left-4 w-[320px] sm:bottom-6 sm:left-6 sm:w-[340px]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.city}
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <CardBody h={current} index={active} />
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous hackathon"
            onClick={() => select((active - 1 + n) % n)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background-soft text-muted transition-colors hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {hackathons.map((h, i) => (
              <button
                key={h.city}
                type="button"
                aria-label={`Show ${h.city}`}
                onClick={() => select(i)}
                className="h-1.5 w-1.5 rounded-full transition-colors"
                style={{
                  background: i === active ? CORAL : "rgba(107,106,96,0.3)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next hackathon"
            onClick={() => select((active + 1) % n)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background-soft text-muted transition-colors hover:text-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile: static globe on top (numbered pins, no interaction), cards
   stacked in a column below. No lines, no autoplay. ── */
function StackedLayout({ data }: { data: MapData }) {
  return (
    <div>
      <div
        className="relative mx-auto w-full max-w-[480px] [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
        style={{ aspectRatio: `${data.vbW} / ${data.vbH}` }}
      >
        <div
          className="absolute inset-0 [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: data.dotsSvg }}
        />
        <svg
          viewBox={`${data.vbX} ${data.vbY} ${data.vbW} ${data.vbH}`}
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {data.pins.map((p, i) => (
            <g key={p.city}>
              <circle
                className="pulse-ring"
                cx={p.x}
                cy={p.y}
                r="1.4"
                fill={CORAL}
                opacity="0.5"
              />
              <circle cx={p.x} cy={p.y} r="1.3" fill={CORAL} />
              <text
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="1.3"
                fontWeight={700}
                fill="#fff"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        {hackathons.map((h, i) => (
          <StaticCard key={h.city} h={h} index={i} />
        ))}
      </div>
    </div>
  );
}

function StaticCard({ h, index }: { h: Hackathon; index: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <CardBody h={h} index={index} />;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <CardBody h={h} index={index} />
    </motion.div>
  );
}

function CardBody({ h, index }: { h: Hackathon; index?: number }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background-soft shadow-[0_10px_30px_-18px_rgba(22,21,15,0.35)]">
      {/* image / refined fallback */}
      <div className="relative aspect-[16/9] w-full bg-accent-2/8">
        {h.image && imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={h.image}
            alt={h.project}
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent-2/30">
              <span className="display text-lg text-accent-2/80">
                {h.project.charAt(0)}
              </span>
            </div>
            <span className="kicker text-accent-2/50">{h.city}</span>
          </div>
        )}
        {h.award ? (
          <span className="absolute left-3 top-3 rounded-full border border-accent-2/40 bg-background/80 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-2 backdrop-blur-sm">
            ★ {h.award}
          </span>
        ) : null}
      </div>

      {/* text */}
      <div className="p-4">
        <p className="kicker text-muted">
          {typeof index === "number"
            ? `0${index + 1} — ${h.city} · ${h.country}`
            : `${h.city} · ${h.country}`}
        </p>
        <h3 className="display mt-1.5 text-xl leading-tight">{h.project}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
          {h.blurb}
        </p>
        {h.link ? (
          <a
            href={h.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            View project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
