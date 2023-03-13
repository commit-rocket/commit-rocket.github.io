import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ArrowUturnLeftIcon from "@heroicons/react/24/solid/ArrowUturnLeftIcon";
import HomeModernIcon from "@heroicons/react/24/solid/HomeModernIcon";

import { Page } from "@/types/page";
import LinkButton from "@/components/controls/LinkButton";
import Button from "@/components/controls/Button";

const NotFound: Page = ({ }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - Commit Rocket</title>
      </Head>
      <main className="flex items-center justify-center flex-1 w-full" aria-labelledby="not-found">
        <div className="flex flex-col gap-2 p-4 text-center rounded-md shadow shadow-black/25 bg-primary/25">
          <h1 id="not-found" className="text-5xl text-secondary">Not Found.</h1>
          <p>There are no commits to be found here!</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <LinkButton href="/" color="secondary">
              <HomeModernIcon className="w-4" />
              Home
            </LinkButton>
            <Button onClick={() => router.back()} color="secondary">
              <ArrowUturnLeftIcon className="w-4" />
              Back
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;