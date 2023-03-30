import Head from "next/head";

import Heading from "@/components/layout/heading";
import FeedbackSection from "@/components/pages/contribute/FeedbackSection";

import { Page } from "@/types/page";

const ContributePage: Page = ({ }) => {
  return (
    <>
      <Head>
        <title>Contribute - Commit Rocket</title>
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