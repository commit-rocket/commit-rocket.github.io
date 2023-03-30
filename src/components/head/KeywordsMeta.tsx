export interface KeywordTagsProps {
  tags: readonly string[];
}

const KeywordsMeta = ({ tags }: KeywordTagsProps) => (
  <meta
    name="keywords"
    content={tags.map((tag) => tag.replace(",", "")).join(", ")}
  />
);

export default KeywordsMeta;