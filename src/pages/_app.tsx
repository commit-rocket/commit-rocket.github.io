import type { AppProps } from 'next/app';
import '@/styles/main.css';


import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'], variable: "--font-open-sans" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col items-center">
      <Component className={openSans.variable} {...pageProps} />
    </div>
  );
}
