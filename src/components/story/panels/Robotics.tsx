import Panel from "@/components/story/Panel";

// Placeholder. Drop media in /public/robotics/ and swap the slots for
// <Image>/<video>. No emoji, sharp frames.
const slots = ["TODO — photo / clip", "TODO — photo / clip", "TODO — photo / clip"];

export default function Robotics() {
  return (
    <Panel index="04" kicker="Robotics" soft>
      <div className="mb-8">
        <h2 className="display text-[12vw] leading-[0.82] sm:text-[8vw] lg:text-[6vw]">
          Before software
          <br />
          <span className="text-accent">stole me</span>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-px bg-border">
        {slots.map((s, i) => (
          <div
            key={i}
            className="flex aspect-[4/3] items-center justify-center bg-background"
          >
            <span className="kicker text-muted">{s}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
