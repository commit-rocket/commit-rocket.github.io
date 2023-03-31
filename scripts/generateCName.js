const path = require("path");
const fs = require("fs/promises");

const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env.local"), override: true });

const run = async () => {
  const outDir = path.resolve(__dirname, "../out");
  const url = new URL(process.env.NEXT_PUBLIC_FRONTEND_URL)
  fs.writeFile(path.join(outDir, "CNAME"), url.host);
};

run();