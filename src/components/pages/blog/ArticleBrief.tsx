import NextLink from "next/link";
import CalendarIcon from "@heroicons/react/24/solid/CalendarIcon";
import BookIcon from "@heroicons/react/24/outline/BookOpenIcon";
import { motion, Variants } from "framer-motion";

import LinkButton from "@/components/controls/LinkButton";
import Link from "@/components/navigation/Link";

import useSSGSafe from "@/hooks/useSSGSafe";

import IArticle from "@/assets/state/articles/article";
import makeTagUrl from "./utils/makeTagUrl";
import { readtimeFormatter } from "@/utils/readtime";

const listAnim = {
  in: {
    opacity: 0,
    scale: 0.5,
  },
  anim: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35
    }
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.35
    }
  }
} as Variants;

export type IArticleBrief = {
  url: string;
  date: string;
  readtime: number;
} & Omit<IArticle, "content" | "updated" | "created" | "slug">;

export interface ArticleBriefProps extends IArticleBrief {

}

const ArticleBrief = ({ title, thumbnail, thumbnailAlt, readtime, teaser, author, date, url, tags }: ArticleBriefProps) => {
  const safeToRender = useSSGSafe();

  const AuthorTag = author.links.length > 0 ? Link : "div";

  return (
    <motion.li
      className="origin-center flex flex-col flex-1 gap-4 mx-0 rounded-lg motion-safe:transition-[margin-inline] motion-safe:duration-500 sm:mx-16 md:mx-0 bg-primary-300"
      variants={listAnim}
      initial="in"
      animate="anim"
      exit="exit"
      layout
    >
      <NextLink href={url} className="group/link aspect-[16/7] rounded-lg overflow-hidden" >
        <img
          className="aspect-[16/7] object-contain rounded-lg transition-transform group-hover/link:scale-105"
          src={thumbnail.src}
          width={thumbnail.width}
          height={thumbnail.height}
          alt={thumbnailAlt}
        />
      </NextLink>
      <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
        {tags.length > 0 && <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <LinkButton
              key={i}
              href={makeTagUrl(tag)}
              color="secondary"
              className="px-2 py-1 text-xs font-semibold border"
              prefetch={false}
            >
              {tag}
            </LinkButton>
          ))}
        </div>}
        <Link href={url} color="fill-contrast" className="block text-2xl font-bold">
          {title}
        </Link>
        <Link href={url} color="fill-contrast" className="flex-1 ">
          {teaser}
        </Link>
        <div className="flex flex-col flex-wrap gap-4 pt-4 mt-auto">
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
          <Link href={url} color="fill-contrast" className="flex items-center gap-4 text-sm">
            {safeToRender && <div className="flex items-center gap-2">
              <BookIcon className="w-4 h-4" />
              {readtimeFormatter.format(readtime)}
            </div>}
            <div className="hidden w-1 h-1 rounded-full bg-neutral-600 md:block" />
            {safeToRender && <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {(new Date(date)).toLocaleDateString()}
            </div>}
          </Link>
        </div>
      </div>
    </motion.li>
  );
};

export default ArticleBrief;