import { ArticleContext } from "../post/ArticleContext";
import IArticle from "@/assets/state/articles/article";

const makeHeadingId = (heading: Element, index: number, usedHeadingIds: string[]) => {
  const id = heading.getAttribute("id");
  if (id) {
    if (usedHeadingIds.includes(id)) {
      console.warn(`Duplicate ID "${id}"`);
    }
    usedHeadingIds.push(id);
    return id;
  }

  const contentId = (heading.textContent ?? "").substring(0, 255).replace(/[\s\n\t_]/g, "-");
  const newId = usedHeadingIds.includes(contentId) ? `${contentId}-${index}` : contentId;
  usedHeadingIds.push(newId);

  return newId;
};

/** 
 * **SHOULD ONLY BE USED ON THE SERVER-SIDE**
 * 
 * Renders the JSX elements out to static HTML.  
 * Content is rendered twice. A first time without ArticleContext and a second time with. 
 * The first render is to provide information about the content, like headings.
 * The second render has the context provided, and assigns ids to all headings that have none
 * 
 */
export const makeStaticContent = async (article: IArticle, postId: number) => {
  const { parseHTML } = await import("linkedom");
  const { reactNodeToString } = await import("@/utils/react");

  const firstRenderContent = await reactNodeToString(article.content);

  const firtsRender = parseHTML(firstRenderContent);
  let usedHeadingIds: string[] = [];
  const headings = Array
    .from(firtsRender.document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
    .map((heading, i) => ({
      level: Number(heading.nodeName.substring(1)),
      text: heading.textContent!,
      id: makeHeadingId(heading, i, usedHeadingIds)
    }));

  const secondRenderContent = await reactNodeToString(
    <ArticleContext.Provider
      value={Object.assign({
        ready: true,
        headings,
        path: `/blog/${postId}/${article.slug}`
      }, article)}
    >
      {article.content}
    </ArticleContext.Provider>
  );

  const secondRender = parseHTML(secondRenderContent);
  usedHeadingIds = [];
  Array.from(secondRender.document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
    .forEach((heading, i) => {
      heading.setAttribute("id", makeHeadingId(heading, i, usedHeadingIds));
    });

  return secondRender.document.toString();
};