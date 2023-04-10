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

/**
 * Creates a meta tag for the keywords
 * 
 * By default it adds:
 * - Git
 * - Commit Rocket
 * - Git Client
 * - Git Gui
 * - New Git Client
 * @param props KeywordTagsProps
 */
const KeywordsMeta = ({ tags = [] }: KeywordTagsProps) => (
  <meta
    key="meta:keywords"
    name="keywords"
    content={Array.from(new Set([...DEFAULT_TAGS, ...tags])).map((tag) => tag.replace(",", "")).join(", ")}
  />
);

export default KeywordsMeta;