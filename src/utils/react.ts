import { isValidElement, ReactFragment, Fragment, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export const isFragment = (node: ReactNode): node is ReactFragment => {
  if (!node || typeof node !== "object" || !("type" in node)) return false;
  return node.type === Fragment;
};

export const reactNodeToString = (node: ReactNode): string => {
  if ((isValidElement(node)) && typeof node !== "string") {
    return renderToStaticMarkup(node);
  }

  if (isFragment(node)) {
    let stringContent = "";
    for (const childNode of node) {
      stringContent += " " + reactNodeToString(childNode);
    }
    return stringContent;
  };

  return String(node ?? "");
};
