import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import BookIcon from "@heroicons/react/24/outline/BookOpenIcon";
import CalendarIcon from "@heroicons/react/24/solid/CalendarIcon";

import { Page } from "@/types/page";
import useSSGSafe from "@/hooks/useSSGSafe";
import IArticle from "@/assets/state/articles/article";

import { reactNodeToString } from "@/utils/react";
import { calculateReadtime, readtimeFormatter } from "@/utils/readtime";

import Heading from "@/components/layout/heading";
import Link from "@/components/navigation/Link";
import KeywordsMeta from "@/components/head/KeywordsMeta";
import OgMeta from "@/components/head/OgMeta";
import OgArticleMeta from "@/components/head/OgArticleMeta";
import OgImageMeta from "@/components/head/OgImageMeta";


type ComputedArticle = {
  path: string;
  content: string;
  readtime: number;
  updated: string | null;
  created: string;
} & Omit<IArticle, "content" | "created" | "updated">;

interface BlogPostPageProps {
  article: ComputedArticle;
}

const DotSeparator = <div className="hidden w-1 h-1 rounded-full bg-neutral-600 md:block" />;

const BlogPostPage: Page<BlogPostPageProps> = ({ article: { author, tags, thumbnail, thumbnailAlt, vertical, ...article }, pathname }) => {
  const safeToRender = useSSGSafe();

  const AuthorTag = author.links.length > 0 ? Link : "div";

  return (
    <>
      <Head>
        <OgMeta
          title={`${article.title} - Commit Rocket`}
          type="article"
          path={pathname}
          description={article.teaser}
          image={thumbnail.src}
          locale="en_US"
        />
        <OgImageMeta
          path={thumbnail.src}
          type={`image/${thumbnail.src.split(".").at(-1)!}`}
          width={thumbnail.width}
          height={thumbnail.height}
          alt={thumbnailAlt}
        />
        <OgArticleMeta
          author={{
            userName: author.fullName,
            firstName: author.firstName,
            lastName: author.lastName,
            gender: author.gender
          }}
          publishedTime={new Date(article.created)}
          modifiedTime={article.updated ? new Date(article.updated) : undefined}
          section={vertical}
          tag={tags}
        />
        <KeywordsMeta tags={tags} />
      </Head>
      <article aria-describedby="article-title">
        <Heading.H1 id="article-title" className="text-4xl font-semibold">
          {article.title}
        </Heading.H1>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <AuthorTag
            className="flex items-center gap-2 group/author"
            //@ts-ignore
            href={author.links.length > 0 ? author.links[0].href : undefined}
            //@ts-ignore
            color={author.links.length > 0 ? "fill-contrast" : undefined}
            data-is-link={author.links.length > 0}
          >
            <div className="overflow-hidden rounded-full">
              <img
                className="object-contain w-8 h-8 rounded-full aspect-square group-hover/author:scale-110 motion-safe:transition-all"
                src={author.image.src}
                width={author.image.width}
                height={author.image.height}
                alt="A picture of the author"
              />
            </div>
            <div className="flex flex-col">
              <div>{author.fullName}</div>
              <div className="text-sm">{author.title}</div>
            </div>
          </AuthorTag>
          {DotSeparator}
          <div className="flex items-center gap-4 text-sm">
            {safeToRender && <div className="flex items-center gap-2">
              <BookIcon className="w-4 h-4" />
              <time
                aria-label="reading time"
                dateTime={`${article.readtime} minutes`}
              >
                {readtimeFormatter.format(article.readtime)}
              </time>
            </div>}
            {DotSeparator}
            {safeToRender && <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <time aria-label="Date created" dateTime={article.created} className={`${article.updated ? "hidden" : ""}`}>
                {(new Date(article.created)).toLocaleDateString()}
              </time>
              {article.updated && <time aria-label="Date updated" dateTime={article.updated}>
                {(new Date(article.updated)).toLocaleDateString()}
              </time>}
            </div>}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{
          __html: article.content
        }} />
      </article>
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

  const { content, updated, created, ...article } = foundArticle;

  return {
    props: {
      article: {
        ...article,
        path: `/blog/${postId}/${article.slug}`,
        content: reactNodeToString(content),
        readtime: await calculateReadtime(content),
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