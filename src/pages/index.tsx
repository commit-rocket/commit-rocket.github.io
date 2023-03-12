import { useMemo, useRef, useState } from "react";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

import LogoPicture from "@/assets/images/brand/commit-rocket-logo.webp";

import { Page } from "@/types/page";
import LinkButton from "@/components/controls/LinkButton";
import Button from "@/components/controls/Button";
import Link from "@/components/navigation/Link";

import missions from "@/assets/state/missions";
import perks from "@/assets/state/perks";
import Error from "@/components/controls/Error";
import { backend } from "@/utils/wretch";
import { BackendResponse } from "@/api/models/Response";

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

const signupSchema = z.object({
  email: z.string().email().min(3)
});
const signupSchemaResolver = zodResolver(signupSchema);

const feedbackSchema = z.object({
  text: z.string()
});

const feedbackSchemaResolver = zodResolver(feedbackSchema);

type SignupSchema = z.infer<typeof signupSchema>;
type FeedbackSchema = z.infer<typeof feedbackSchema>;

const fadeAnim = {
  in: {
    opacity: 0
  },
  anim: {
    opacity: 1,
    transition: {
      duration: 0.35
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.35
    }
  }
} as const;

const SignupSection = () => {
  const { handleSubmit, register, formState } = useForm<SignupSchema>({
    resolver: signupSchemaResolver,
    mode: "onChange"
  });

  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const [response, setResponse] = useState<null | BackendResponse>(null);

  const submit = useMemo(() => handleSubmit(({ email }) => {
    if (loadingRef.current) return;
    setLoading(true);

    backend.url("/email/subscribe")
      .post({ email })
      .json((res: BackendResponse) => setResponse(res));
  }), [handleSubmit]);

  return (
    <section
      aria-labelledby="try-it-yourself"
      className="flex flex-col gap-12 py-16 mx-auto text-center max-w-7xl"
    >
      <h2
        id="try-it-yourself"
        className="text-4xl font-bold md:text-5xl text-secondary"
      >
        Try it Yourself
      </h2>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl text-primary md:text-3xl">Commit Rocket is not out yet!</h3>
        <p className="text-xl">
          Do you want to join in on this adventure and help develop Commit Rocket?
          We value your input and look forward to involving you in the process of making Commit Rocket as optimal as possible.
        </p>
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-bold md:text-2xl text-primary">Perks</h3>
        <p className="text-xl">
          Sign up to stay in the loop on our progress,
          get early access to beta versions, and participate in surveys that help shape the development of our open-source and cross-platform Git client.
        </p>
        <div className="flex flex-wrap justify-center w-full gap-4" aria-hidden>
          {perks.map(({ title, icon: Icon }, i) => (
            <div key={i} className="flex flex-col items-center w-32 gap-2">
              <Icon className="w-12 sm:w-16 text-primary" />
              <div className="font-bold">{title}</div>
            </div>
          ))}
        </div>
      </section>
      <form aria-label="Sign up" className="flex flex-col items-center gap-4" onSubmit={submit}>
        <AnimatePresence mode="wait">
          {(!response || response.success === false) && <motion.div
            key="form"
            className="flex flex-col items-center w-full gap-4"
            variants={fadeAnim}
            initial="in"
            animate="anim"
            exit="exit"
          >
            <div className="w-full">
              <input
                className="w-full p-4 text-lg bg-white border-2 rounded-md md:text-xl border-primary"
                placeholder="your@email.com"
                {...register("email")}
              />
              <Error className="w-full px-2 text-start" state={formState} name="email" />
            </div>
            <Button type="submit" disabled={loading} color="secondary" className="px-5 py-3 text-lg md:text-xl w-fit">
              {!loading
                ? "Keep me up-to-date!"
                : <ArrowPathIcon className="w-4 animate-spin" />
              }
            </Button>
          </motion.div>}
          {(response && response.success) && <motion.div
            key="success"
            className="py-4 mb-8 text-xl font-semibold text-green-500"
            variants={fadeAnim}
            initial="in"
            animate="anim"
            exit="exit"
          >
            🎉 {response.message} 🎉
          </motion.div>}
        </AnimatePresence>
        <p role="note">You can always unsubscribe by going to <Link color="primary" href="/mail/unsubscribe" underline>this link</Link></p>
      </form>
    </section>
  );
};

