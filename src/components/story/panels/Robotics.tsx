import Panel from "@/components/story/Panel";

// Placeholder. Drop media in /public/robotics/ and set the `image` on each
// slot. No emoji, sharp frames.
const slots: { image?: string }[] = [{}, {}, {}];

export default function Robotics() {
  return (
    <Panel
      id="robotics"
      label="Robotics"
      index="04"
      kicker="Robotics"
      soft
      title={
        <>
          Where it <span className="text-accent">began.</span>
        </>
      }
      lead="Before software took over: motors, sensors, and things that moved on their own. The build-stuff instinct started here."
    >
      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
        {slots.map((s, i) => (
          <div
            key={i}
            className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-background"
          >
            {s.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.image}
                alt="Robotics project"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="kicker text-muted">photo / clip</span>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}
