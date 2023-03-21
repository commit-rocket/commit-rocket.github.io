import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="overflow-auto scroll-smooth scroll-p-4">
      <Head>
        <meta name="description" content="Commit Rocket, the next-gen git client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
