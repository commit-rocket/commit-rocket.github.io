import NextLink from "next/link";
import CalendarIcon from "@heroicons/react/24/solid/CalendarIcon";
import BookIcon from "@heroicons/react/24/outline/BookOpenIcon";
import { motion, Variants } from "framer-motion";

import LinkButton from "@/components/controls/LinkButton";
import Link from "@/components/controls/Link";

import useSSGSafe from "@/hooks/useSSGSafe";

import IArticle from "@/assets/state/articles/article";
import makeTagUrl from "./utils/makeTagUrl";
import { readtimeFormatter } from "@/utils/readtime";

const LIST_ANIM = {
  in: {
    opacity: 0,
    scale: 0.5,
  },
  anim: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.25
    }
  }
} as Variants;

export type IArticleBrief = {
  url: string;
  date: string;
  readtime: number;
} & Omit<IArticle, "content" | "updated" | "created" | "slug">;

export interface ArticleBriefProps extends IArticleBrief {
  imgLoading?: "eager" | "lazy";
}

const ArticleBrief = ({ title, thumbnail, thumbnailAlt, imgLoading, readtime, teaser, author, date, url, tags }: ArticleBriefProps) => {
  const safeToRender = useSSGSafe();

  const AuthorTag = author.links.length > 0 ? Link : "div";

  return (
    <motion.li
      className="origin-center flex flex-col flex-1 gap-4 mx-0 rounded-2xl motion-safe:transition-[margin-inline] motion-safe:duration-500 sm:mx-16 md:mx-0 image-star border-2 border-cr-primary overflow-hidden"
      variants={LIST_ANIM}
      initial="in"
      animate="anim"
      exit="exit"
      layout
    >
      <NextLink href={url} className="group/link aspect-[16/7] overflow-hidden" >
        <img
          className="aspect-[16/7] object-contain transition-transform group-hover/link:scale-105"
          loading={imgLoading}
          src={thumbnail.src}
          width={thumbnail.width}
          height={thumbnail.height}
          alt={thumbnailAlt}
        />
      </NextLink>
      <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
        {tags.length > 0 && <ul className="flex flex-wrap gap-1">
          {tags.map(({ name, hidden }, i) => (
            !hidden && <li key={i}>
              <LinkButton
                href={makeTagUrl(name)}
                color="primary"
                className="px-2 py-1 text-xs font-semibold"
                prefetch={false}
              >
                {name}
              </LinkButton>
            </li>
          ))}
        </ul>}
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
              <BookIcon
                className="w-4 h-4"
                width="1em"
                height="1em"
              />
              {readtimeFormatter.format(readtime)}
            </div>}
            <div className="hidden w-1 h-1 rounded-full bg-neutral-600 md:block" />
            {safeToRender && <div className="flex items-center gap-2">
              <CalendarIcon
                className="w-4 h-4"
                width="1em"
                height="1em"
              />
              {(new Date(date)).toLocaleDateString()}
            </div>}
          </Link>
        </div>
      </div>
    </motion.li>
  );
};

export default ArticleBrief;