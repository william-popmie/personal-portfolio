// Dense project walls. Keep copy minimal — name + a few words. No paragraphs.
export type Tile = {
  name: string;
  blurb: string; // a few words, not a sentence
  meta?: string; // small label: award / stat / stack
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
    meta: "trained my own model · 765 decks I labeled · 80.9%",
    repo: "https://github.com/william-popmie/vc-analyst",
    featured: true,
  },
  {
    name: "The Model",
    blurb: "Gradient boosting · ONNX in-browser",
    meta: "0.871 ROC-AUC",
    repo: "https://github.com/william-popmie/vc-ai-analyst-llm-training",
  },
  {
    name: "StartupSeeker",
    blurb: "Deal-sourcing API",
    meta: "founders · competitors · deep research",
  },
  { name: "AutoTypeForm", blurb: "Selenium form automation" },
  { name: "PDF → CSV", blurb: "Deck data extractor" },
];

// 02 — hackathons (no emoji; country is the headline)
export const hackathonTiles: Tile[] = [
  {
    name: "Veil",
    blurb: "Strips PII before it hits the LLM",
    meta: "New York",
    featured: true,
  },
  {
    name: "Team-Zucc",
    blurb: "BCG Platinion",
    meta: "Berlin · 3rd place",
    link: "https://zucc.it",
  },
  { name: "Project Net Zero", blurb: "HackEurope", meta: "Stockholm" },
  {
    name: "Nora AI",
    blurb: "Data4Good Challenge",
    meta: "Belgium · Best Pitch",
  },
];

// 03 — built when I should've been studying (finals + personal)
export const builtTiles: Tile[] = [
  {
    name: "Double Pendulum",
    blurb: "Chaos, rendered on the GPU",
    meta: "WebGPU · WGSL · RK4",
    repo: "https://github.com/william-popmie/double-pendulum",
    demo: "https://www.pendulum.williamragnarsson.com",
    featured: true,
  },
  {
    name: "SimpleDBMS",
    blurb: "A database, from scratch",
    meta: "B+ tree · WAL · HNSW · RAG",
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
