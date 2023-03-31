const path = require("path");
const fs = require("fs/promises");

const exclude = ["article.d.ts", "index.ts", "tags.ts"];
const articlesDir = path.resolve(__dirname, "../src/assets/state/articles");
const indexPath = path.join(articlesDir, "/index.ts");

const run = async () => {
  const files = await fs.readdir(articlesDir);
  let fileImports = `import IArticle from "./article";\n\n`;
  let exportArrayContent = "export default [\n";

  files
    .filter((file) => {
      const isExclude = exclude.includes(file);
      const isTsx = file.endsWith(".tsx");
      return !isExclude && isTsx;
    })
    .map((articleFile) => articleFile.replace(".tsx", ""))
    .forEach((articleFilename, i, arr) => {
      const importName = `article${i + 1}`;
      fileImports += `import ${importName} from "./${articleFilename}";\n`;
      exportArrayContent += `\t{ \n\t\tfilename: "${articleFilename}", \n\t\tarticle: ${importName} \n\t}${arr.length - 1 === i ? "" : ","}\n`;
    });

  exportArrayContent += "] as { filename: string; article: IArticle }[];";

  const indexContent = `${fileImports}\n${exportArrayContent}`;
  await fs.writeFile(indexPath, indexContent);
};

run();