import { site } from "@/data/site";

const links = [
  { label: "Email", href: `mailto:${site.email}`, value: site.email },
  { label: "GitHub", href: site.github, value: site.githubHandle },
  { label: "LinkedIn", href: site.linkedin, value: "william-ragnarsson" },
];

export default function Contact() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between px-6 py-16 sm:px-12 lg:px-20">
      <div className="bg-lines pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="relative flex items-center gap-4">
        <span className="kicker text-accent">05</span>
        <span className="h-px flex-1 bg-border" />
        <span className="kicker text-muted">Contact</span>
      </div>

      <div className="relative">
        <h2 className="display text-[14vw] leading-[0.82] sm:text-[10vw] lg:text-[8vw]">
          Let&apos;s build
          <br />
          <span className="text-accent">something.</span>
        </h2>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-background px-5 py-6 transition-colors hover:bg-foreground hover:text-background"
            >
              <span>
                <span className="kicker block text-muted group-hover:text-background/70">
                  {l.label}
                </span>
                <span className="mt-1 block font-bold">{l.value}</span>
              </span>
              <span className="text-accent group-hover:text-background">→</span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="kicker text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="kicker text-muted transition-colors hover:text-accent"
          >
            Vibe-coded. View source →
          </a>
        </div>
      </div>
    </section>
  );
}
