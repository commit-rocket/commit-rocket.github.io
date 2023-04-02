const path = require("path");
const fs = require("fs/promises");

const dotenv = require("dotenv");
const { parseHTML } = require("linkedom");
const { glob } = require("glob");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env.local"), override: true });

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


    urlContent += `\t<url>\n`;
    urlContent += `\t\t<loc>${canonicalUrl}</loc>\n`;
    if (lastModElement?.getAttribute("content")) urlContent += `\t\t<lastmod>${lastModElement.getAttribute("content")}</lastmod>\n`;
    urlContent += `\t\t<changefreq>${changeFreqElement?.getAttribute("content") ?? "monthly"}</changefreq>\n`;
    urlContent += `\t\t<priority>${priorityElement?.getAttribute("content") ?? "0.5"}</priority>\n`;
    urlContent += `\t</url>\n`;

    return urlContent;
  }));

  sitemapContent += sitemapUrls.join("");
  sitemapContent += `</urlset>\n`;

  fs.writeFile(path.join(outDir, "sitemap.xml"), sitemapContent);
};

runScript();