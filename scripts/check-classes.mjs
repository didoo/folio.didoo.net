// Checks that every class used in the HTML is defined in the CSS, and that every class in the CSS is used.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const listFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });

const files = listFiles("docs");
const cssFiles = files.filter((file) => file.endsWith(".css"));
const htmlFiles = files.filter((file) => file.endsWith(".html"));

const css = cssFiles
  .map((file) => readFileSync(file, "utf8"))
  .join("\n")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/url\([^)]*\)/g, "");

const defined = new Set([...css.matchAll(/\.(-?[a-z_][\w-]*)/gi)].map((match) => match[1]));
const used = new Set();

for (const file of htmlFiles) {
  for (const [, value] of readFileSync(file, "utf8").matchAll(/class="([^"]*)"/g)) {
    value.split(/\s+/).filter(Boolean).forEach((name) => used.add(name));
  }
}

const notDefined = [...used].filter((name) => !defined.has(name));
const notUsed = [...defined].filter((name) => !used.has(name));

console.log(`Checked ${used.size} classes in ${htmlFiles.length} HTML files.`);

if (notDefined.length > 0) console.error(`\nUsed in the HTML but not defined in the CSS:\n${notDefined.join("\n")}`);
if (notUsed.length > 0) console.error(`\nDefined in the CSS but not used in the HTML:\n${notUsed.join("\n")}`);
if (notDefined.length > 0 || notUsed.length > 0) process.exit(1);
