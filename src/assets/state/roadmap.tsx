import Heading from "@/components/layout/Heading";
import Link from "@/components/navigation/Link";
import { ReactNode } from "react";

export interface IRoadmapItem {
  title: string;
  text: ReactNode;
}

// NOTE: This list is assumed to be in order
export default [
  {
    title: "Q2 2023",
    text: <>
      <Heading.H4 id="roadmap-designs">
        Designs
      </Heading.H4>
      <p aria-labelledby="roadmap-designs">
        In April, we will begin creating initial designs for the Git client.
        Subscribers will receive surveys with each iteration to provide feedback.
        Be sure to <Link color="primary" href="/#sign-up" underline>sign up</Link> to have your voice heard!
        The designs will also be shared in our <Link color="primary" href="/blog" underline>blog</Link>.
      </p>
      <Heading.H4 id="roadmap-prototyping">
        Prototyping
      </Heading.H4>
      <p aria-labelledby="roadmap-prototyping">
        We will begin developing early prototype versions of the Git client in addition to creating designs.
        This will involve testing various libraries and designs to ensure that we create the best possible product.
        We will also decide on licensing and monetization strategies during this month.
      </p>
      <Heading.H4 id="roadmap-discord-server">
        Opening Discord Server
      </Heading.H4>
      <p aria-labelledby="roadmap-discord-server">
        To encourage an active community, we plan to launch a public Discord server where users can freely exchange ideas and communicate directly with the development team.
      </p>
      <Heading.H4 id="roadmap-active-development">
        Active Development
      </Heading.H4>
      <p aria-labelledby="roadmap-active-development">
        During the Q2 2023, we will be fully focused on active development of Commit Rocket,
        with the goal of releasing an early version of the Git client.
        Our team will be working tirelessly during this period to ensure that the client meets our high standards.
        We will also continue to provide regular development updates during these months to keep our community informed and engaged.
      </p>
      <Heading.H4 id="roadmap-insight-videos-on-development">
        Insight Videos on Development
      </Heading.H4>
      <p aria-labelledby="roadmap-insight-videos-on-development">
        At the beginning of Q2 2023, we aim to provide regular updates on the development progress through video updates and blog posts to maintain transparency and gather feedback from our community.
      </p>
    </>
  },
  {
    title: "Q3 & Q4 2023",
    text: <>

      <Heading.H4 id="roadmap-early-access-release">
        Ealy Access Releases
      </Heading.H4>
      <p aria-labelledby="roadmap-early-access-release">
        Early access versions of Commit Rocket will be made available exclusively to our mailing list subscribers and Discord members.
        To ensure a smooth user experience, we encourage users to share their feedback and feature requests with us via our Discord server and <Link color="primary" href="mailto:feedback@commitrocket.com" underline>our email</Link>.
        As the product is still subject to changes, we appreciate our users' contributions in helping us shape the final product.
      </p>
      <Heading.H4 id="roadmap-alpha-version">
        Alpha Version
      </Heading.H4>
      <p aria-labelledby="roadmap-alpha-version">
        If everything goes according to plan, our goal is to release a public alpha version of Commit Rocket by September.
        While it will be a challenging task, we are not afraid to take it on!
        Upon release of the first alpha version, we will also be open-sourcing the Git client!
      </p>
    </>
  },
  {
    title: "2024",
    text: <>
      <p>
        After the alpha release, we will continue to enhance Commit Rocket by taking feedback from our users and working on the client.
        Though we have not set specific goals, we aim to develop a stable and production-ready application by the end of the year.
      </p>
    </>
  }
] satisfies IRoadmapItem[];