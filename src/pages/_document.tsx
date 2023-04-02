import CommonCss from "@/components/head/CommonCss";
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="overflow-auto scroll-smooth scroll-p-4">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <CommonCss />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
