import Head from "next/head";
import { useRouter } from "next/router";
import ArrowUturnLeftIcon from "@heroicons/react/24/solid/ArrowUturnLeftIcon";
import HomeModernIcon from "@heroicons/react/24/solid/HomeModernIcon";

import { Page } from "@/types/page";
import LinkButton from "@/components/controls/LinkButton";
import Button from "@/components/controls/Button";
import Heading from "@/components/content/Heading";

import { makeOgMeta } from "@/lib/meta/opengraph";
import makeSitemapMeta from "@/lib/meta/sitemap";
import KeywordsMeta from "@/components/head/KeywordsMeta";

const NotFound: Page = ({ pathname }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        {makeOgMeta({ title: "404", pathname })}
        {makeSitemapMeta({ priority: 0.1 })}
        <KeywordsMeta tags={[
          "Not Found",
          "404"
        ]} />
      </Head>
      <main className="flex items-center justify-center flex-1 w-full pb-8" aria-labelledby="not-found">
        <div className="flex flex-col gap-2 p-8 text-center border-2 rounded-2xl image-star border-cr-primary">
          <Heading.H1 id="not-found">
            Not Found.
          </Heading.H1>
          <p>There are no commits to be found here!</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <LinkButton href="/" color="primary">
              <HomeModernIcon
                className="w-4 h-4"
                width="1em"
                height="1em"
              />
              Home
            </LinkButton>
            <Button onClick={() => router.back()} color="primary">
              <ArrowUturnLeftIcon
                className="w-4 h-4"
                width="1em"
                height="1em"
              />
              Back
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;