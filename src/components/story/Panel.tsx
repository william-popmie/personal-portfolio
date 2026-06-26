import type { ReactNode } from "react";

type Props = {
  id: string; // anchor id for nav
  label: string; // short nav label
  index: string; // "01"
  kicker: string; // section label, e.g. "Internship"
  title: ReactNode; // clear, descriptive headline
  lead?: string; // one descriptive sentence
  children: ReactNode;
  soft?: boolean;
};

export default function Panel({
  id,
  label,
  index,
  kicker,
  title,
  lead,
  children,
  soft,
}: Props) {
  return (
    <section
      id={id}
      data-slide
      data-label={label}
      className={`relative flex min-h-screen w-full snap-start flex-col justify-center px-6 py-24 sm:px-16 lg:px-24 ${
        soft ? "bg-background-soft" : "bg-background"
      }`}
    >
      <div className="bg-lines pointer-events-none absolute inset-0 opacity-[0.35]" />

      {/* top meta line */}
      <div className="relative flex items-center gap-4">
        <span className="kicker text-accent">{index}</span>
        <span className="kicker text-foreground">{kicker}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* clear title + descriptive lead */}
      <div className="relative mt-6 max-w-4xl">
        <h2 className="display text-[11vw] leading-[0.88] sm:text-[6vw] lg:text-[4vw]">
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
            {lead}
          </p>
        ) : null}
      </div>

      <div className="relative mt-8">{children}</div>
    </section>
  );
}
