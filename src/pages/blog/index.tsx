import { GetStaticProps } from "next";
import { Page } from "@/types/page";
import ArticleBrief, { IArticleBrief } from "@/components/pages/blog/ArticleBrief";
import { calculateReadtime } from "@/utils/readtime";

interface BlogPageProps {
  articles: IArticleBrief[];
}

const BlogPage: Page<BlogPageProps> = ({ articles }) => {

  return (
    <>
      {articles.map((brief, i) => <ArticleBrief key={i} {...brief} />)}
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const { default: articles } = await import("@/assets/state/articles");

  return {
    props: {
      articles: await Promise.all(articles.map<Promise<IArticleBrief>>(async (article) => {
        const { content, created, updated, ...brief } = { ...article };

        return {
          ...brief,
          date: (updated ?? created).toUTCString(),
          readtime: await calculateReadtime(content)
        };
      }))
    }
  };
};

export default BlogPage;