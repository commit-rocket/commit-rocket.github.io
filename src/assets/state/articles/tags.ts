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
  "tutorial": {
    name: "Tutorial"
  },
  "plans": {
    name: "Plans"
  }
} satisfies Record<string, ITag>;