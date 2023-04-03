export interface KeywordTagsProps {
  tags?: readonly string[];
}

const DEFAULT_TAGS = [
  "Git",
  "Commit Rocket",
  "Git Client",
  "Git Gui",
  "New Git Client"
] as const;

const KeywordsMeta = ({ tags = [] }: KeywordTagsProps) => (
  <meta
    key="meta:keywords"
    name="keywords"
    content={[...DEFAULT_TAGS, ...tags].map((tag) => tag.replace(",", "")).join(", ")}
  />
);

export default KeywordsMeta;