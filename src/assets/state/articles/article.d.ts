import { ReactNode } from "react";
import { StaticImageData } from "next/image";

import { IMember } from "../team";
import { ITag } from "./tags";

type IArticle = {
  title: string;
  thumbnail: StaticImageData,
  thumbnailAlt: string;

  tags: ITag[];

  /** 
  * A high level overview of the article E.g. Technology 
  */
  vertical: string;
  
  slug: string;

  author: IMember;

  teaser: string;
  content: ReactNode;

  updated?: Date;
  created: Date;
};
export default IArticle;