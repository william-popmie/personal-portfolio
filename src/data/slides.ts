// Project data. Featured tiles get cover art + a real description + tags.
// Compact tiles stay short. Drop a real screenshot/photo at `image` to
// override the generated cover.
export type CoverKind =
  | "pendulum"
  | "vc"
  | "model"
  | "redact"
  | "zucc"
  | "btree"
  | "grid";

export type Tile = {
  name: string;
  blurb: string; // short line (compact tiles)
  description?: string; // a real sentence (featured tiles)
  meta?: string; // small label: award / stat / location
  tags?: string[];
  cover?: CoverKind; // generated cover art
  image?: string; // /public path — overrides cover when set
  repo?: string;
  demo?: string;
  link?: string;
  featured?: boolean;
};

// 01 — Plug & Play / startups
export const startupTiles: Tile[] = [
  {
    name: "VC AI Analyst",
    blurb: "Pitch-deck scrutiny, automated",
    description:
      "Founders paste a deck and the model scores it on team, market, and moat — the same rubric I used on 800+ real decks at Plug & Play.",
    tags: ["Next.js", "ONNX", "scikit-learn"],
    cover: "vc",
    repo: "https://github.com/william-popmie/vc-analyst",
    featured: true,
  },
  {
    name: "The Model",
    blurb: "I trained it on my own data",
    description:
      "A gradient-boosting classifier trained on 765 startups I hand-labeled. 80.9% accuracy, 0.871 ROC-AUC, exported to ONNX so it runs in the browser with zero Python.",
    tags: ["Python", "Gradient Boosting", "ONNX"],
    cover: "model",
    repo: "https://github.com/william-popmie/vc-ai-analyst-llm-training",
    featured: true,
  },
  {
    name: "StartupSeeker",
    blurb: "Deal-sourcing API",
    meta: "founders · competitors · deep research",
  },
  { name: "AutoTypeForm", blurb: "Selenium form automation, in parallel" },
  { name: "PDF → CSV", blurb: "Pulls data out of pitch decks" },
];

// 02 — hackathons
export const hackathonTiles: Tile[] = [
  {
    name: "Veil",
    blurb: "Privacy layer for LLMs",
    description:
      "A local proxy that detects and strips personal data from prompts — names, accounts, secrets — before anything ever reaches a model.",
    meta: "New York",
    tags: ["TypeScript", "PII", "LLM"],
    cover: "redact",
    featured: true,
  },
  {
    name: "Team-Zucc",
    blurb: "BCG Platinion hackathon",
    description:
      "Flew to Berlin, built fast, took 3rd place. Shipped and live at zucc.it.",
    meta: "Berlin · 3rd place",
    tags: ["React", "48h build"],
    cover: "zucc",
    link: "https://zucc.it",
    featured: true,
  },
  {
    name: "Project Net Zero",
    blurb: "HackEurope",
    meta: "Stockholm",
  },
  {
    name: "Nora AI",
    blurb: "Data4Good Challenge",
    meta: "Belgium · Best Pitch",
  },
];

// 03 — built when I should've been studying
export const builtTiles: Tile[] = [
  {
    name: "Double Pendulum",
    blurb: "Chaos, rendered on the GPU",
    description:
      "Simulate 50 near-identical pendulums diverging into chaos, or render a GPU-parallel slice of the 4D phase space — the same RK4 integration across hundreds of thousands of initial conditions, live in WebGPU.",
    tags: ["WebGPU", "WGSL", "TypeScript"],
    cover: "pendulum",
    repo: "https://github.com/william-popmie/double-pendulum",
    demo: "https://www.pendulum.williamragnarsson.com",
    featured: true,
  },
  {
    name: "SimpleDBMS",
    blurb: "A database, from scratch",
    description:
      "A relational database built from the ground up: B+ tree indexing, write-ahead logging, compression, distributed consensus, and semantic search with RAG.",
    tags: ["TypeScript", "B+ tree", "RAG"],
    cover: "btree",
    featured: true,
  },
  {
    name: "dev-resume-generator",
    blurb: "Repos → a real LaTeX résumé",
    meta: "Claude SDK",
    repo: "https://github.com/william-popmie/dev-resume-generator",
  },
  {
    name: "Penny",
    blurb: "Finance tracker I actually use",
    repo: "https://github.com/william-popmie/Penny",
  },
  { name: "Socket Programming", blurb: "Networks from the metal up" },
  { name: "Numerical CV", blurb: "MATLAB · numerical methods" },
];
