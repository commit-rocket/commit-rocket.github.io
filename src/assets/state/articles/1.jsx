import { people } from "../team";
import tags from "./tags";

import thumbnail from "@blogImages/1/thumbnail.webp";
import tauriVsElectron from "@blogImages/1/tauri-vs-electron.webp";
import oldLookingClients from "@blogImages/1/clients.webp";

import A from "@/components/pages/blog/post/ArticleComponents";

const clients = {
  ghDesktop: {
    name: "Github Desktop",
    link: "https://desktop.github.com/"
  },
  sourceTree: {
    name: "SourceTree",
    link: "https://www.sourcetreeapp.com/"
  },
  gitKraken: {
    name: "GitKraken",
    link: "https://www.gitkraken.com/"
  }
};

/** @satisfies {import("./article").default} */
export default {
  title: "Introducing Commit Rocket! 🤩",

  thumbnail,
  thumbnailAlt: "What is Commit Rocket",

  vertical: "technology",

  slug: "introducing-commit-rocket",
  tags: [
    tags.intro,
    tags.commitRocket,
    tags.news,
    {
      name: "Planned Features",
      hidden: true
    },
    {
      name: "Explanation",
      hidden: true
    },
    {
      name: "Our Inspiration",
      hidden: true
    },
    {
      name: "What is Commit Rocket",
      hidden: true
    }
  ],

  author: people.rik,

  created: new Date("2023/04/10"),

  teaser: "Learn about how \"Commit Rocket\", our new in development Git client, came to be and what we have planned for it!",
  content: <>

    <A.Container className="text-xl">
      <p>
        Git is the backbone of modern software development, allowing developers to collaborate and maintain version control with ease. As part of our Git workflow we usually include a Git client, however many of the current options are outdated, slow, or simply not intuitive to use.
      </p>

      <p>
        <strong>What if... it didn't have to be like that?</strong> If you are anything like us, you'd feel like these pain points take away from the gains you get from using a Git client. That's why we created Commit Rocket - a next-generation Git client that puts user experience first. With Commit Rocket, you'll never have to sacrifice functionality for ease of use. Join us as we aim to revolutionize the world of Git clients.
      </p>

      <p>
        Jump ahead:
      </p>
    </A.Container>

    <A.TOC excludeIds={["thank-you-for-reading"]} />

    <A.H2>
      What is Commit Rocket?
    </A.H2>

    <p>
      Commit Rocket is a new, modern Git client that is currently in development. We aim to provide a refreshing and innovative approach to Git clients by addressing the outdated looks and slow technologies many of the current options choose. Our main focus is on creating a modern design, fast performance, and an intuitive user experience while retaining all the features you love about other Git clients, like the commit history graph, stashing and more. With Commit Rocket, we are bringing new life to Git clients by bringing never before seen features to Git clients, but more about that later.
    </p>

    <p>
      Once Commit Rocket is far enough into development, it will be open-sourced, meaning that everyone will have access to our code, and anyone can contribute to make it the best it can be. During development we will attempt to actively involve the community in the process with surveys, development insight videos and newsletters.
    </p>

    <A.H3>
      Why Another Git Client?
    </A.H3>

    <p>
      Before going into what we have to offer, lets have a look at why we are making a new Git client, and more importantly, why it is even nessesairy!
    </p>

    <A.H4>
      Outdated Looks
    </A.H4>

    <p>
      A lot of the clients that you can find today on <A.Link color="primary" href="https://git-scm.com/downloads/guis" external>Git's official Git client list</A.Link> have outdated visuals. Not all Git clients have outdated visuals, take <A.Link href="https://www.gitkraken.com/" nofollow external>GitKraken</A.Link>, <A.Link href="https://gitnuro.jetpackduba.com/" nofollow external>Gitnuro</A.Link> and <A.Link href="https://gitviewer.com/" nofollow external>GitViewer</A.Link>, these clients set a good example for modern visuals. Visual appeal and user experience may not persé go hand in hand, but it can be argued that outdated visuals can put people off from using the client and having an overall enjoyable experience. This is especially important when you have a client with a lot of functionality like <A.Link href="https://www.sourcetreeapp.com/" nofollow external>SourceTree</A.Link>.
    </p>

    <A.Img
      className="mx-auto"
      alt="SourceTree and Git Extensions"
      src={oldLookingClients.src}
      width={oldLookingClients.width}
      height={oldLookingClients.height}
    />

    <p>
      We recognize the fact that form should not follow function, but that it should be paired with function. That is why we will be spending a significant amount of our resources to making a good looking user interface that is beginner friendly, and also provides the best user experience we can muster.
    </p>

    <A.H4>
      Missing Features
    </A.H4>

    <p>
      Ofcourse not everything is about looks, so lets talk about functionality and features! We also understand that missing features can be a deal-breaker for many developers. That's why we've compiled a list of common features that we felt were missing from even the most popular Git clients on the market.
    </p>

    <A.Ls>
      {[
        {
          feature: "Commit History Graph",
          clients: [clients.ghDesktop]
        },
        {
          feature: "Pull Requests",
          clients: [clients.sourceTree]
        },
        {
          feature: "Repository Management",
          clients: [clients.gitKraken, clients.ghDesktop, clients.gitKraken]
        },
        {
          feature: "Multi-account Support",
          clients: [clients.ghDesktop]
        },
        {
          feature: "Merge Conflict Tool",
          clients: [clients.ghDesktop]
        },
        {
          feature: "Git Actions",
          clients: [clients.ghDesktop, clients.sourceTree]
        },
        {
          feature: "Git Submodules",
          clients: [clients.ghDesktop]
        },
        {
          feature: "Git Hooks",
          clients: [clients.ghDesktop, clients.sourceTree]
        }
      ].map(({ feature, clients }, i) => (
        <A.Li key={i}>
          <strong className="font-semibold">{feature}</strong>
          <div className="pl-2 select-none text-xs font-semibold flex">
            (<ul className="flex gap-3">
              {clients.map(({ name, link }, j) => (
                <li key={j}>
                  <A.Link href={link} nofollow external>
                    {name}
                  </A.Link>
                </li>
              ))}
            </ul>)
          </div>
        </A.Li>
      ))}
    </A.Ls>

    <p>
      We recognize that some of our competitors, like Github Desktop, are designed to be lightweight, but we believe that even a lightweight client can offer powerful functionality, which is why we will eventually be including all of these features in Commit Rocket.
    </p>

    <A.H4>
      No Customizability
    </A.H4>

    <p>
      Another feature we feel is severly lacking in most clients is the customizability. Not only in theme but also in layout. Not everyone likes the same layout, which is only reasonable. Most Git GUI Clients only offer a limited amount of customizability, which usually is a few preset themes. <A.Link href="https://www.gitkraken.com/" nofollow external>GitKraken</A.Link> and <A.Link href="https://gitnuro.jetpackduba.com/" nofollow external>Gitnuro</A.Link>, do actually offer full theme customizability, but no customizability in layout.
    </p>
    <p>
      We believe that customizable layouts can increase productivity. In a basic sense creating your own layout should help, because you know where everything is and you can remove features you don't need to have at that certain moment in time, decreasing your mental overhead.
    </p>

    <A.H4>
      Slow Speeds
    </A.H4>

    <p>
      A <strong className="font-semibold">lot</strong> of Git Clients make use of <A.Link href="https://www.electronjs.org/" nofollow external>Electron</A.Link>, which is a big reason why these clients are slow. Electron itself is used in a lot of other products, like Gitkraken, Github Desktop, VSCode, Dicord and more. Electron allows developers to use web technologies on desktop, however this comes at the cost of having high memory usage and slow performance. On top of that, clients like GitKraken use Nodegit which exposes a wrapped Git API to JavaScript, which takes away additional performance. Github Desktop takes a different approach, they use the CLI and parse the output text.
    </p>
    <p>
      Both of these approaches are not great for performance, which is why we suggest an alternative. This alternative comes in the form of <A.Link href="https://tauri.app/" external>Tauri</A.Link>. Just like Electron, Tauri allows developers to user JavaScript, HTML and CSS for their presentation layer. Unlike Electron however it allows for business logic to be written in Rust. Rust its speed is incredably fast, which is why it is ideal for writing the (performance critical) logic. The presentation layer can invoke a function in Rust to get the nessesairy data. Essentially what we can do is write an easy to develop presentation layer, while having an incredably fast logic layer without sacrificing any performance.
    </p>
    <p>
      Our alternative to using <A.Link href="https://www.nodegit.org/" nofollow external>Nodegit</A.Link> or invoking the CLI and parsing the results is using <A.Link href="https://libgit2.org/" external>Libgit2</A.Link>. Nodegit is a JavaScript binding of Libgit2, however we will be using a <A.Link href="https://github.com/rust-lang/git2-rs" external>Rust binding of Libgit2</A.Link>, which will be a lot faster. This is because invoking C code from Rust is faster compared to invoking it from JavaScript, in addition to that, Rust is already faster then JavaScript; so this will result in a massive speed increase.
    </p>

    <A.Container className="gap-2">
      <p role="note" aria-label="Note" className="mx-auto font-semibold">
        Tauri VS Electron (empty app)
      </p>
      <A.Img
        className="mx-auto max-h-[27rem] w-fit"
        alt="Electron vs Tauri memory and build size"
        src={tauriVsElectron.src}
        width={tauriVsElectron.width}
        height={tauriVsElectron.height}
      />
      <p role="note" aria-label="Source" className="mx-auto text-sm">
        Source: <A.Link href="https://github.com/Elanis/web-to-desktop-framework-comparison" external>Web to Desktop framework comparison by Elanis</A.Link>
      </p>
    </A.Container>

    <A.H3>
      Our Inspiration
    </A.H3>

    We didn't think of the idea to make Commit Rocket on our own. Commit Rocket came to the forefront of our minds due to some cool products that inspired us. Our main inspirations were the Arc browser and Tauri, both of which are really unique and (to our belief) game changing products.

    <A.H4>
      <A.Link href="https://arc.net/" nofollow external>Arc</A.Link>
      <div className="text-sm">By: The Browser Company</div>
    </A.H4>

    <p>
      We love the way that Arc looks. It is very different compared to other browsers, not just in looks but also in functionality. Despite it being based on Chromium, it has some really cool new ideas, like notes, easels and spaces. If you haven't yet, We recommend checking out <A.Link href="https://www.youtube.com/@TheBrowserCompany" nofollow external>The Browser Company's youtube channel</A.Link> to see what Arc is about. For us personally we would like to do the same Arc is doing, changing Git clients in meaningfull ways. What that way is however, is to be determined.
    </p>

    <A.H4>
      <A.Link href="https://tauri.app/" nofollow external>Tauri</A.Link>
      <div className="text-sm">By: Tauri Studio</div>
    </A.H4>

    <p>
      As discussed in <A.Link href="#why-another-git-client" >"Why Another Git Client?"</A.Link> we will be using Tauri as our basis for making our desktop application. The promising speed increases over Electron were really attractive. It is written in Rust, which makes it ideal for consistent and speedy performance without taking up too much memory. All very good qualities to have for a Git client. Tauri will be the back bone of Commit Rocket, and we will be making full use of the features they have to offer.
    </p>

    <A.H2>
      Planned Features
    </A.H2>

    Our vision for Commit Rocket is feature packed and super customizable. Naturally we will include the normal Git functionality, but we will also be adding never before seen features, like plugin support and layout customizability. We will discuss all of our planned features at length in a future article, but for now we will briefly discuss our major planned features.

    <A.H3>
      Advanced Repository Management
    </A.H3>

    <A.Ls className="gap-8">
      <A.Li>
        <A.Container className="gap-4">
          <A.H4 className="text-xl md:text-xl">Pull/Merge Requests</A.H4>
          <p>
            The mainstream Git clients GitKraken and Github Desktop both have quick ways to view your pull requests. Github Desktop only allows you to view Github pull requests, but it has the feature nonetheless. We plan to implement this as well, but for all major Git hosts (e.g. Gitlab, Github, Bitbucket).
          </p>
        </A.Container>
      </A.Li>
      <A.Li>
        <A.Container className="gap-4">
          <A.H4 className="text-xl md:text-xl">Git Actions</A.H4>
          <p>
            Just like pull requests, Git actions seem to be a platform specific implementation. We've only seen Gitkraken implement this feature, but we thing that this would be an amazing functionality to have out of the box.
          </p>
        </A.Container>
      </A.Li>
      <A.Li>
        <A.Container className="gap-4">
          <A.H4 className="text-xl md:text-xl">Repository Management</A.H4>
          <p>
            A feature we haven't seen any Git GUI client do so far is repository management. This means being able to change the settings of your repostiory from the comfort of your client. Having that would save a lot of time going back and forth to your repository in the browser.
          </p>
        </A.Container>
      </A.Li>
    </A.Ls>

    <A.H3>
      Theming & Layouts
    </A.H3>

    <p>
      Git clients have a pretty standard layout and theme. Usually some blue-ish darkmode combined with a layout that has your commit graph, staging area and diff-viewers. This layout will work fine for a lot of people, but what if you wanted something different? What if you wanted to prioritize Git actions for example? You simply can't.
    </p>

    <p>
      Our solution to this is a flexible module system, where panels can freely be dragged to where you want them to be. In addition, we will have full theming support, where you can change every color to whatever you want it to be. Lastly, although it is not set in stone yet, we would like to implement a theme and layout marketplace, which would allow you to share your favorite layouts with the community.
    </p>

    <A.H3>
      Plugins
    </A.H3>

    <p>
      Our last <em>(and favorite)</em> major feature we want to talk about... <strong className="font-semibold">plugins!</strong> We realized that plugins can be very powerful after seeing the ecosystem that apps like VSCode or Obsidian have built up. We would like to add an extensive plugin API for developers that would allow for the craziest things, like a Jira integration, Vim keybindings or motivational quote generator, you name it!
    </p>

    <A.H2>
      The Future!
    </A.H2>

    <p>
      If this article got you hyped over the development of Commit Rocket and the ideas that we have, then you might be curious as to what our timeline looks like.
    </p>

    <A.H3>
      Roadmap & Support
    </A.H3>

    <p>
      Well, first of all, you can find <A.Link href="/#roadmap">our roadmap</A.Link> on the frontpage of our website. As always, this roadmap is subject to change. Second, if you are really excited, make sure to <A.Link href="/#sign-up">sign-up to our newsletter</A.Link> and <A.Link href="/contribute#feedback">send us your ideas</A.Link>.
    </p>

    <A.H3>
      Monitization
    </A.H3>

    <p>
      At last, you might want to know what our plans are for monitization. Even though we haven't thought of a definitive strategy yet, we will likely be making use of a donation based model, somewhat similar to Signal. We could also possibly do something with sponsors, like what <A.Link href="https://github.com/withastro/.github/blob/main/FUNDING.md" nofollow external>Astro</A.Link> is doing. Again it is a bit too early to be giving promises, but since we want this product to be accessible to everyone, we have no motivation to make use of a subscription model, that is for sure.
    </p>

    <A.H2>
      Thank You for Reading!
    </A.H2>

    <p>
      We really want to make Commit Rocket as awesome as possible. We hope all of you will stick around to see how this will turn out!
    </p>
  </>
};