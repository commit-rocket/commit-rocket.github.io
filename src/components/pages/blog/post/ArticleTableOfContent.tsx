import React, { ReactNode } from "react";
import PlayIcon from "@heroicons/react/24/solid/PlayIcon";

import Link from "@/components/controls/Link";
import { Heading, useArticle } from "./ArticleContext";



export interface TableOfContentProps {
  /** 
   * Decides the minimum level a heading should have to appear in the table of contents
   * @default 2 
   */
  minLevel?: number;

  /** 
   * Decides the maximum level a heading should have to appear in the table of contents
   * @default 3
   */
  maxLevel?: number;

  /**
   * The heading ids that should be ignored while rendering the list
   * @default ["table-of-content"]
   */
  excludeIds?: string[];
}

interface HeadingHierarchy extends Heading {
  children: HeadingHierarchy[];
}

const insertHeadingInHierarchy = (hierarchy: HeadingHierarchy, heading: Heading) => {
  const { level, children } = hierarchy;

  if (level + 1 === heading.level) {
    return children.push({ ...heading, children: [] });
  }

  const lastChild = hierarchy.children.at(-1);
  if (!lastChild) return;
  insertHeadingInHierarchy(lastChild, heading);
};

interface RenderHierarchyConfig {
  minLevel: number;
  maxLevel: number;
  excludeIds: string[];
  basePath: string;
}

const renderHierarchy = (hierarchy: HeadingHierarchy, config: RenderHierarchyConfig, index?: number) => {
  if (hierarchy.level < config.minLevel || hierarchy.level > config.maxLevel || config.excludeIds.includes(hierarchy.id)) return null;

  const url = new URL(config.basePath, "http://example.com");
  url.hash = hierarchy.id;

  return <li key={`${hierarchy.level}-${index}`}>
    <span className="flex items-center gap-2">
      <PlayIcon
        width=".6em"
        height=".6em"
        className="text-primary"
      />
      <Link
        color="primary"
        href={url.toString().replace("http://example.com", "")}
        underline
      >
        {hierarchy.text}
      </Link>
    </span>
    {hierarchy.children.length > 0 && <ul className="ml-8">
      {hierarchy.children.map((child, i) => renderHierarchy(child, config, i))}
    </ul>}
  </li>;
};

const ArticleTableOfContent = ({ minLevel = 2, maxLevel = 3, excludeIds = ["table-of-content"] }: TableOfContentProps) => {

  const article = useArticle();

  const topHierarchy = { id: "", level: 1, text: "", children: [] };

  if (article.ready) {
    article.headings.reduce<HeadingHierarchy>((hierarchy, heading) => {
      insertHeadingInHierarchy(hierarchy, heading);
      return hierarchy;
    }, topHierarchy);
  }

  return (
    <ul>
      {article.ready && topHierarchy.children.map((child, i) => renderHierarchy(child, {
        basePath: article.path,
        excludeIds,
        minLevel,
        maxLevel
      }, i))}
    </ul>
  );
};

export default ArticleTableOfContent;