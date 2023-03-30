import IArticle from "./article";

import { people } from "../team";
import tags from "./tags";

import thumbnail from "@/assets/images/content/blog/2/thumbnail.webp";

export default {
  title: "2",

  thumbnail,
  thumbnailAlt: "A placeholder thumbnail",

  vertical: "technology",

  slug: "2",
  tags: [
    tags.git
  ],

  author: people.rik,

  teaser: "2",
  content: <>
    2 cups on a shelf
    <p>Content in a p</p>
  </>,

  updated: new Date("2023/03/29"),
  created: new Date("2023/03/28")
} satisfies IArticle;