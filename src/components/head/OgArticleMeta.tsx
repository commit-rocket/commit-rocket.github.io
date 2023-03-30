import React from "react";
import OgProfileMeta, { OgProfile } from "./OgProfileMeta";
import toOpenGraph from "./utils/toOpenGraph";

export interface OgArticle {
  publishedTime: Date;
  modifiedTime?: Date;
  expirationTime?: Date;
  section?: string;
  tag?: string | string[];
  author?: OgProfile | OgProfile[];
}

export interface OgArticleMetaProps extends OgArticle {
}

const OgArticleMeta = ({ author, ...props }: OgArticleMetaProps) => {

  const computedAuthors = !author ? [] : Array.isArray(author) ? author : [author];

  return (
    <>
      {toOpenGraph({ props, prefix: "article" })}
      {computedAuthors.map((author, i) => <OgProfileMeta key={i} {...author} />)}
    </>
  );
};

export default OgArticleMeta;