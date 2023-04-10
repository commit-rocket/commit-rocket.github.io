import IArticle from "@/assets/state/articles/article";
import { createContext, useContext } from "react";

export const ArticleContext = createContext<ArticleContext>({ ready: false });

export interface Heading {
  text: string;
  level: number;
  id: string;
}

export type ArticleContext = ({
  ready: true;
  headings: Heading[];
  path: string;
} & IArticle) | {
  ready: false;
};

export const useArticle = () => useContext(ArticleContext);
