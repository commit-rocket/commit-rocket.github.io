import IArticle from "@/assets/state/articles/article";
import { createContext, useContext } from "react";

export const ArticleContext = createContext<ArticleContext>({ ready: false });

export type ArticleContext = ({
  ready: true;
  headings: {
    text: string;
    level: number;
    id: string;
  }[];
  path: string;
} & IArticle) | {
  ready: false;
};

export const useArticle = () => useContext(ArticleContext);
