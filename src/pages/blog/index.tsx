import { useMemo } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import TagIcon from "@heroicons/react/24/solid/TagIcon";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
import Heading from "@/components/content/Heading";
import { makeOgMeta } from "@/lib/meta/opengraph";
import Label from "@/components/controls/Label";
import makeSitemapMeta from "@/lib/meta/sitemap";
import KeywordsMeta from "@/components/head/KeywordsMeta";

interface BlogPageProps {
  articles: IArticleBrief[];
}

const SORT_OPTIONS = [
  {
    direction: 1,
    name: "Newest",
    func: (a: IArticleBrief, b: IArticleBrief) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  },
  {
    direction: 2,
    name: "Oldest",
    func: (a: IArticleBrief, b: IArticleBrief) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  }
] as const;

const filterSchema = z.object({
  search: z.string(),
  sort: z.object({
    direction: z.union([z.literal(1), z.literal(2)]),
    name: z.string(),
    func: z.function(z.tuple([z.object({}), z.object({})]), z.number())
  })
});

const NO_RESULTS_ANIM = {
  in: {
    opacity: 0
  },
  anim: {
    opacity: 1,
    transition: {
      duration: 0.25
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25
    }
  }
} as Variants;

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
        tags.every((tag) => article.tags.map((t) => t.name).includes(tag))
      ))
      .sort(sort.func)
  ), [tags, search, sort, articles]);

  return (
    <>
      <Head>
        {makeOgMeta({ title: "Blog", pathname })}
        {makeSitemapMeta({ changeFreq: "weekly", priority: 0.8 })}
        <KeywordsMeta tags={["Blog"]} />
      </Head>
      <main aria-labelledby="blog" className="flex flex-col flex-1 w-full gap-8 max-w-7xl">
        <Heading.H1 id="blog" className="text-center">
          Blog
        </Heading.H1>
        {articles.length > 0 && <>
          <div className="mx-0 sm:mx-16 md:mx-0 motion-safe:transition-[margin-inline] motion-safe:duration-500 flex gap-2 items-end">
            <div>
              <Label htmlFor="search-input" className="text-cr-primary">
                Search:
              </Label>
              <Input
                id="search-input"
                type="text"
                color="primary"
                placeholder="Search..."
                {...register("search")}
              />
            </div>
            <div>
              <Label htmlFor="sort-input" className="text-cr-primary">
                Sort:
              </Label>
              <ControlledSelect
                id="sort-input"
                name="sort"
                color="primary"
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
                  color="primary"
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
          <AnimatePresence>
            {computedArticles.length <= 0 && <motion.p
              role="note"
              className="w-full text-2xl font-semibold text-center"
              variants={NO_RESULTS_ANIM}
              initial="in"
              animate="anim"
              exit="exit"
            >
              There are no blog posts that fit this criteria
            </motion.p>}
          </AnimatePresence>
          <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="blog articles">
            <AnimatePresence>
              {computedArticles.map((brief, i) => <ArticleBrief key={brief.url} {...brief} imgLoading={i > 3 ? "lazy" : "eager"} />)}
            </AnimatePresence>
          </ul>
        </>}
        {articles.length <= 0 && <p role="note" className="text-2xl font-semibold text-center">
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
      articles: await Promise.all(articles.filter(({ article }) => !article.hidden).map<Promise<IArticleBrief>>(async ({ article }, i) => {
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