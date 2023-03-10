import Head from "next/head";
import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';

import '@/styles/main.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: "--font-open-sans"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Commit Rocket</title>
      </Head>
      <div className="flex flex-col items-center">
        <Component className={openSans.variable} {...pageProps} />
      </div>
    </>
  );
}
