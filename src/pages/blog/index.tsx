import { useMemo } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import TagIcon from "@heroicons/react/24/solid/TagIcon";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Page } from "@/types/page";

import ArticleBrief, { IArticleBrief } from "@/components/pages/blog/ArticleBrief";
import LinkButton from "@/components/controls/LinkButton";
import Input from "@/components/controls/Input";
import { ControlledSelect } from "@/components/controls/Select";

import { calculateReadtime } from "@/utils/readtime";
import fadeAnim from "@/animations/fade";
import Heading from "@/components/layout/Heading";
import { makeOgMeta } from "@/utils/meta/opengraph";
import Label from "@/components/controls/Label";
import { makeSitemapMeta } from "@/utils/meta/sitemap";
import KeywordsMeta from "@/components/head/KeywordsMeta";

interface BlogPageProps {
  articles: IArticleBrief[];
}

const SORT_OPTIONS = [
  {
    "direction": "new",
    "name": "Newest",
    "func": (a: IArticleBrief, b: IArticleBrief) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  },
  {
    "direction": "old",
    "name": "Oldest",
    "func": (a: IArticleBrief, b: IArticleBrief) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  }
] as const;

const filterSchema = z.object({
  search: z.string(),
  sort: z.object({
    direction: z.union([z.literal("new"), z.literal("old")]),
    name: z.string(),
    func: z.function(z.tuple([z.object({}), z.object({})]), z.number())
  })
});

const filterSchemaResolver = zodResolver(filterSchema);

type FilterSchema = z.infer<typeof filterSchema>;

const BlogPage: Page<BlogPageProps> = ({ articles, pathname }) => {
  const { query } = useRouter();

  const { register, control } = useForm<FilterSchema>({
    resolver: filterSchemaResolver,
    mode: "onChange",
    defaultValues: {
      search: "",
      sort: SORT_OPTIONS[0]
    }
  });

  const tags = useMemo(() => {
    if (!query.tag) return [];
    return Array.isArray(query.tag) ? query.tag : [query.tag];
  }, [query.tag]);

  const [search, sort] = useWatch({
    name: ["search", "sort"],
    control
  });

  const computedArticles = useMemo(() => (
    articles
      .filter((article) => (
        article.title.includes(search) &&
        tags.every((tag) => article.tags.includes(tag))
      ))
      .sort(sort.func)
  ), [tags, search, sort, articles]);

  return (
    <>
      <Head>
        {makeOgMeta({ title: "Blog", pathname })}
        {makeSitemapMeta({ changeFreq: "weekly", priority: 0.8 })}
        <KeywordsMeta tags={[
          "Blog"
        ]} />
      </Head>
      <main aria-labelledby="blog" className="flex flex-col flex-1 w-full gap-8 max-w-7xl">
        <Heading.H1 id="blog" className="text-center text-secondary">
          Blog
        </Heading.H1>
        {computedArticles.length > 0 && <>
          <div className="mx-0 sm:mx-16 md:mx-0 motion-safe:transition-[margin-inline] motion-safe:duration-500 flex gap-2 items-end">
            <div>
              <Label htmlFor="search-input" className="text-secondary">
                Search:
              </Label>
              <Input
                id="search-input"
                type="text"
                color="secondary"
                placeholder="Search..."
                {...register("search")}
              />
            </div>
            <div>
              <Label htmlFor="sort-input" className="text-secondary">
                Sort:
              </Label>
              <ControlledSelect
                id="sort-input"
                name="sort"
                color="secondary"
                control={control}
                options={SORT_OPTIONS}
                getDisplayName={(opt) => opt.name}
              />
            </div>

            <AnimatePresence>
              {tags.length > 0 && <motion.div
                variants={fadeAnim}
                initial="in"
                animate="anim"
                exit="exit"
              >
                <LinkButton
                  href="/blog"
                  color="secondary"
                  className="w-fit"
                >
                  Clear Tags
                  <TagIcon
                    className="w-4 h-4"
                    width="1em"
                    height="1em"
                  />
                </LinkButton>
              </motion.div>}
            </AnimatePresence>
          </div>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="blog articles">
            <AnimatePresence>
              {computedArticles.map((brief) => <ArticleBrief key={brief.url} {...brief} />)}
            </AnimatePresence>
          </ul>
        </>}
        {computedArticles.length < 1 && <p role="note" className="text-3xl font-semibold text-center">
          There are no blog posts yet! Stay tuned!
        </p>}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const { default: articles } = await import("@/assets/state/articles");

  return {
    props: {
      articles: await Promise.all(articles.map<Promise<IArticleBrief>>(async ({ article }, i) => {
        const { content, created, updated, slug, ...brief } = { ...article };

        return {
          ...brief,
          url: `/blog/${i + 1}/${slug}`,
          date: (updated ?? created).toUTCString(),
          readtime: await calculateReadtime(content)
        };
      }))
    },
    revalidate: false
  };
};

export default BlogPage;