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
      <main aria-labelledby="hero-title" className="flex flex-col flex-1 w-full gap-4 pb-8">
        <section aria-label="hero" className="flex flex-col-reverse items-center h-fit min-h-0 max-w-7xl lg:flex-row lg:min-h-[30rem] lg:h-[75dvh] lg:h-[75vh] mx-auto">
          <div className="relative flex flex-col items-center justify-center h-full col-span-3 gap-8 text-center lg:w-3/5">
            <div className="absolute w-full h-full opacity-20 aspect-square bg-gradient-radial from-primary to-transparent -z-10" aria-hidden />
            <h1
              id="hero-title"
              className="text-3xl font-bold lg:text-6xl text-primary"
            >
              <span className="text-secondary">Launch</span> your <span className="text-secondary">Commits</span> in a <span className="text-secondary">Modern</span> way
            </h1>
            <p className="text-lg lg:text-xl lg:max-w-xl">
              Experience Git in a modern and fast way with Commit Rocket, the open-source, lightweight and cross-platform Git client.
            </p>
            <LinkButton href="/#try-it-yourself" color="secondary" className="px-5 py-3 text-xl">
              Try it Yourself
            </LinkButton>
          </div>
          <div className="relative flex items-center justify-center w-full min-h-[20rem] max-h-[40dvh] max-h-[40vh] lg:min-h-0 lg:h-full lg:max-h-full lg:w-2/5" style={{ aspectRatio: `${LogoPicture.width} / ${LogoPicture.height}` }}>
            <div className="absolute w-full h-full opacity-50 aspect-square bg-gradient-radial from-primary to-transparent" aria-hidden />
            <motion.img
              className="absolute max-w-full max-h-full object-contain aspect-auto w-full rotate-[10deg] text-[0px]"
              loading="eager"
              variants={logoAnim}
              alt="Commit Rocket"
              src={LogoPicture.src}
              width={LogoPicture.width}
              height={LogoPicture.height}
            />
          </div>
        </section>
        <section
          aria-labelledby="mission"
          className="flex flex-col gap-12 py-16 mx-auto text-center max-w-7xl"
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