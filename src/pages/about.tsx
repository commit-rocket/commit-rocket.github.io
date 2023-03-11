import Head from "next/head";
import { motion } from "framer-motion";

import LinkButton from "@/components/controls/LinkButton";
import members, { IMember } from "@/assets/state/team";
import { Page } from "@/types/page";

const Member = ({ image, name, title, text, links }: IMember) => (
  <div
    className="flex flex-col items-center gap-2 p-6 rounded-md shadow w-fit shadow-primary"
    aria-label="Member"
  >
    <img
      className="rounded-full shadow-md aspect-auto w-60 h-60"
      aria-label="Link"
      src={image.src}
      width={image.width}
      height={image.height}
    />
    <div className="flex flex-col gap-2 text-center w-72">
      <p className="text-2xl font-semibold text-secondary" aria-label="Name">{name}</p>
      <p className="font-semibold text-primary" aria-label="Title / Role">{title}</p>
      <p className="text-fill-contrast" aria-label="Text">{text}</p>
    </div>
    <div className="grid w-full grid-cols-2 gap-2" aria-label="Links">
      {links.map((link, i) => (
        <LinkButton
          key={i}
          href={link.href}
          color="secondary"
          aria-label="Link"
          className="last-of-type:odd:col-span-2"
        >
          {link.name}
        </LinkButton>
      ))}
    </div>
  </div>
);

const membersContainerAnim = {
  hidden: {},
  show: {
    transition: {
      delay: 0.25,
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
        <h1 id="about" className="text-6xl font-bold text-center text-secondary">About</h1>
        <section aria-labelledby="our-goal" className="flex flex-col gap-4">
          <h2
            id="our-goal"
            className="text-3xl text-center text-primary"
          >
            Our Goal
          </h2>
          <p className="text-lg">
            Our main goal with Commit Rocket is to drive innovation and provide a modern and fast alternative to existing Git clients.
            We want to improve the user experience for developers by creating an open-source and cross-platform tool that is both feature-rich and beginner-friendly.
          </p>
        </section>
        <section aria-labelledby="why-another-git-client" className="flex flex-col gap-4">
          <h2
            id="why-another-git-client"
            className="text-3xl text-center text-primary"
          >
            Why another Git client?
          </h2>
          <p className="text-lg">
            At Commit Rocket, we believe that the current generation of Git clients is outdated and slow.
            We want to change that by providing a sleek and fast client that meets the needs of today's developers.
            Our commitment to open-source development and cross-platform compatibility sets us apart from other clients in the market.
          </p>
        </section>
        <section aria-labelledby="why-another-git-client" className="flex flex-col gap-4 my-8">
          <h2
            id="why-another-git-client"
            className="text-3xl text-center text-primary"
          >
            Team
          </h2>
          <motion.div
            className="flex justify-center gap-4"
            aria-label="Members"
            initial="hidden"
            animate="show"
            variants={membersContainerAnim}
          >
            {members.map((member, i) => (
              <motion.div
                key={i}
                variants={(reduceMotion || initialLoad) ? {} : memberAnim}
              >
                <Member {...member} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;