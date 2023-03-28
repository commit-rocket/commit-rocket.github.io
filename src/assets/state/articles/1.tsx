import IArticle from "./article";
import { people } from "../team";
import tags from "./tags";

import thumbnail from "@/assets/images/content/blog/1/thumbnail.webp";

export default {
  title: "1",
  
  thumbnail,
  thumbnailAlt: "A placeholder thumbnail",

  slug: "1",
  tags: [
    tags.news,
    tags.commitRocket
  ],

  author: people.rik,

  teaser: "1",
  content: <>
    1
  </>,

  created: new Date("2023/03/24")
} satisfies IArticle;