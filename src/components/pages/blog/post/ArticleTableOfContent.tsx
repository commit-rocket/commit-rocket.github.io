import Link from "@/components/navigation/Link";
import { useArticle } from "./ArticleContext";

export interface TableOfContentProps {
  /** 
   * Decides the minimum level a heading should have to appear in the table of contents
   * @default 2 
   */
  minLevel?: number;

  /** 
   * Decides the maximum level a heading should have to appear in the table of contents
   * @default 4
   */
  maxLevel?: number;
}

const ArticleTableOfContent = ({ minLevel = 2, maxLevel = 4 }: TableOfContentProps) => {

  const article = useArticle();


  return (
    <ul>
      {article.ready && article.headings.map((heading, i) => {
        if (heading.level < minLevel || heading.level > maxLevel) return null;

        const url = new URL(article.path, "http://example.com");
        url.hash = heading.id;

        return <li key={i}>
          <Link color="primary" href={url.toString().replace("http://example.com", "")} underline>
            {heading.text}
          </Link>
        </li>;
      })}
    </ul>
  );
};

export default ArticleTableOfContent;