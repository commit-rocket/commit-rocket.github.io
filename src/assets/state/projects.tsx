import { ReactNode } from "react";
import { StaticImageData } from "next/image";

import TheNewOilThumbnail from "@/assets/images/content/projects/thenewoil.webp";
import ReactRouterSitemapMakerThumbnail from "@/assets/images/content/projects/react-router-sitemap-maker.webp";


export interface IProject {
  title: ReactNode;
  description: ReactNode,
  thumbnailAlt: string;
  thumbnail: StaticImageData;
  href: string;
  linkText?: string;
  linkRel?: string;
}

const projects: IProject[] = [
  {
    title: "The New Oil (Redesign)",
    description: <>
      <p>
        We recently worked on redesigning The New Oil's website, which was an already existing website.
        Our design proposals impressed the website owner and they agreed to let us redesign the website with a unique requirement - no javascript.
        We utilized Astro's static site generation capabilities to develop a website that doesn't load any JavaScript once it's built.
      </p>
      <p>
        We completed the project in February 2023 and handed it over to the website owner,
        who was extremely pleased with the outcome.
      </p>
    </>,
    thumbnailAlt: "The New Oil redesigned frontpage",
    thumbnail: TheNewOilThumbnail,
    href: "https://www.thenewoil.org/",
  },
  {
    title: "React Router Sitemap Maker",
    description: <>
      <p>
        React Router Sitemap Maker is a JavaScript library we developed and posted on NPM.
        This library was born out of the necessity to build a portfolio website using React and React-Router.
        We found that existing solutions for generating sitemaps with React Router were lacking, so we decided to create our own.
        Our library has a large amount of code coverage, ensuring reliability and ease of use.
      </p>
    </>,
    thumbnailAlt: "React Router Sitemap Maker npm-page",
    thumbnail: ReactRouterSitemapMakerThumbnail,
    href: "https://github.com/Rikthepixel/react-router-sitemap-maker",
    linkText: "View Source"
  }
];

export default projects;