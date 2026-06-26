import ConsoleGreeting from "@/components/ConsoleGreeting";
import SlideDeck from "@/components/story/SlideDeck";
import Intro from "@/components/story/panels/Intro";
import Startups from "@/components/story/panels/Startups";
import Hackathons from "@/components/story/panels/Hackathons";
import Built from "@/components/story/panels/Built";
import Robotics from "@/components/story/panels/Robotics";
import Contact from "@/components/story/panels/Contact";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <ConsoleGreeting />

      {/* fixed minimal brand */}
      <a
        href={`mailto:${site.email}`}
        className="kicker fixed left-4 top-4 z-40 hidden text-foreground transition-colors hover:text-accent sm:block"
      >
        Hire me →
      </a>

      <main>
        <SlideDeck>
          <Intro />
          <Startups />
          <Hackathons />
          <Built />
          <Robotics />
          <Contact />
        </SlideDeck>
      </main>
    </>
  );
}
