import List from "@/components/content/List";
import Heading, { makeHeading } from "@/components/content/Heading";
import Link from "@/components/controls/Link";

import ArticleTableOfContent from "./ArticleTableOfContent";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import Code from "@/components/content/CodeBlock";
const A = {
  /** Wrapped `ol`/`ul` */
  Ls: List,
  /** Wrapped `li` */
  Li: List.Item,
  /** Table Of Content for the Article */
  TOC: ArticleTableOfContent,

  /** `A` tag wrapped with custom styling  */
  Link,

  /** 
   * A container `div` that inherits from the parent container. 
   * 
   * Usually used for containing related blocks of texts to style them in a consisten way.
   */
  Container: ({ className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const computedClassName = useMemo(
      () => twMerge("flex flex-col gap-8", className),
      [className]
    );

    return <div className={computedClassName}  {...props} />;
  },

  Img: ({ className, loading = "lazy", ...props }: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
    const computedClassName = useMemo(
      () => twMerge("rounded-lg", className),
      [className]
    );

    return <img {...props} className={computedClassName} loading={loading} />;
  },

  Code: ((props) => <Code {...props} allowSSR={true} />) as typeof Code,

  H2: makeHeading(2, "text-4xl font-bold"),
  H3: makeHeading(3, "text-3xl font-bold"),
  H4: makeHeading(4, "text-2xl font-semibold"),
  H5: makeHeading(5, "text-xl font-semibold"),
  H6: makeHeading(6, "text-lg font-semibold"),
};

export default A;