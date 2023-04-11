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
} satisfies Record<string, ITag>;