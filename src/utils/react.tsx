import { ReactFragment, Fragment, ReactNode, LegacyRef, MutableRefObject, RefCallback } from "react";

export const isFragment = (node: ReactNode): node is ReactFragment => {
  if (!node || typeof node !== "object" || !("type" in node)) return false;
  return node.type === Fragment;
};

export const reactNodeToString = async (node: ReactNode): Promise<string> => {
  const { renderToString } = await import("react-dom/server");
  return renderToString(<>{node}</>);
};

export const mergeRefs = <T = any>(...refs: Array<MutableRefObject<T> | LegacyRef<T> | undefined>): RefCallback<T> => (value) => {
  refs.forEach((ref) => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(value);
    } else if (ref != null) {
      (ref as React.MutableRefObject<T | null>).current = value;
    }
  });
};