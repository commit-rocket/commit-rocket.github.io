import Head from "next/head";
import { motion } from "framer-motion";

import LogoPicture from "@/assets/images/brand/commit-rocket-logo.webp";

import { Page } from "@/types/page";
import LinkButton from "@/components/controls/LinkButton";

import missions from "@/assets/state/missions";
import SignupSection from "@/components/pages/front/SignupSection";
import FeedbackSection from "@/components/pages/front/FeedbackSection";

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

const FrontPage: Page = ({ }) => {

  return (
    <>
      <Head>
        <title>Commit Rocket</title>
      </Head>
      <main aria-labelledby="hero-title" className="flex flex-col flex-1 w-full gap-4 pb-8 max-w-7xl">
        <section aria-label="hero" className="flex flex-col-reverse items-center h-fit min-h-0 xl:flex-row xl:min-h-[30rem] xl:h-[75dvh] xl:h-[75vh] mx-auto">
          <div className="relative flex flex-col items-center justify-center h-full col-span-3 gap-8 text-center xl:w-3/5">
            <h1
              id="hero-title"
              className="text-3xl font-bold lg:text-6xl text-primary"
            >
              <span className="text-secondary">Launch</span> your <span className="text-secondary">Commits</span> in a <span className="text-secondary">Modern</span> way
            </h1>
            <p className="text-lg lg:text-xl lg:max-w-xl">
              Experience Git in a modern and fast way with Commit Rocket, the open-source, lightweight and cross-platform Git client.
            </p>
            <LinkButton href="#try-it-yourself" color="secondary" className="px-5 py-3 text-xl" scroll={false}>
              Try it Yourself
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
        <div className="flex flex-row gap-12 py-16 mx-auto text-center">
          <section
            aria-labelledby="our-goal"
            className="flex flex-col flex-1 gap-4 p-4 bg-center border-2 rounded-lg image-dots bg-primary text-primary-contrast border-primary-light from-primary-light"
          >
            <h2 id="our-goal" className="text-2xl font-semibold">
              Our Goal
            </h2>
            Our main goal with Commit Rocket is to drive innovation and provide a modern and fast alternative to existing Git clients. We want to improve the user experience for developers by creating an open-source and cross-platform tool that is both feature-rich and beginner-friendly.
          </section>
          <section
            aria-labelledby="why-another-git-client"
            className="flex flex-col flex-1 gap-4 p-4 bg-center border-2 rounded-lg image-dots bg-primary text-primary-contrast border-primary-light from-primary-light"
          >
            <h2 id="why-another-git-client" className="text-2xl font-semibold">
              Why another Git client?
            </h2>
            At Commit Rocket, we believe that the current generation of Git clients is outdated and slow. We want to change that by providing a sleek and fast client that meets the needs of today's developers. Our commitment to open-source development and cross-platform compatibility sets us apart from other clients in the market.
          </section>
        </div>
        <section
          aria-labelledby="mission"
          className="flex flex-col gap-12 py-16 mx-auto text-center"
        >
          <h2
            id="mission"
            className="text-4xl font-bold md:text-5xl text-secondary"
          >
            Mission
          </h2>
          <div className="flex flex-col flex-wrap justify-between w-full gap-12 lg:flex-row">
            {missions.map(({ title, image, text }, i) => (
              <div key={i} className="flex flex-col items-center flex-1 gap-4">
                <h3 className="text-2xl text-primary md:text-3xl lg:h-[5ex] motion-safe:transition-all">
                  {title}
                </h3>
                <img
                  className="w-full sm:w-2/3 lg:w-full text-[0px]"
                  loading="lazy"
                  alt="mission"
                  src={image.src}
                  width={image.width}
                  height={image.height}
                />
                <p className="text-lg">{text}</p>
              </div>
            ))}
          </div>
        </section>
        <SignupSection />
        <FeedbackSection />
      </main>
    </>
  );
};

export default FrontPage;