import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, MotionConfig, AnimatePresence } from "framer-motion";
import type { AppProps } from 'next/app';
import Head from "next/head";

import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

import '@/styles/main.css';

const pageTransition = {
  duration: .35,
  ease: "easeOut"
};

const pageAnimation = {
  initial: {
    opacity: 0,
    translateX: "0%"
  },
  animate: {
    opacity: 100,
    translateX: "0%",
  },
  exit: {
    opacity: 0,
    translateX: "5%"
  }
};

export default function App({ Component, pageProps, router }: AppProps) {
  const previousPathname = useRef(router.pathname);
  const [initialLoad, setIntialLoad] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (previousPathname.current !== router.pathname) setIntialLoad(false);
    previousPathname.current = router.pathname;
  }, [router.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <Head>
        <title>Commit Rocket</title>
      </Head>
      <GoogleAnalytics />
      <div className="flex flex-col font-sans">
        <Header />
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            className="flex flex-col items-center flex-1 w-full px-8"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            variants={reduceMotion ? {} : pageAnimation}
          >
            <Component
              className=""
              initialLoad={initialLoad}
              reduceMotion={reduceMotion}
              {...pageProps}
            />
            <Footer />
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
