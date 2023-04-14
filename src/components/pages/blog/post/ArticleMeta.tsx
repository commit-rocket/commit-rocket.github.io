import React from "react";
import BookIcon from "@heroicons/react/24/outline/BookOpenIcon";
import CalendarIcon from "@heroicons/react/24/solid/CalendarIcon";

import { IMember } from "@/assets/state/team";

import useSSGSafe from "@/hooks/useSSGSafe";

import Link from "@/components/controls/Link";
import { readtimeFormatter } from "@/utils/readtime";

export interface ArticleMetaProps {
  author: IMember;
  readtime: number;
  created: string;
  updated?: string | null;
}

const DotSeparator = <div className="hidden w-1 h-1 rounded-full bg-neutral-600 md:block" />;

const ArticleMeta = ({ author, readtime, created, updated }: ArticleMetaProps) => {
  const safeToRender = useSSGSafe();
  const AuthorTag = author.links.length > 0 ? Link : "div";

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <AuthorTag
        className="flex items-center gap-2 group/writer"
        //@ts-ignore
        href={author.links.length > 0 ? author.links[0].href : undefined}
        //@ts-ignore
        color={author.links.length > 0 ? "fill-contrast" : undefined}
        data-is-link={author.links.length > 0}
      >
        <div className="overflow-hidden rounded-full">
          <img
            aria-hidden
            className="object-contain w-8 h-8 rounded-full aspect-square group-hover/writer:scale-110 motion-safe:transition-all"
            src={author.image.src}
            width={author.image.width}
            height={author.image.height}
            alt="A picture of the author"
          />
        </div>
        <div className="flex flex-col">
          <p aria-label="article-author" itemProp="author">{author.fullName}</p>
          <p className="text-sm" aria-hidden>{author.title}</p>
        </div>
      </AuthorTag>
      {DotSeparator}
      <div className="flex items-center gap-4 text-sm">
        {safeToRender && <div className="flex items-center gap-2">
          <BookIcon
            className="w-4 h-4"
            width="1em"
            height="1em"
          />
          <time
            aria-label="reading time"
            dateTime={`${readtime} minutes`}
          >
            {readtimeFormatter.format(readtime)}
          </time>
        </div>}
        {DotSeparator}
        {safeToRender && <div className="flex items-center gap-2">
          <CalendarIcon
            className="w-4 h-4"
            width="1em"
            height="1em"
          />
          <time aria-label="Date created" dateTime={created} className={`${updated ? "hidden" : ""}`}>
            {(new Date(created)).toLocaleDateString()}
          </time>
          {updated && <time aria-label="Date updated" dateTime={updated}>
            {(new Date(updated)).toLocaleDateString()}
          </time>}
        </div>}
      </div>
    </div>
  );
};

export default ArticleMeta;