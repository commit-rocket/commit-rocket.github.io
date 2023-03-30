import { ReactNode } from "react";
import { reactNodeToString } from "./react";
import { isSSR } from "./ssr";

const stripHtml = async (text: string) => {
  if (isSSR) {
    const { stripHtml: strip } = await import("string-strip-html");
    return strip(text).result;
  }

  const element = document.createElement("div");
  element.innerHTML = text;
  return element.textContent ?? element.innerText ?? "";
};

/**
* Calculates the reading time of a ReactNode in minutes
*/
export const calculateReadtime = async (node: ReactNode, wpm: number = 200): Promise<number> => {
  const content = await stripHtml(reactNodeToString(node));
  const words = content.split(/[\s]+/);
  return Math.round(words.length / wpm);
};

/** Formats internationalized formatting for the readtime */
export const readtimeFormatter = Intl.NumberFormat(undefined, {
  style: "unit",
  unit: "minute"
});