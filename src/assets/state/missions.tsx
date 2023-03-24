import { ReactNode } from "react";
import { StaticImageData } from "next/image";

import ModernPicture from "@/assets/images/content/missions/modern.webp";
import FastAndFeaturePackedPicture from "@/assets/images/content/missions/fast-and-feature-packed.webp";
import CrossPlatformPicture from "@/assets/images/content/missions/cross-platform.webp";
import Link from "@/components/navigation/Link";

export interface IMission {
  title: string;
  image: StaticImageData;
  imageAlt: string;
  text: ReactNode;
}

const missions: IMission[] = [
  {
    title: "Modern",
    image: ModernPicture,
    imageAlt: "A painting palette with a brush and a modern art painting",
    text: <>
      <p className="mb-2">
        Commit Rocket aims to break away from the traditional and often outdated design of existing Git clients.
        Many Git clients have a similar look and feel, and the interface can be intimidating for new users.
      </p>
      <p>
        With Commit Rocket we plan to <Link href="/blog/3/designs" color="primary" underline>innovate and modernize the design of Git clients</Link> to
        create an attractive and user-friendly interface that will appeal to both beginners and experienced users alike.
      </p>
    </>
  },
  {
    title: "Fast & Feature Packed",
    image: FastAndFeaturePackedPicture,
    imageAlt: "The logos of Tauri, Rust and React",
    text: <>
      <p className="mb-2">
        Our aim is to provide a modern and fast Git experience without compromising any of the essential features.
      </p>
      <p>
        To achieve this, we employ modern technologies such as Tauri, Rust, and React to ensure that our client delivers optimal speed and performance.
        For more information on our features, take a look at our <Link href="/roadmap" color="primary" underline>roadmap</Link>!
      </p>
    </>
  },
  {
    title: "Cross-platform & Open-source",
    image: CrossPlatformPicture,
    imageAlt: "Available on Linux, Windows and Apple",
    text: <>
      <p className="mb-2">
        Commit Rocket aims to be accessible and transparent to its users.
        It will be cross-platform, making it available for use on different operating systems such as Linux, Windows, and MacOS.
      </p>
      <p>
        Additionally, Commit Rocket will be an open-source Git client,
        allowing anyone to view and modify the source code to suit their needs or make contributions to the project.
      </p>
    </>
  }
];

export default missions;