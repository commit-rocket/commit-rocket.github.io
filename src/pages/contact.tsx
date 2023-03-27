import Head from "next/head";

import { Page } from "@/types/page";
import contactMethods from "@/assets/state/contactMethods";
import Link, { style } from "@/components/navigation/Link";

const ContactPage: Page = ({ }) => {
  return (
    <>
      <Head>
        <title>Contact - Commit Rocket</title>
      </Head>
      <main aria-labelledby="contact" className="flex flex-col flex-1 w-full gap-8 max-w-7xl">
        <h1 id="contact" className="text-4xl font-bold text-center lg:text-6xl text-secondary">Contact</h1>
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
                  scroll={true}
                  underline={Boolean(method.href)}
                >
                  <method.icon
                    className="w-16 h-16 md:w-24 md:h-24"
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