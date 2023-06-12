import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import { Page } from "@/types/page";
import IArticle from "@/assets/state/articles/article";

import makeSitemapMeta from "@/lib/meta/sitemap";
import { makeArticleOgMeta, makeOgMeta } from "@/lib/meta/opengraph";
import { calculateReadtime } from "@/utils/readtime";

import Heading from "@/components/content/Heading";
import KeywordsMeta from "@/components/head/KeywordsMeta";
import LinkButton from "@/components/controls/LinkButton";
import makeTagUrl from "@/components/pages/blog/utils/makeTagUrl";
import ArticleMeta from "@/components/pages/blog/post/ArticleMeta";

import { makeStaticContent } from "@/components/pages/blog/utils/makeStaticContent";
import CodeBlockHydrator from "@/components/content/CodeBlock/CodeBlockHydrator";

type ComputedArticle = {
  path: string;
  filename: string;
  content: string;
  readtime: number;
  updated: string | null;
  created: string;
} & Omit<IArticle, "content" | "created" | "updated">;

interface BlogPostPageProps {
  article: ComputedArticle;
}

const BlogPostPage: Page<BlogPostPageProps> = ({ article: { author, tags, thumbnail, thumbnailAlt, vertical, ...article }, pathname }) => {

  return (
    <>
      <Head>
        {makeOgMeta({
          title: article.title,
          type: "article",
          pathname,
          description: article.teaser,
          image: thumbnail,
          imageAlt: thumbnailAlt
        })}
        {makeArticleOgMeta({
          author: {
            userName: author.fullName,
            firstName: author.firstName,
            lastName: author.lastName,
            gender: author.gender
          },
          publishedTime: new Date(article.created),
          modifiedTime: article.updated ? new Date(article.updated) : undefined,
          section: vertical,
          tag: tags.map((t) => t.name),
        })}
        {makeSitemapMeta({
          lastMod: new Date(article.updated ? article.updated : article.created),
        })}
        <KeywordsMeta tags={[
          "Blog",
          "Post",
          "Article",
          ...tags.map((t) => t.name)
        ]} />
      </Head>
      <main className="w-full max-w-4xl">
        <article aria-describedby="article-title" className="flex flex-col gap-8 w-full items-center">
          <section aria-label="Main article content" className="flex flex-col gap-8 w-full items-center">
            <img
              aria-label="Article Thumbnail"
              className="rounded-2xl"
              loading="eager"
              src={thumbnail.src}
              width={thumbnail.width}
              height={thumbnail.height}
              alt={thumbnailAlt}
            />
            <Heading.H1 id="article-title" className="text-center">
              {article.title}
            </Heading.H1>
            <ArticleMeta
              author={author}
              readtime={article.readtime}
              created={article.created}
              updated={article.updated}
            />
            <CodeBlockHydrator>
              <div
                id="article-content"
                className="flex flex-col text-lg text-start w-full gap-8"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CodeBlockHydrator>
          </section>
          <section aria-labelledby="article-tags" className="w-full pt-16 border-t border-cr-primary mt-8">
            <h2 id="article-tags" className="text-xs font-bold mb-2">Tags:</h2>
            <ul aria-labelledby="article-tags" className="flex flex-wrap gap-1">
              {tags.map(({ name, hidden }, i) => (
                !hidden && <li key={i}>
                  <LinkButton
                    color="primary"
                    href={makeTagUrl(name)}
                    className="w-fit text-sm px-2 py-1"
                  >
                    #{name}
                  </LinkButton>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPostPageProps, { pid: string, slug: string; }> = async ({ params }) => {
  const { default: articles } = await import("@/assets/state/articles");

  if (!params || !params.pid) return {
    notFound: true
  };

  const postId = Number(params.pid);
  const articleInfo = articles.find((_, i) => i + 1 === postId);

  if (!articleInfo) return {
    notFound: true
  };

  const { article: foundArticle, filename: articleFilename } = articleInfo;

  const { content, updated, created, ...article } = foundArticle;

  return {
    props: {
      article: {
        ...article,
        filename: articleFilename,
        path: `/blog/${postId}/${article.slug}`,
        content: await makeStaticContent(foundArticle, postId),
        readtime: await calculateReadtime(content),
        created: created.toUTCString(),
        updated: updated ? updated.toUTCString() : null
      }
    },
    revalidate: false
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { default: articles } = await import("@/assets/state/articles");

  return {
    paths: articles.map(({ article }, i) => {
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