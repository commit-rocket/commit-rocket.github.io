import { StaticImageData } from "next/image";

import ModernPicture from "@/assets/images/content/missions/modern.webp";
import FastAndFeaturePackedPicture from "@/assets/images/content/missions/fast-and-feature-packed.webp";
import CrossPlatformPicture from "@/assets/images/content/missions/cross-platform.webp";

interface IMission {
  title: string;
  image: StaticImageData;
  text: string;
}

const missions: IMission[] = [
  {
    title: "Modern",
    image: ModernPicture,
    text: "Commit Rocket's main focus is the visual appeal of the user interface. With the goal of crafting a beginner-friendly and easy to use experience."
  },
  {
    title: "Fast & Feature Packed",
    image: FastAndFeaturePackedPicture,
    text: "We aim to create a modern and fast Git experience, without sacrificing any of the features you love. Making use of modern technologies like Tauri, Rust and React."
  },
  {
    title: "Cross-platform & Open-source",
    image: CrossPlatformPicture,
    text: "Accessibility and transparency is very important to us. That is why Commit Rocket will be open-source and be cross-platform."
  }
];

export default missions;