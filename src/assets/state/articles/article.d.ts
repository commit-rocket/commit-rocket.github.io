import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { IMember } from "../team";

type IArticle = {
  title: string;
  thumbnail: StaticImageData,
  thumbnailAlt: string;
  tags: string[];
  slug: string;

  author: IMember;

  teaser: string;
  content: ReactNode;

  updated?: Date;
  created: Date;
};
export default IArticle;