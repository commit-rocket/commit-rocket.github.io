import Head from "next/head";
import { Variants, motion } from "framer-motion";

import missions from "@/assets/state/missions";
import LogoPicture from "@/assets/images/brand/rocket-with-graph.svg";
import LogoSmall from "@/assets/images/brand/logo.svg";

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

const LOGO_ANIM = {
  initial: {
    translateY: "50%",
  },
  animate: {
    translateY: "0",
    transition: {
      duration: .3
    }
  }
} satisfies Variants;

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
        <div className="flex flex-col gap-32 xl:gap-0">
          <section aria-label="hero" className="flex flex-col-reverse items-center h-fit min-h-0 gap-8 overflow-clip xl:flex-row xl:gap-0 xl:min-h-[30rem] xl:h-[75dvh] xl:h-[75vh]">
            <div className="relative flex flex-col items-center justify-center h-full col-span-3 gap-8 text-center xl:w-3/5">
              <Heading.H1 id="hero-title">
                Extend Your Git Workflow, Your Way
              </Heading.H1>
              <p className="text-lg lg:text-xl lg:max-w-xl">
                Commit Rocket is a modern, open-source and lightweight Git client with plugins themes, working contexts and more!
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
            <div className="relative overflow-visible flex items-center justify-center w-full rotate-12 min-h-[20rem] max-h-[40dvh] max-h-[40vh] xl:min-h-0 xl:h-full xl:max-h-full xl:w-2/5 xl:rotate-0" style={{ aspectRatio: `${LogoPicture.width} / ${LogoPicture.height}` }}>
              <motion.img
                className="absolute max-w-full max-h-full object-contain aspect-auto w-full text-[0px] select-none"
                loading="eager"
                variants={LOGO_ANIM}
                alt="Commit Rocket"
                src={LogoPicture.src}
                width={LogoPicture.width}
                height={LogoPicture.height}
              />
            </div>
          </section>
          <section aria-label="introduction" className="flex flex-col gap-12 p-8 text-lg -mx-8 md:mx-0 motion-safe:transition-[margin] text-center rounded-2xl xl:flex-row text-cr-primary-contrast image-star bg-cr-primary">
            <Heading.H2 id="introduction" className="flex p-4 flex-col items-center justify-center w-full rounded-2xl text-cr-primary-contrast bg-cr-primary-contrast/30 backdrop-glass border border-cr-primary-contrast/20 xl:p-0 xl:w-1/2">
              <span className="text-2xl">
                Introducing...
              </span>
              <span className="flex flex-col items-center gap-4 p-4 text-3xl font-bold break-normal sm:text-4xl text-cr-primary-contrast md:text-6xl md:flex-row md:w-max">
                <img
                  className="w-16 h-16 md:w-[2em] md:h-[2em] rotate-30"
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
                Our main focus is to create a modern client with feature-packed with awesome features like multi-account support, plugins and working contexts.
              </p>
              <p>
                "Why another Git client?" - We feel like there is no real variety in the Git client ecosystem. We aim to provide a real alternative to popular choices like GitKraken, Github Desktop and SourceTree.
              </p>
              <p>
                Commit Rocket will be open-source, this means that everyone will have access to our code and anyone can contribute to make it the best it can be.
              </p>
              <LinkButton href="/contribute" color="white" onClick={sendCTAEvent("Contribute")}>
                Contribute
              </LinkButton>
            </div>
          </section>
        </div>
        <section
          aria-labelledby="missions"
          className="flex flex-col gap-12 mx-auto text-center"
        >
          <Heading.H2 id="missions">
            Missions
          </Heading.H2>
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