import { people } from "../team";
import tags from "./tags";

import thumbnail from "@blogImages/3/thumbnail.webp";
import myTheme from "@blogImages/3/my-theme.webp";
import sourcetreeMultiAccount from "@blogImages/3/sourcetree-multi-account.webp";
import spacesInArc from "@blogImages/3/spaces-in-arc.gif";

import A from "@/components/pages/blog/post/ArticleComponents";

/** @type {import("./article").default} */
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
        Features are one of the most important things about an app, and I have been thinking a lot about which I will be implementing in Commit Rocket. With the help of others, I'm coming up with new and unique features for Commit Rocket. Besides the obvious features like pulling and pushing, I would really love Commit Rocket to have a unique set of features to help improve people's workflows.
      </p>
      <p>
        I've personally spent quite a bit of time coming up with features and working out kinks. I would be proud to present them all to you in this post. Make sure to answer some of the questions in the <A.Link href="#survey">survey</A.Link> at the end of the article to help me improve Commit Rocket. All of the questions are optional, so make sure to only fill in the ones that you are comfortable with.
      </p>
      <p>
        Lets get started!
      </p>
    </A.Container>

    <A.TOC maxLevel={2} />

    <A.H2>Atomic stashing</A.H2>
    <p>
      Stashing is a very usefull tool in Git, they allow you to store your progress without having to commit them. This keeps you from accidentally breaking things and can help you stay organized. In applications such as Sourcetree or Github Desktop you can only commit all of your current changes.
    </p>
    <p>
      There are actually ways to only stash selected files and even lines. I would like to break this limitation and allow users to organize their stashed by atomically stashing changes whenever it suits them.
    </p>

    <A.H2>Multi-account support</A.H2>
    <p>
      Just like atomic stashing, multi-account support is another feature that "just makes sense". If you are like me, you might have multiple different Git account across multiple different platforms like Github, Gitlab and even Bitbucket. You might even have had to make a separate account for your education or your work.
    </p>
    <A.Container className="gap-2">
      <p role="note" aria-label="Note" className="mx-auto font-semibold">
        Sourcetree's account management
      </p>
      <A.Img
        className="mx-auto max-h-[27rem] w-fit border border-neutral"
        alt="Electron vs Tauri memory and build size"
        src={sourcetreeMultiAccount.src}
        width={sourcetreeMultiAccount.width}
        height={sourcetreeMultiAccount.height}
      />
    </A.Container>
    <p>
      My vision for multiple accounts within Commit Rocket is to be able to add it simply throught the settings, and select which account you want in your repository, and it will remember which account you want to commit from forever! This feels like the most convenient way to make use of such a feature, but let me know what you think about it. On a side-note I plan to support at least Github, Gitlab and Bitbucket, others may be added upon request.
    </p>

    <A.H2>Theming</A.H2>
    <p>
      A feature that I have only seen GitKraken do, is theming. Currently I'm rocking a purple theme across my browser, IDE and even my OS, but my darn Git client doesn't allow for personal themes! This is the reason why I wanted to make Commit Rocket, to make it purple (totally joking by the way).
    </p>

    <A.Container className="gap-2">
      <p role="note" aria-label="Note" className="mx-auto font-semibold">
        My theme
      </p>
      <A.Img
        className="mx-auto max-h-[27rem] w-fit border border-neutral-500"
        alt="Electron vs Tauri memory and build size"
        src={myTheme.src}
        width={myTheme.width}
        height={myTheme.height}
      />
    </A.Container>

    <p>
      Theming is not necessarily an essential feature, but it does allow people to personalize their experience, which I'm all for! This is why I would like to include a built-in visual editor for your themes, so that you can easily customize it to your liking. In addition I will be adding an export and import feature so that you can share and use other people's themes.
    </p>

    <A.H2>Commit Peeking</A.H2>
    <p>
      This feature I have seen no other Git client do, and I'm dubbing it "Commit peeking". Wouldn't it be awesome to know which files have been changed in a commit, without having to actively click on the commit itself? Commit peeking has got you covered.
    </p>
    <p>
      By hovering over a commit a small window will pop up showing the changed files. This will help you look for the commits you may want to find quicker and easier. Combining this with being able to see a specific, file's history, and you'd be able to find changes you need in no time.
    </p>

    <A.H2>Working Contexts</A.H2>
    <p>
      The following feature has been inspired by the Arc browser. In Arc you have something called "spaces". They are basically places where you can store browser tabs, bookmarks and that sort of stuff. You can simply switch between them by using a hotkey. This seems really useful to me, especially in a Git client.
    </p>
    <A.Container className="gap-2">
      <p role="note" aria-label="Note" className="mx-auto font-semibold">
        Spaces in Arc
      </p>
      <A.Img
        className="mx-auto border border-neutral-500"
        alt="Switching 'spaces' in the Arc browser"
        src={spacesInArc.src}
        width={spacesInArc.width}
        height={spacesInArc.height}
      />
      <p role="note" aria-label="Source" className="mx-auto text-sm">
        Source: <A.Link href="https://www.youtube.com/watch?v=kVZZv1ygNP8" external nofollow>Arc | Setting up Spaces & Profiles</A.Link> by <A.Link href="https://www.youtube.com/@TheBrowserCompany" external nofollow>The Browser Company</A.Link>
      </p>
    </A.Container>
    <p>
      Here is my pitch. You have multiple working contexts, like work, school, side-project, etc. You can store your repositories, active theme, accounts, etc. in this context. Then when you switch contexts the repositories, theme, etc. would be retrieved and applied. If you are working on multiple projects then this should keep you more organized. Preferably these contexts would be a 1-click switch, or a hotkey. Unlike VSCode's profiles, you will be able to sync over your settings without having to resort to switching back and forth.
    </p>
    <p>
      Personally I really like this feature. I have a lot of open repositories at one time, so having a better way to organize them is very welcome. Combining this with themes, could give an extra distinction between your working contexts. I think I would be making use of this a lot. Let me know if you would enjoy this feature!
    </p>

    <A.H2>Plugins</A.H2>
    <p>
      The last feature I want to talk about in this post is plugins. Having plugins paired with a Git client, just makes sense. If Commit Rocket doesn't have what you need, you can simply install a plugin that does what you want!
    </p>
    <p>
      Which plugins would you be able to install? All sorts of plugins! I personally thought of Scrumboard integrations with Jira, Trello or Devops; Maybe a Vim keybindings plugin; or automatic commit naming using AI. There are a lot of posibilities with this system.
    </p>
    <p>
      In addition I would like to add a plugin marketplace. Maybe something like how the note taking app Obsidian does it, having core plugins and community plugins.
    </p>
    <p>
      Plugins would work together with the working contexts, by switching which plugin is active between the different contexts. Maybe you don't need a scrumboard active in your side-project context, so you turn it off to save resource and headspace.
    </p>
    <p>
      I see a lot of potential with plugins, and I hope you do too!
    </p>

    <A.H2>Survey</A.H2>
    <iframe
      className="w-full"
      src="https://docs.google.com/forms/d/e/1FAIpQLSfabnpc8SWY09GK2mkFeH5XUb3qG6enN-EFaUl_mNcyPbRW-Q/viewform?embedded=true"
      width="1920"
      height="1650"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
    >
      Loading survey...
    </iframe>

    <A.H2>Wrapping up</A.H2>
    <p>
      All of these features are really exciting to me, and are making me hyped for the future of Commit Rocket. These features working together to create an organized, personalized and comfortable experience for all uses sounds like music in my ears. Make sure to participate in the survey, your opinions and ideas will help me a lot as I continue to create Commit Rocket.
    </p>
    <p>
      That will be all for now, however stay tuned for some upcoming articles about the plugin system, and one about the Commit Rocket techstack.
    </p>
  </>
};