const FeedbackSection = () => {
  const { handleSubmit, register, formState } = useForm<FeedbackSchema>({
    resolver: feedbackSchemaResolver,
    mode: "onChange"
  });

  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const [response, setResponse] = useState<null | BackendResponse>(null);

  const submit = useMemo(() => handleSubmit(({ text }) => {
    if (loadingRef.current) return;
    setLoading(true);

    backend.url("/feedback")
      .post({ text })
      .json((res: BackendResponse) => setResponse(res));
  }), [handleSubmit]);

  return (
    <section
      aria-labelledby="feedback"
      className="flex flex-col w-full gap-4 py-16 mx-auto text-center max-w-7xl"
    >
      <h2
        id="feedback"
        className="text-4xl font-bold md:text-5xl text-secondary"
      >
        Feedback
      </h2>
      <section aria-labelledby="anon-feedback" className="flex flex-col gap-4">
        <h3 id="anon-feedback" className="text-2xl text-primary md:text-3xl">Anonymous feedback</h3>
        <p className="text-xl">
          Want to help us out without signing up? You can send us feedback directly by filling in your feedback below!
        </p>
      </section>
      <form aria-label="feedback-inbox" className="flex flex-col items-center gap-4" onSubmit={submit}>
        <AnimatePresence mode="wait">
          {(!response || response.success === false) && <motion.div className="flex flex-col items-center w-full gap-4">
            <textarea
              className="w-full p-4 text-lg bg-white border-2 rounded-md md:text-xl border-primary h-fit"
              placeholder="I would like this feature!"
              {...register("text")}
              rows={5}
            />
            <Error className="w-full px-2 text-start" state={formState} name="text" />
            <Button type="submit" color="secondary" className="px-5 py-3 text-lg md:text-xl w-fit">
              {!loading
                ? "Submit Feedback"
                : <ArrowPathIcon className="w-4 animate-spin" />
              }
            </Button>
          </motion.div>}
          {(response && response.success) && <motion.div
            key="success"
            className="py-8 text-xl font-semibold text-green-500"
            variants={fadeAnim}
            initial="in"
            animate="anim"
            exit="exit"
          >
            🎉 {response.message} 🎉
          </motion.div>}
        </AnimatePresence>
        <p role="note">Alternatively you can send an email to <Link color="primary" href="mailto:feedback@commitrocket.com" underline>feedback@commitrocket.com</Link></p>
      </form>
    </section>
  );
};

const FrontPage: Page = ({ }) => {

  return (
    <>
      <Head>
        <title>Commit Rocket</title>
      </Head>
      <main aria-labelledby="hero-title" className="flex flex-col flex-1 w-full gap-4 pb-8">
        <section aria-label="hero" className="flex flex-col-reverse items-center h-fit min-h-0 max-w-[105rem] lg:flex-row lg:min-h-[30rem] lg:h-[75dvh] lg:h-[75vh] mx-auto">
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
              className="absolute max-w-full max-h-full object-contain aspect-auto w-full rotate-[10deg]"
              loading="eager"
              variants={logoAnim}
              src={LogoPicture.src}
              width={LogoPicture.width}
              height={LogoPicture.height}
            />
          </div>
        </section>
        <section
          aria-labelledby="mission"
          className="flex flex-col gap-12 mx-auto text-center max-w-[105rem] py-16"
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
                <h3 className="text-2xl text-primary md:text-3xl lg:h-[5ex] 2xl:h-auto motion-safe:transition-all">
                  {title}
                </h3>
                <img
                  className="w-full sm:w-2/3 lg:w-full"
                  loading="lazy"
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