import IArticle from "./article";
import { people } from "../team";
import tags from "./tags";

import thumbnail from "@/assets/images/content/blog/1/thumbnail.webp";
import ArticleTableOfContent from "@/components/pages/blog/post/ArticleTableOfContent";

export default {
  title: "1",

  thumbnail,
  thumbnailAlt: "A placeholder thumbnail",

  vertical: "technology",

  slug: "1",
  tags: [
    tags.news,
    tags.commitRocket
  ],

  author: people.rik,

  teaser: "Lorem ipsum dolor sit amet consectetur Voluptates facere quasi repellat doloremque quae saepe?",
  content: <>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>

    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut quia facilis dolor ullam distinctio tempora delectus laudantium similique. Eos mollitia maxime nam id nemo repellendus natus accusamus dicta quam illum.
    <ArticleTableOfContent />

    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem aliquam illum aut atque tempore quod repudiandae ad maiores molestias? Maxime animi at incidunt omnis rem nostrum, ipsum ab molestias deleniti.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum recusandae laborum fugit quo iusto culpa animi ab cupiditate cumque. Labore modi rem, enim molestias sint eaque porro velit facilis excepturi?
  </>,

  created: new Date("2023/03/24")
} satisfies IArticle;