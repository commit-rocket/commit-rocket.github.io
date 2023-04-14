import Head from "next/head";

import members from "@/assets/state/team";
import Member from "@/components/pages/about/Member";
import { Page } from "@/types/page";
import projects from "@/assets/state/projects";

import Heading from "@/components/content/Heading";
import Project from "@/components/pages/about/Project";
import KeywordsMeta from "@/components/head/KeywordsMeta";

import { makeOgMeta } from "@/lib/meta/opengraph";

const AboutPage: Page = ({ pathname }) => {
  return (
    <>
      <Head>
        {makeOgMeta({ title: "About", pathname })}
        <KeywordsMeta tags={[
          "About Us",
          "Team"
        ]} />
      </Head>
      <main aria-labelledby="about" className="flex flex-col flex-1 w-full gap-8 pb-8 max-w-7xl">
        <Heading.H1 id="about" className="text-center text-secondary">
          About
        </Heading.H1>
        <section aria-labelledby="our-team" className="flex flex-col gap-8">
          <Heading.H2
            id="our-team"
            className="text-center text-secondary"
          >
            Team
          </Heading.H2>
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
          <Heading.H2
            id="projects"
            className="text-center text-secondary"
          >
            Projects
          </Heading.H2>
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