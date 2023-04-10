import { ReactNode } from "react";
import { isBrowser, isSSR } from "./ssr";

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
 * **ONLY USE ON THE SERVER**
 * 
 * Calculates the reading time of a ReactNode in minutes
 */
export const calculateReadtime = async (node: ReactNode, wpm: number = 160): Promise<number> => {
  if (isBrowser) throw Error("calculateReadtime can only be used on the server");
  const { reactNodeToString } = await import("./react");

  const content = await stripHtml(await reactNodeToString(node));
  const words = content.split(/[\s]+/);

  return Math.round(words.length / wpm);
};

/** Formats internationalized formatting for the readtime */
export const readtimeFormatter = Intl.NumberFormat(undefined, {
  style: "unit",
  unit: "minute"
});