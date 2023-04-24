import Head from "next/head";
import { motion } from "framer-motion";

import missions from "@/assets/state/missions";
import LogoPicture from "@/assets/images/brand/commit-rocket-logo.webp";
import LogoSmall from "@/assets/images/brand/logo-200x200.webp";

import LinkButton from "@/components/controls/LinkButton";

import SignupSection from "@/components/pages/front/SignupSection";
import Mission from "@/components/pages/front/Mission";

import { Page } from "@/types/page";
import roadmap from "@/assets/state/roadmap";
import RoadmapItem from "@/components/pages/front/RoadmapItem";
import Heading from "@/components/content/Heading";
import KeywordsMeta from "@/components/head/KeywordsMeta";

import { sendCTAEvent } from "@/api/analytics";
import makeSitemapMeta from "@/lib/meta/sitemap";
import { makeOgMeta } from "@/lib/meta/opengraph";

const logoAnim = {
  initial: {
    translateX: "-2.5%",
    translateY: "15%",
    rotate: "-2deg"
  },
  animate: {
    translateX: "0",
    translateY: "0",
    rotate: "10deg"
  }
} as const;

const FrontPage: Page = ({ pathname }) => {

  return (
    <>
      <Head>
        {makeOgMeta({ title: "Building a Better Git", reverseTitle: true, pathname })}
        {makeSitemapMeta({ priority: 1 })}
        <KeywordsMeta tags={[
          "Introduction",
          "Roadmap",
          "Missions",
          "Newsletter Signup"
        ]} />
      </Head>
      <main aria-labelledby="hero-title" className="flex flex-col flex-1 w-full gap-32 pb-8 max-w-7xl">
        <section aria-label="hero" className="flex flex-col-reverse items-center h-fit min-h-0 xl:flex-row xl:min-h-[30rem] xl:h-[75dvh] xl:h-[75vh] mx-auto">
          <div className="relative flex flex-col items-center justify-center h-full col-span-3 gap-8 text-center xl:w-3/5">
            <Heading.H1 id="hero-title">
              Launch your Commits in a Modern way
            </Heading.H1>
            <p className="text-lg lg:text-xl lg:max-w-xl">
              Experience Git in a modern and fast way with Commit Rocket, the open-source, lightweight and cross-platform Git client.
            </p>
            <LinkButton
              className="w-full px-5 py-3 text-xl sm:w-fit"
              onClick={sendCTAEvent("Learn More")}
              href="#introduction"
              color="primary"
              scroll={false}
            >
              Learn More!
            </LinkButton>
          </div>
          <div className="relative overflow-hidden flex items-center justify-center w-full min-h-[20rem] max-h-[40dvh] max-h-[40vh] xl:min-h-0 xl:h-full xl:max-h-full xl:w-2/5" style={{ aspectRatio: `${LogoPicture.width} / ${LogoPicture.height}` }}>
            <motion.img
              className="absolute max-w-full max-h-full object-contain aspect-auto w-full rotate-[10deg] text-[0px] select-none"
              loading="eager"
              variants={logoAnim}
              alt="Commit Rocket"
              src={LogoPicture.src}
              width={LogoPicture.width}
              height={LogoPicture.height}
            />
          </div>
        </section>
        <section aria-label="introduction" className="flex flex-col gap-12 p-8 text-lg -mx-8 md:mx-0 motion-safe:transition-[margin] text-center border-2 rounded-2xl xl:flex-row text-cr-primary-contrast image-dots from-cr-primary-light border-cr-primary-light bg-cr-primary">
          <Heading.H2 id="introduction" className="flex p-4 flex-col items-center justify-center w-full rounded-2xl text-cr-primary-contrast bg-white/20 backdrop-blur-[1.25px] xl:p-0 xl:w-1/2">
            <span className="text-2xl">
              Introducing...
            </span>
            <span className="flex flex-col items-center gap-4 p-4 text-3xl font-bold break-normal sm:text-4xl text-cr-primary-contrast md:text-6xl md:flex-row md:w-max">
              <img
                className="w-16 h-16 md:w-[1.5em] md:h-[1.5em]"
                alt="A Small Rocket"
                src={LogoSmall.src}
                width={LogoSmall.width}
                height={LogoSmall.height}
              />
              Commit Rocket
            </span>
          </Heading.H2>
          <div className="flex flex-col w-full gap-4 text-lg font-semibold break-words xl:w-1/2">
            <p>
              A new and modern Git client that is currently in development.
              Our main focus is on creating a modern design and speed without sacrificing any of the features you love.
            </p>
            <p>
              "Why another Git client?" - Our goal with Commit Rocket is to provide a fresh and innovative approach to Git clients,
              addressing the outdated and inefficient nature of many current options.
              As an open-source and cross-platform client,
              we aim to provide a real alternative to popular choices like GitKraken, Github Desktop, and SourceTree.
            </p>
            <p>
              This means that everyone will have access to our code and anyone can contribute to make it the best it can be.
              Join us in bringing new life to Git!
            </p>
            <LinkButton href="/contribute" color="white" onClick={sendCTAEvent("Contribute")}>
              Contribute
            </LinkButton>
          </div>
        </section>
        <section
          aria-labelledby="missions"
          className="flex flex-col gap-12 mx-auto text-center"
        >
          <Heading.H2 id="missions">
            Mission
          </Heading.H2>
          <p className="text-lg font-semibold">
            Our main goal with Commit Rocket is to drive innovation and provide a modern and fast alternative to existing Git clients.
            We want to improve the user experience for developers by creating an open-source and cross-platform tool that is both feature-rich and beginner-friendly.
          </p>
          <ul className="flex flex-col flex-wrap justify-between w-full gap-16 lg:gap-4 lg:flex-row">
            {missions.map((mission, i) => (
              <Mission key={i} {...mission} />
            ))}
          </ul>
        </section>
        <section
          aria-labelledby="roadmap"
          className="flex flex-col gap-4"
        >
          <Heading.H2 id="roadmap" className="text-center">
            Roadmap
          </Heading.H2>
          <ul>
            {roadmap.map((roadmapItem, i) => (
              <RoadmapItem key={i} {...roadmapItem} />
            ))}
          </ul>
        </section>
        <SignupSection />
      </main>
    </>
  );
};

export default FrontPage;