import FeedbackSection from "@/components/pages/contribute/FeedbackSection";

import { Page } from "@/types/page";
import Head from "next/head";

const ContributePage: Page = ({ }) => {
  return (
    <>
      <Head>
        <title>Contribute - Commit Rocket</title>
      </Head>
      <main aria-labelledby="contribute" className="flex flex-col flex-1 w-full gap-8 max-w-7xl">
        <h1 id="contribute" className="text-4xl font-bold text-center lg:text-6xl text-secondary">Contribute</h1>
        <FeedbackSection />
      </main>
    </>
  );
};

export default ContributePage;