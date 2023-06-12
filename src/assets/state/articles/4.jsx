import { people } from "../team";
import tags from "./tags";

import thumbnail from "@blogImages/4/thumbnail.webp";
import gitmoji from "@blogImages/4/gitmoji.webp";
import conventionalcommits from "@blogImages/4/conventionalcommits.webp";
import logo from "@/assets/images/brand/logo.svg";

import A from "@/components/pages/blog/post/ArticleComponents";

/** @type {import("./article").default} */
export default {
  title: "Exploring Git Commit Naming Standards",

  thumbnail,
  thumbnailAlt: "Anatomy of a Commit Message",

  vertical: "software",

  slug: "git-commit-naming",

  tags: [
    tags.git,
    tags.tutorial,
    tags.discover,
  ],

  author: people.rik,

  created: new Date("2023/06/12"),

  teaser: "Explore the world of Git commit naming standards and learn how to choose the right one for your project",

  content: <>
    <p>
      Personally, I must admit that I haven't always adhered to naming conventions when making Git commits. However, I've come to realize the tremendous benefits they offer, especially when working in teams. Recently, while working on Commit Rocket, I found myself seeking a structured approach to commit naming.
    </p>
    <p>
      That is why I am writing this article! I would like to find out what makes a great commit message and which standards there are. Also most importantly for me, which approach I could implement in Commit Rocket. I hope to take you along and teach you what I've learned.
    </p>
    <A.H2>Benefits of Naming Conventions</A.H2>
    <p>
      From my own experience, I've found that having a structured way to name commits significantly reduces the stress and uncertainty associated with creating commit messages. When you can clearly express the purpose and impact of your changes in a concise manner, it becomes easier to navigate and understand the commit history. It also helps when you need to locate a specific commit later on, whether to review the changes or revert them if needed.
    </p>
    <A.H3>Anatomy of a Commit Message</A.H3>
    <p>
      As you can see, a commit message is meant to convey some sort of meaning. Having standardized ways to write these messages means that everyone will be on the same page.
    </p>
    <A.H4>Imperative Mood</A.H4>
    <p>
      It's important to use the imperative mood, which provides a clear instruction about what the commit does. Instead of saying "I added feature XYZ," it should be "Add feature XYZ." This small change in phrasing makes a big difference in creating a consistent and actionable commit history.
    </p>
    <A.H4>Detail and Explanation</A.H4>
    <p>
      Commit messages should be detailed enough to convey the purpose and context of the changes. When writing commit messages ask yourself why the changes were made, what the context is of the changes and what effect it will have.
    </p>
    <p>
      While a short one-liner can work in some cases, using multi-paragraph messages can provide a more in-depth explanation, especially for complex or significant changes. If you're using the Git command-line interface, you can achieve this by adding an extra `-m` flag to the commit command. Here is an example:
    </p>
    <A.Code lang="bash">
      git commit -m "Fix bug where users could switch to light mode" -m "Users were able to switch to light mode because the settings data loaded from the LocalStorage was not validated"
    </A.Code>
    <A.H4>Length and Content</A.H4>
    <p>
      The length of a commit message is also important. Aim for around 50 to 75 characters to keep it concise and readable. Avoid using filler words or unnecessary details like "I think" or "maybe." Instead, focus on conveying the essence of the change in a clear and straightforward manner.
    </p>
    <A.H2>Popular Naming Conventions</A.H2>
    <p>
      There are several widely adopted naming conventions that can serve as helpful guidelines for crafting effective commit messages. Here are two popular options:
    </p>
    <A.H3><A.Link href="https://www.conventionalcommits.org/en/v1.0.0/" title="conventionalcommits.org" nofollow external>Conventional Commits</A.Link></A.H3>
    <div className="flex items-center gap-4 flex-col md:flex-row">
      <img
        className="rounded-2xl max-h-24 w-auto border border-neutral-500"
        src={conventionalcommits.src}
        width={conventionalcommits.width}
        height={conventionalcommits.height}
      />
      <p>
        This convention provides a structured format for commit messages, including optional scopes, a description, body, and footer(s). For example:
      </p>
    </div>
    <A.Code lang="bash">{`
      feat(user-profile): Add avatar image upload functionality
      [optional body]
      [optional footer(s)]
    `}</A.Code>
    <p>
      Conventional Commits offer an easy-to-understand and versatile format that can be quickly adopted and applied to your projects.
    </p>
    <A.H3><A.Link href="https://gitmoji.dev/" title="gitmoji.dev" nofollow external>Gitmoji</A.Link></A.H3>
    <div className="flex items-center gap-4 flex-col md:flex-row">
      <img
        className="rounded-2xl max-h-24 w-auto border border-neutral-500"
        src={gitmoji.src}
        width={gitmoji.width}
        height={gitmoji.height}
      />
      <p>
        Gitmoji introduces emojis to commit messages, giving them a visually appealing touch. It follows a format that includes an intention, an optional scope, and a message. For example:
      </p>
    </div>
    <A.Code lang="bash">
      🐛 Fix issue with form validation
    </A.Code>
    <p>
      While Gitmoji brings a fun and expressive aspect to commit messages, it may take some time to get used to its unique set of emojis and their meanings.
    </p>
    <A.H2>Conclusion</A.H2>
    <div className="flex items-center gap-4">
      <p>
        The Commit Rocket repository will likely be making use of Gitmoji. It will take some getting used to for people, but I think it is a neat and clean way to express code changes. I also think that adding a visual aspect to commits is a fun idea. Maybe adding template commit names to Commit Rocket will be helpful 🤔.
      </p>
      <img
        className="w-24 h-24 aspect-square rotate-30"
        {...logo}
      />
    </div>
    <p>
      Remember, commit naming conventions are just tools to help us communicate effectively and collaborate smoothly within our projects. While there are various conventions to choose from, the most important thing is to adopt one that works well for you and your team.
    </p>
  </>
};