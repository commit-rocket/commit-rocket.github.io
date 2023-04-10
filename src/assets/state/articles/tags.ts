export interface ITag {
  name: string,
  hidden?: boolean;
}

export default {
  "news": {
    name: "News",
  },
  "commitRocket": {
    name: "Commit Rocket"
  },
  "git": {
    name: "Git"
  },
  "intro": {
    name: "Introduction"
  },
  
} satisfies Record<string, ITag>;