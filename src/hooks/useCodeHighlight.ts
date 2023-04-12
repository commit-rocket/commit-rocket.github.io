import { useEffect, useMemo, useState } from "react";
import Prism from "prismjs";
import { isSSR } from "@/utils/ssr";

export type SupportedLanguages = "bash" | "js" | "html" | "css";

interface Options {
  lang: SupportedLanguages;
  code: string;
  markedLines?: (number | [number, number])[];
  allowSSR?: boolean;
}

export interface CodeLine {
  original: string;
  html: string;
}

const langToCategory = {
  bash: "bash",
  css: "css",
  js: "javascript",
  html: "markup"
} as Record<SupportedLanguages, string>;

const rangeToNumArray = (mark: number | [number, number]) => {
  if (typeof mark === "number") return mark;
  const [start, end] = mark;
  const length = end - start;

  return Array(length).fill(0).map((_, i) => start + i);
};

const useCodeHightlight = ({ lang, code, markedLines, allowSSR }: Options) => {

  const [isLanguageLoaded, setIsLanguageLoaded] = useState<boolean>(isSSR);

  useEffect(() => {
    setIsLanguageLoaded(isSSR);

    if (!isSSR) {
      const fetchState = { langChanged: false };
      import(`prismjs/components/prism-${langToCategory[lang]}`)
        .then(() => {
          if (!fetchState.langChanged) setIsLanguageLoaded(true);
        });

      return () => {
        fetchState.langChanged = true;
      };
    }

  }, [lang]);

  const codeLines = useMemo<CodeLine[]>(() => {
    let codeToRender = code;

    // Normalize whitespace
    const startingWhitespace = codeToRender.match(/^\s+/)?.[0]?.replace("\n", "");
    if (startingWhitespace) {
      const normalizeWhitespaceRegex = new RegExp(`(?<=\n)[^\S\n]{${startingWhitespace.length}}(?!\n)`, "g");
      codeToRender = codeToRender.replace(normalizeWhitespaceRegex, "");
    }

    codeToRender = codeToRender.trim();

    const originalLines = codeToRender.split("\n");


    if (!isLanguageLoaded || (!allowSSR && isSSR)) {
      return originalLines.map((line) => ({ html: line, original: line }));
    }

    if (isSSR) {
      require(`prismjs/components/prism-${langToCategory[lang]}`);
    }

    const renderedLines = Prism.highlight(codeToRender, Prism.languages[lang], lang).split("\n");

    const _codeLines: CodeLine[] = Array(renderedLines.length);

    for (let index = 0; index < renderedLines.length; index++) {
      _codeLines[index] = {
        html: renderedLines[index],
        original: originalLines[index]
      };
    }

    return _codeLines;
  }, [isLanguageLoaded, allowSSR, lang, code]);

  const computedMarkedLines = useMemo<number[]>(() => {
    if (!markedLines) return [];
    return markedLines.map(rangeToNumArray).flat();
  }, [markedLines]);

  return [codeLines, computedMarkedLines] as const;
};

export default useCodeHightlight;