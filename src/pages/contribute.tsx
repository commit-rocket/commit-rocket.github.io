import Head from "next/head";

import Heading from "@/components/content/Heading";
import FeedbackSection from "@/components/pages/contribute/FeedbackSection";

import { Page } from "@/types/page";
import { makeOgMeta } from "@/lib/meta/opengraph";
import makeSitemapMeta from "@/lib/meta/sitemap";
import KeywordsMeta from "@/components/head/KeywordsMeta";


const ContributePage: Page = ({ pathname }) => {
  return (
    <>
      <Head>
        {makeOgMeta({ title: "Contribute", pathname })}
        {makeSitemapMeta({ priority: 0.6 })}
        <KeywordsMeta tags={[
          "Contribute",
          "Feedback"
        ]} />
      </Head>
      <main aria-labelledby="contribute" className="flex flex-col flex-1 w-full gap-8 max-w-7xl">
        <Heading.H1 id="contribute" className="text-center text-secondary">
          Contribute
        </Heading.H1>
        <FeedbackSection />
      </main>
    </>
  );
};

export default ContributePage;