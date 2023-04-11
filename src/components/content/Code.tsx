import React, { useMemo } from "react";
import useCodeHightlight, { SupportedLanguages } from "@/hooks/useCodeHighlight";
import dynamic from "next/dynamic";
import { useServerInsertedHTML } from "next/navigation";

export interface CodeProps {
  lang: SupportedLanguages;

  children: string;

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

const Code: React.FC<CodeProps> = ({ lang, children, markedLines, showLines, allowSSR }) => {
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

  return (
    <>
      <link key="codeblock:stylesheed" rel="stylesheet" href="/styles/codeblock.min.css" />
      <pre className="bg-neutral-800 rounded-lg p-4 text-base relative">
        <code className="language-bash">
          <table className="w-full">
            <tbody>{renderedLines}</tbody>
          </table>
        </code>
      </pre>
    </>
  );
};

const NoSSRCode = dynamic(Promise.resolve({ default: Code }), { ssr: false });

export default ((props) => props.allowSSR ? <Code {...props} /> : <NoSSRCode {...props} />) as typeof Code;