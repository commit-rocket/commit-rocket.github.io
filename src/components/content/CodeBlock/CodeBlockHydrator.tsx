import { isSSR } from "@/utils/ssr";
import React, { useEffect } from "react";

interface CopyClickState {
  clearIconTimeout?: () => unknown;
}

const hydrate = () => {
  const ssrCodeBlocks = document.querySelectorAll("pre:not([data-hydrated=\"true\"])[data-ssr-rendered=\"true\"][data-is-codeblock=\"true\"]");

  ssrCodeBlocks.forEach((codeBlock) => {
    const copyButton = codeBlock.querySelector(":scope > button#copy");
    if (!copyButton) return;

    const clickState: CopyClickState = {};
    const codeLines = codeBlock.querySelectorAll(":scope code td.cd");
    const content = Array.from(codeLines).map((el) => el.textContent).join("\n");

    copyButton.addEventListener("click", async () => {
      const copyTask = navigator.clipboard.writeText(content);

      const clipIcon = copyButton.querySelector(":scope > #clip-icon");
      const checkIcon = copyButton.querySelector(":scope > #check-icon");

      if (clipIcon && checkIcon) {
        clipIcon.setAttribute("data-clicked", "true");
        checkIcon.setAttribute("data-clicked", "true");

        clickState.clearIconTimeout?.();

        const timeout = setTimeout(() => {
          if (!clipIcon || !checkIcon) return;
          clipIcon.setAttribute("data-clicked", "false");
          checkIcon.setAttribute("data-clicked", "false");
        }, 1500);

        clickState.clearIconTimeout = () => clearTimeout(timeout);
      }

      await copyTask;
    });
  });
};


const CodeBlockHydrator = ({ children }: React.PropsWithChildren) => {

  useEffect(() => {
    if (isSSR) return;

    hydrate();
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default CodeBlockHydrator;