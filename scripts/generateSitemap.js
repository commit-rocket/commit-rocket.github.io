const path = require("path");
const fs = require("fs/promises");

const dotenv = require("dotenv");
const { parseHTML } = require("linkedom");
const { glob } = require("glob");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env.local"), override: true });

const makeUrlContent = ({ url, lastMod, changeFreq = "monthly", priority = "0.5" }) => {
  let content = "";

  content += `\t<url>\n`;
  content += `\t\t<loc>${url}</loc>\n`;
  if (lastMod) content += `\t\t<lastmod>${lastMod}</lastmod>\n`;
  content += `\t\t<changefreq>${changeFreq}</changefreq>\n`;
  content += `\t\t<priority>${priority}</priority>\n`;
  content += `\t</url>\n`;

  return content;
};

const runScript = async () => {
  const outDir = path.resolve(__dirname, "../out");
  const pages = await glob("**/*.html", {
    cwd: outDir
  });

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const sitemapUrls = await Promise.all(pages.map(async (pagePath) => {
    let canonicalUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${pagePath.replace(/\\/g, "/")}`
      .replace(/(\/?(index)?(\.html))$/g, "");

    const fileContent = await fs.readFile(path.resolve(outDir, pagePath));

    const { document: fileDocument } = parseHTML(fileContent.toString());

    let urlContent = "";

    const lastModElement = fileDocument.querySelector("meta[name='page_last_modification']");
    const changeFreqElement = fileDocument.querySelector("meta[name='page_change_frequency']");
    const priorityElement = fileDocument.querySelector("meta[name='page_priority']");

    urlContent += makeUrlContent({
      url: canonicalUrl,
      lastMod: lastModElement?.getAttribute("content"),
      changeFreq: changeFreqElement?.getAttribute("content"),
      priority: priorityElement?.getAttribute("content")
    });

    if (process.env.NEXT_PUBLIC_FRONTEND_URL === canonicalUrl) {
      urlContent += makeUrlContent({
        url: canonicalUrl + "/",
        lastMod: lastModElement?.getAttribute("content"),
        changeFreq: changeFreqElement?.getAttribute("content"),
        priority: priorityElement?.getAttribute("content")
      });
    }

    return urlContent;
  }));

  sitemapContent += sitemapUrls.join("");
  sitemapContent += `</urlset>\n`;

  fs.writeFile(path.join(outDir, "sitemap.xml"), sitemapContent);
};

runScript();