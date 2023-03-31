import { OgProfile, makeProfileOgMeta } from "./profile";
import toOpenGraph from "./toOpenGraph";

export interface OgArticle {
  publishedTime: Date;
  modifiedTime?: Date;
  expirationTime?: Date;
  section?: string;
  tag?: string | string[];
  author?: OgProfile | OgProfile[];
}

export const makeArticleOgMeta = ({ author, ...props }: OgArticle) => {

  const computedAuthors = !author ? [] : Array.isArray(author) ? author : [author];

  return [
    toOpenGraph({ props, prefix: "article" }),
    computedAuthors.map((author, i) => makeProfileOgMeta({ ...author, index: i }))
  ].flat();
};