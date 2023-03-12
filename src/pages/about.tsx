import Head from "next/head";
import { motion } from "framer-motion";

import LinkButton from "@/components/controls/LinkButton";
import members, { IMember } from "@/assets/state/team";
import { Page } from "@/types/page";

const Member = ({ image, name, title, text, links, animate }: IMember & { animate: boolean; }) => (
  <motion.div
    variants={animate ? memberAnim : {}}
    className="flex flex-col items-center w-full max-w-full gap-2 p-4 rounded-md shadow motion-safe:transition-all sm:p-6 md:w-fit shadow-primary"
    aria-label="Member"
  >
    <div className="flex flex-col items-center max-w-full gap-2 sm:flex-row md:flex-col">
      <img
        className="object-cover w-40 h-40 rounded-full shadow-md aspect-auto md:w-60 md:h-60"
        aria-label="Link"
        src={image.src}
        width={image.width}
        height={image.height}
      />
      <div className="flex flex-col max-w-full gap-2 py-4 text-center w-72 md:py-0">
        <p className="text-2xl font-semibold text-secondary" aria-label="Name">{name}</p>
        <p className="font-semibold text-primary" aria-label="Title / Role">{title}</p>
        <p className="text-fill-contrast " aria-label="Text">{text}</p>
      </div>
    </div>
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Links">
      {links.map((link, i) => (
        <LinkButton
          key={i}
          href={link.href}
          color="secondary"
          aria-label="Link"
        >
          {link.name}
        </LinkButton>
      ))}
    </div>
  </motion.div>
);

const membersContainerAnim = {
  hidden: {},
  show: {
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
} as const;

const memberAnim = {
  hidden: {
    translateY: "-10%"
  },
  show: {
    translateY: "0%"
  }
} as const;

const AboutPage: Page = ({ initialLoad, reduceMotion }) => {
  return (
    <>
      <Head>
        <title>About - Commit Rocket</title>
      </Head>
      <main aria-labelledby="about" className="flex flex-col flex-1 w-full gap-4 pb-8 max-w-7xl">
        <h1 id="about" className="text-4xl font-bold text-center lg:text-6xl text-secondary">About</h1>
        <section aria-labelledby="our-goal" className="flex flex-col gap-4">
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
        <section aria-labelledby="why-another-git-client" className="flex flex-col gap-4">
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
        <section aria-labelledby="why-another-git-client" className="flex flex-col gap-4 my-8">
          <h2
            id="why-another-git-client"
            className="text-2xl text-center lg:text-3xl text-primary"
          >
            Team
          </h2>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            aria-label="Members"
            initial="hidden"
            animate="show"
            variants={membersContainerAnim}
          >
            {members.map((member, i) => (
              <Member key={i} animate={!(reduceMotion || initialLoad)}{...member} />
            ))}
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;