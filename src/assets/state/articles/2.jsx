import { people } from "../team";
import tags from "./tags";

import thumbnail from "@blogImages/1/thumbnail.webp";

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
        As part of the development of Commit Rocket, we want to make sure that we're well-versed in all things Git, including branch deletion. If you are not using a Git client it can sometimes be challenging to remember what command you have to run. So, in this article, I will go over some commands to delete a branch using the Git CLI, with examples that you can just copy, adjust and paste.
      </p>

      <p>
        Jump ahead:
      </p>
    </A.Container>

    <A.TOC maxLevel={2} />

    <A.H2>
      Deleting a local branch in Git CLI:
    </A.H2>

    <p>
      To delete a local branch in Git CLI, you can use the git branch -d command followed by the name of the branch you want to delete. Here's an example command:
    </p>

    <A.Code lang="bash">{`
      git branch -d <branch-name>
    `}</A.Code>

    <p>
      For instance, to delete a local branch called "feature/cookie," you would run:
    </p>

    <A.Code lang="bash">{`
      git branch -d feature/cookie
    `}</A.Code>

    <A.H3>
      Unmerged local branch
    </A.H3>

    <p>
      However there is a caviate with running this command! It does not allow you to delete any branch that has not been merged. To delete a branch that hasn't been merged use the <code>-D</code> flag instead of <code>-d</code>. This would result in the command changing to become:
    </p>

    <A.Code lang="bash">{`
      git branch -D feature/cookie
    `}</A.Code>

    <A.H2>
      Deleting a remote branch using the Git CLI:
    </A.H2>

    <p>
      To delete a remote branch in Git CLI, you can use the git push command with the <code>-d</code> flag, followed by the name of the remote branch you want to delete. Here's an example command:
    </p>

    <A.Code lang="bash">{`
      git push <remote-name> -d <branch-name>
    `}</A.Code>

    <p>
      For instance, to delete a remote branch called "feature/cookie" on the "origin" remote, you would run:
    </p>

    <A.Code lang="bash">{`
      git push origin -d feature/cookie
    `}</A.Code>

    <p>
      This will delete the remote branch from your repository.
    </p>

    <A.H2>
      Deleting both the local branch and the remote branch with the Git CLI:
    </A.H2>

    <p>
      To delete both the local branch and the remote branch at the same time using the Git CLI, you can use the <code>git push</code> command with the <code>-d</code> flag and the <code>git branch -d</code> command together. Here's an example command:
    </p>

    <A.Code lang="bash">{`
      git push <remote-name> -d <branch-name> && git branch -d <branch-name>
    `}</A.Code>

    <A.Code lang="bash">{`
      git push origin -d feature/cookie && git branch -d feature/cookie
    `}</A.Code>
    <A.H2>
      Closing statements
    </A.H2>

    <p>
      I hope you found this article helpful! If you have any questions or feedback, feel free to reach out to us via <A.Link href="mailto:feedback@commitrocket.com">feedback@commitrocket.com</A.Link>. Commit Rocket is currently in development and we are always looking for ways to improve the product, and your feedback would be greatly appreciated. Thank you for reading!
    </p>
  </>
};;;