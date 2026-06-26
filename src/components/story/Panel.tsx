import type { ReactNode } from "react";

type Props = {
  index: string; // "01"
  kicker: string;
  children: ReactNode;
  soft?: boolean;
};

export default function Panel({ index, kicker, children, soft }: Props) {
  return (
    <section
      className={`relative flex min-h-screen w-full flex-col justify-center px-6 py-20 sm:px-12 lg:px-20 ${
        soft ? "bg-background-soft" : "bg-background"
      }`}
    >
      <div className="bg-lines pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative flex items-center gap-4">
        <span className="kicker text-accent">{index}</span>
        <span className="h-px flex-1 bg-border" />
        <span className="kicker text-muted">{kicker}</span>
      </div>
      <div className="relative mt-8 flex-1 flex flex-col justify-center">
        {children}
      </div>
    </section>
  );
}
