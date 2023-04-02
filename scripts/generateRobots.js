const path = require("path");
const fs = require("fs/promises");

const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env.local"), override: true });

const runScript = async () => {
  const outDir = path.resolve(__dirname, "../out");

  let content = "";

  content += "User-agent: *\n";
  content += "Allow: *\n\n";
  content += `Sitemap: ${process.env.NEXT_PUBLIC_FRONTEND_URL}/sitemap.xml`;

  fs.writeFile(path.join(outDir, "robots.txt"), content);
};

runScript();