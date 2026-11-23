import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

mkdirSync(outDir, { recursive: true });
copyFileSync(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));

// Hand in only a VIDEO.json that names a real TikTok video address.
const handed = JSON.parse(readFileSync(join(outDir, "VIDEO.json"), "utf8")) as {
  url?: unknown;
};
if (typeof handed.url !== "string" || !handed.url.startsWith("https://www.tiktok.com/@")) {
  throw new Error("VIDEO.json does not name a TikTok video address");
}
console.log(`handing in ${handed.url}`);
