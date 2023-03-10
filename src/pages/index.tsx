import Head from "next/head";

import { Page } from "@/types/page";
import LinkButton from "@/components/controls/LinkButton";

const FrontPage: Page = ({ className }) => {
  return (
    <>
      <Head>
        <title>Commit Rocket</title>
      </Head>
      <LinkButton href="/about" color="secondary">
        Keep me up to date
      </LinkButton>
    </>
  );
};

export default FrontPage;