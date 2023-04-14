import React, { useCallback, useMemo, useRef } from "react";
import ClipboardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import { twMerge } from "tailwind-merge";
import dynamic from "next/dynamic";

import useCodeHightlight, { CodeLine, SupportedLanguages } from "@/hooks/useCodeHighlight";

export interface CodeBlockProps {
  /**
   * The language used in the codeblock
   */
  lang: SupportedLanguages;

  /**
   * The code
   */
  children: string;

  /**
   * To style the `pre` tag
   */
  className?: string;

  /**
   * Wether the code can be copied
   * @default true
   */
  canCopy?: boolean;

  /**
   * Wether to show the line numbers or not
   */
  showLines?: boolean;

  /** 
   * Highlights certain lines, this is based on the line numbers
   */
  markedLines?: (number | [number, number])[];

  /**
   * Is set to true it will render out the code fully on the server.
   */
  allowSSR?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ lang, children, className, markedLines, showLines, allowSSR, canCopy = true }) => {
  const [codeLines, linesToMark] = useCodeHightlight({
    lang,
    markedLines,
    allowSSR,
    code: children,
  });

  const renderedLines = useMemo(() => {
    const _renderedLines = Array(codeLines.length);
    let isPreviousMarked = false;
    let isMarked = linesToMark.includes(1);
    let isNextMarked = linesToMark.includes(2);

    for (const [i, line] of codeLines.entries()) {
      const lineNumber = i + 1;

      const markingStyle = `
        ${isMarked ? "line-highlight" : ""}
        ${!isPreviousMarked && isMarked ? "round-top" : ""}
        ${!isNextMarked && isMarked ? "round-bot" : ""}
      `.trim();


      _renderedLines[i] = (
        <tr key={i} suppressHydrationWarning className={`line ${markingStyle}`}>
          {showLines && <td suppressHydrationWarning className="nr"><span suppressHydrationWarning>{lineNumber}</span></td>}
          <td suppressHydrationWarning className="cd" dangerouslySetInnerHTML={{ __html: line.html }} />
        </tr>
      );

      isPreviousMarked = isMarked;
      isMarked = isNextMarked;
      isNextMarked = linesToMark.includes(lineNumber + 1);
    }

    return _renderedLines;
  }, [codeLines, showLines, linesToMark]);

  const computedClassName = useMemo(() => {
    return twMerge("bg-neutral-800 rounded-lg p-4 text-base relative group/cb", className);
  }, [className]);

  return (
    <>
      <link key="codeblock:stylesheed" rel="stylesheet" href="/styles/codeblock.min.css" />
      <pre className={computedClassName} data-ssr-rendered={allowSSR} data-is-codeblock="true">
        <code className="language-bash">
          <table className="w-full">
            <tbody>{renderedLines}</tbody>
          </table>
        </code>
        {canCopy && <CopyCode codeLines={codeLines} />}
      </pre>
    </>
  );
};

interface CopyCodeProps {
  codeLines: CodeLine[];
}

const CopyCode = ({ codeLines }: CopyCodeProps) => {
  const clipIconRef = useRef<SVGSVGElement>(null);
  const checkIconRef = useRef<SVGSVGElement>(null);
  const iconTimeoutRef = useRef<(() => unknown) | undefined>(undefined);

  const onCopyClick = useCallback(async () => {
    const copyTask = navigator.clipboard.writeText(codeLines.map((line) => line.original).join("\n"));

    if (clipIconRef.current && checkIconRef.current) {
      clipIconRef.current.setAttribute("data-clicked", "true");
      checkIconRef.current.setAttribute("data-clicked", "true");

      iconTimeoutRef.current?.();

      const timeout = setTimeout(() => {
        if (!clipIconRef.current || !checkIconRef.current) return;
        clipIconRef.current.setAttribute("data-clicked", "false");
        checkIconRef.current.setAttribute("data-clicked", "false");
      }, 1500);

      iconTimeoutRef.current = () => clearTimeout(timeout);
    }

    await copyTask;
  }, [codeLines]);

  const copyButtonClassName = useMemo(() => {
    return twMerge("relative text-white opacity-30 bg-neutral-600 p-2 rounded-lg absolute top-2 right-2 group-hover/cb:opacity-100 hover:bg-neutral-500", codeLines.length === 1 ? "top-1/2 -translate-y-1/2" : "");
  }, []);

  return (
    <button
      id="copy"
      className={copyButtonClassName}
      onClick={onCopyClick}
      aria-label="copy code"
      title="📋 Click to Copy 📋"
    >
      <ClipboardIcon
        ref={clipIconRef}
        id="clip-icon"
        className="transition-opacity data-[clicked='true']:opacity-0"
        width="1.25em"
        height="1.25em"
      />
      <CheckIcon
        ref={checkIconRef}
        id="check-icon"
        className="absolute transition-opacity opacity-0 data-[clicked='true']:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="1.25em"
        height="1.25em"
      />
    </button>
  );
};

const NoSSRCode = dynamic(Promise.resolve({ default: CodeBlock }), { ssr: false });

export default ((props) => props.allowSSR ? <CodeBlock {...props} /> : <NoSSRCode {...props} />) as typeof CodeBlock;