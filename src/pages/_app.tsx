import '@/styles/main.css';

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, MotionConfig, AnimatePresence } from "framer-motion";
import type { AppProps } from 'next/app';
import Head from "next/head";

import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";


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

  const onAnimFinished = useCallback(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Ensure that target has time to render
    setTimeout(() => {
      const targetElement = document.querySelector(hash);
      if (!targetElement) return;

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: 'start',
        inline: 'nearest'
      });
    }, 1);
  }, []);
  console.log(router);

  return (
    <MotionConfig reducedMotion="user">
      <GoogleAnalytics />
      <div className="flex flex-col font-sans">
        <Header />
        <AnimatePresence mode="wait" onExitComplete={onAnimFinished}>
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
              pathname={new URL(router.asPath, "http://example.com").pathname}
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
