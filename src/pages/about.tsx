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