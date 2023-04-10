import List from "@/components/content/List";
import Heading from "@/components/layout/Heading";
import Link from "@/components/navigation/Link";

import ArticleTableOfContent from "./ArticleTableOfContent";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
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

  ...Heading,
};

export default A;