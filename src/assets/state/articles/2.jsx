import { people } from "../team";
import tags from "./tags";

import thumbnail from "@blogImages/2/thumbnail.webp";
import deleteError from "@blogImages/2/sourcetree-delete-error.webp";

import A from "@/components/pages/blog/post/ArticleComponents";

/** @satisfies {import("./article").default} */
export default {
  title: "How to Delete Branches in Git",
  hidden: true,

  thumbnail,
  thumbnailAlt: "Deleting Branches in Git",

  vertical: "technology",

  slug: "deleting-branches-in-git",
  tags: [
    tags.git,
    tags.tutorial,
    {
      name: "CLI",
    },
    {
      name: "Delete Branches",
      hidden: true
    },
    {
      name: "Git Branching",
      hidden: true
    }
  ],

  author: people.rik,

  created: new Date("2023/04/11"),

  teaser: "Learn about how \"Commit Rocket\", our new in development Git client, came to be and what we have planned for it!",
  content: <>
    <A.Container className="text-xl">
      <p>
        As we develop our new Git client Commit Rocket, we are diving into all of Git its features, including branch deletion. In this article, we'll cover several Git commands that will help you delete branches, including local and remote branches. If you're not using a Git client, it can sometimes be challenging to remember what command to run, so we've provided some easy-to-use examples that you can copy and paste.
      </p>

      <p>
        Let's get started!
      </p>
    </A.Container>

    <A.TOC maxLevel={2} />

    <A.H2>
      Deleting a local branch
    </A.H2>

    <p>
      To delete a local branch in Git CLI, use the command <code>git branch -d</code>, followed by the name of the branch you want to delete. For example:
    </p>

    <A.Code lang="bash">{`
      git branch -d <branch-name>
    `}</A.Code>

    <p>
      If you want to delete an unmerged branch, you can use the <code>-D</code> flag instead of <code>-d</code>. For example:
    </p>

    <A.Code lang="bash">{`
      git branch -D <branch-name>
    `}</A.Code>

    <A.H2>
      Deleting a remote branch
    </A.H2>

    <p>
      To delete a remote branch in Git CLI, use the command <code>git push</code> with the <code>-d</code> flag, followed by the name of the remote branch you want to delete. For example:
    </p>

    <A.Code lang="bash">{`
      git push <remote-name> -d <branch-name>
    `}</A.Code>

    <A.H2>
      Deleting both the local and remote branches
    </A.H2>

    <p>
      To delete both the local and remote branch at the same time using Git CLI, use the command <code>git push</code> with the <code>-d</code> flag, followed by the name of the remote branch, and then use the command <code>git branch -d</code>, followed by the name of the local branch. For example:
    </p>

    <A.Code lang="bash">{`
      git push <remote-name> -d <branch-name> && git branch -d <branch-name>
    `}</A.Code>

    <A.H2>
      Commit Rocket
    </A.H2>

    <p>
      Deleting branches is one of the standard features a Git client should have. One of the things we have noticed in already existing clients like SourceTree, is that they don't give errors as to why branch deletion fails. For example, if a branch is not merged yet it will throw a generic Git error, instead of telling you that the branch was not merged yet.
    </p>

    <A.Container className="gap-2">
      <A.Img
        className="max-w-3xl mx-auto"
        src={deleteError.src}
        width={deleteError.width}
        height={deleteError.height}
        alt="Very verbose SourceTree unmerged branch deletion error"
        aria-aria-labelledby="delete-error-note"
      />
      <p
        id="delete-error-note"
        className="mx-auto text-center text-sm"
        role="note"
      >
        A SourceTree error when deleting an unmerged branch without Force delete enabled
      </p>
    </A.Container>

    <p>
      We'll be taking notes from that and make sure that our error handling is descriptive and actually tells you what to do if something goes wrong.
    </p>

    <A.H2>
      Wrapping up
    </A.H2>
    <p>
      Now that you know how to delete branches in Git CLI, it's time to start cleaning up your repositories! Remember to use caution when deleting branches, especially when deleting remote branches, as they can affect other collaborators working on the same project.
    </p>
    <p>
      We hope you found this article helpful! If you have any questions or feedback, feel free to reach out to us via <A.Link href="mailto:feedback@commitrocket.com">feedback@commitrocket.com</A.Link>. At Commit Rocket, we are committed to making Git simpler and faster for developers everywhere. If you're interested in learning more about our in development Git client, be sure to check us out at <A.Link href="https://www.commitrocket.com/">commitrocket.com</A.Link>.
    </p>
    <p>
      And last but not least, if you found this article useful, please share it with your fellow developers so they can benefit from it as well. Thank you for reading!
    </p>
  </>
};