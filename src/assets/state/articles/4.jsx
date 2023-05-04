import { people } from "../team";
import tags from "./tags";

import thumbnail from "@blogImages/2/thumbnail.webp";
import deleteError from "@blogImages/2/sourcetree-delete-error.webp";

import A from "@/components/pages/blog/post/ArticleComponents";

/** @satisfies {import("./article").default} */
export default {
  title: "Features You Can Expect in Commit Rocket",

  thumbnail,
  thumbnailAlt: "Thumbnail alt",

  vertical: "software",

  slug: "commit-rocket-features",
  tags: [
    tags.commitRocket,
    tags.news,
    tags.plans,
    {
      name: "Commit Rocket Features",
      hidden: true
    },
    {
      name: "Planning",
      hidden: true
    }
  ],

  author: people.rik,

  created: new Date("2023/05/05"),

  teaser: "Commit Rocket is still very young and we are thinking of features to put into it. We have lots of ideas, what are your thoughts?",

  content: <>
    <A.Container className="text-xl">
      <p>
        
      </p>

      <p>
        Let's get started!
      </p>
    </A.Container>

    <A.TOC maxLevel={2} />

    <A.H2>
      Deleting a local branch
    </A.H2>

    <A.H2>
      Wrapping up
    </A.H2>
    <p>
      Now that you know how to delete branches in Git CLI, it's time to start cleaning up your repositories! Remember to use caution when deleting branches, especially when deleting remote branches, as they can affect other collaborators working on the same project.
    </p>
    <p>
      We hope you found this article helpful! If you have any questions or feedback, feel free to reach out to us via <A.Link href="mailto:feedback@commitrocket.com">feedback@commitrocket.com</A.Link>. At Commit Rocket, we are <i>committed</i> to making Git simpler and faster for developers everywhere. If you're interested in learning more about our in development Git client, be sure to have a look around our website!
    </p>
    <p>
      And last but not least, if you found this article useful, please share it with your fellow developers so they can benefit from it as well. Thank you for reading!
    </p>
  </>
};