import { GetStaticPaths, GetStaticProps } from "next";
import { Page } from "@/types/page";
import ArticleBrief, { IArticleBrief } from "@/components/pages/blog/ArticleBrief";
import { calculateReadtime } from "@/utils/readtime";
import IArticle from "@/assets/state/articles/article";
import { reactNodeToString } from "@/utils/react";
import Head from "next/head";

type ComputedArticle = {
  content: string;
  updated: string | null;
  created: string;
} & Omit<IArticle, "content" | "created" | "updated" | "teaser">;

interface BlogPostPageProps {
  article: ComputedArticle;
}

const BlogPostPage: Page<BlogPostPageProps> = ({ article }) => {

  return (
    <>
      <Head>
        <title>{article.title} - Commit Rocket</title>
      </Head>
      <h1 className="text-4xl font-semibold">{article.title}</h1>
      <div dangerouslySetInnerHTML={{
        __html: article.content
      }} />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPostPageProps, { pid: string, slug: string; }> = async ({ params }) => {
  const { default: articles } = await import("@/assets/state/articles");

  if (!params || !params.pid) return {
    notFound: true
  };

  const postId = Number(params.pid);
  const foundArticle = articles.find((_, i) => i + 1 === postId);
  if (!foundArticle) return {
    notFound: true
  };

  const { content, teaser, updated, created, ...article } = foundArticle;

  return {
    props: {
      article: {
        ...article,
        content: reactNodeToString(content),
        created: created.toUTCString(),
        updated: updated ? updated.toUTCString() : null
      }
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { default: articles } = await import("@/assets/state/articles");

  return {
    paths: articles.map((article, i) => {
      return {
        params: {
          pid: String(i + 1),
          slug: String(article.slug)
        }
      };
    }),
    fallback: false
  };
};

export default BlogPostPage;