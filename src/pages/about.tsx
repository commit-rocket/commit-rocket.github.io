import Head from "next/head";

import members from "@/assets/state/team";
import Member from "@/components/pages/about/Member";
import { Page } from "@/types/page";

const AboutPage: Page = ({ initialLoad, reduceMotion }) => {
  return (
    <>
      <Head>
        <title>About - Commit Rocket</title>
      </Head>
      <main aria-labelledby="about" className="flex flex-col flex-1 w-full gap-8 pb-8 max-w-7xl">
        <h1 id="about" className="text-4xl font-bold text-center lg:text-6xl text-secondary">About</h1>
        <section aria-labelledby="our-goal" className="flex flex-col gap-8">
          <h2
            id="our-goal"
            className="text-2xl text-center lg:text-3xl text-primary"
          >
            Our Goal
          </h2>
          <p className="lg:text-lg">
            Our main goal with Commit Rocket is to drive innovation and provide a modern and fast alternative to existing Git clients.
            We want to improve the user experience for developers by creating an open-source and cross-platform tool that is both feature-rich and beginner-friendly.
          </p>
        </section>
        <section aria-labelledby="why-another-git-client" className="flex flex-col gap-8">
          <h2
            id="why-another-git-client"
            className="text-2xl text-center lg:text-3xl text-primary"
          >
            Why another Git client?
          </h2>
          <p className="lg:text-lg">
            At Commit Rocket, we believe that the current generation of Git clients is outdated and slow.
            We want to change that by providing a sleek and fast client that meets the needs of today's developers.
            Our commitment to open-source development and cross-platform compatibility sets us apart from other clients in the market.
          </p>
        </section>
        <section aria-labelledby="our-team" className="flex flex-col gap-8 my-8">
          <h2
            id="our-team"
            className="text-2xl text-center lg:text-3xl text-primary"
          >
            Team
          </h2>
          <ul
            className="flex flex-wrap justify-center gap-4"
            aria-label="Members"
          >
            {members.map((member, i) => (
              <Member key={i} animate={!(reduceMotion || initialLoad)}{...member} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default AboutPage;