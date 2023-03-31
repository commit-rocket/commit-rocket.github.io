import Head from "next/head";

import { Page } from "@/types/page";
import contactMethods from "@/assets/state/contactMethods";
import Link, { style } from "@/components/navigation/Link";
import Heading from "@/components/layout/Heading";
import { makeOgMeta } from "@/utils/meta/opengraph";

const ContactPage: Page = ({ pathname }) => {
  return (
    <>
      <Head>
        {makeOgMeta({ title: "Contact", pathname })}
      </Head>
      <main aria-labelledby="contact" className="flex flex-col flex-1 w-full gap-8 max-w-7xl">
        <Heading.H1 id="contact" className="text-center text-secondary">
          Contact
        </Heading.H1>
        <ul className="grid flex-1 gap-4 lg:grid-flow-col sm:grid-cols-2 lg:grid-cols-none place-items-center" aria-label="contact methods">
          {contactMethods.map((method, i) => {
            const Tag = method.href ? Link : "div";

            return (
              <li key={i} className="flex-1">
                <Tag
                  color="primary"
                  className={`flex flex-col items-center ${method.href ? "" : style({ color: "primary", underline: true })}`}
                  //@ts-ignore
                  href={method.href}
                  scroll={method.href ? true : undefined}
                  underline={method.href ? true : undefined}
                >
                  <method.icon
                    className="w-16 h-16 md:w-24 md:h-24"
                    aria-label={method.iconAlt}
                  />
                  <p className="font-bold text-center md:text-lg">
                    {method.title}
                  </p>
                </Tag>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default ContactPage;