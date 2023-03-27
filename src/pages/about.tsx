import Head from "next/head";

import members from "@/assets/state/team";
import Member from "@/components/pages/about/Member";
import { Page } from "@/types/page";
import projects from "@/assets/state/projects";
import Project from "@/components/pages/about/Project";

const AboutPage: Page = () => {
  return (
    <>
      <Head>
        <title>About - Commit Rocket</title>
      </Head>
      <main aria-labelledby="about" className="flex flex-col flex-1 w-full gap-8 pb-8 max-w-7xl">
        <h1 id="about" className="text-4xl font-bold text-center lg:text-6xl text-secondary">About</h1>
        <section aria-labelledby="our-team" className="flex flex-col gap-8">
          <h2
            id="our-team"
            className="text-4xl font-bold text-center md:text-5xl text-secondary"
          >
            Team
          </h2>
          <ul
            className="flex flex-wrap justify-center gap-8"
            aria-label="Members"
          >
            {members.map((member, i) => (
              <Member key={i} {...member} />
            ))}
          </ul>
        </section>
        <section aria-labelledby="projects" className="flex flex-col gap-8">
          <h2
            id="projects"
            className="text-4xl font-bold text-center md:text-5xl text-secondary"
          >
            Projects
          </h2>
          <div className="text-lg text-center">
            Commit Rocket is the latest addition to our portfolio of projects.
            Check out some of our previous work to see what we're capable of. <br />
            These projects are both open-source and are very diverse in purpose.
          </div>
          <ul
            className="flex flex-wrap justify-center gap-8"
            aria-label="Members"
          >
            {projects.map((project, i) => (
              <Project key={i} {...project} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default AboutPage;