// Checks that every local link and asset referenced by the HTML pages and the CSS exists in docs/.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve("docs");

const listFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });

const isExternal = (url) => /^([a-z]+:|\/\/|#)/i.test(url);

const resolvesToFile = (file, url) => {
  const path = decodeURIComponent(url.split(/[?#]/)[0]);
  const target = path.startsWith("/") ? join(root, path) : resolve(dirname(file), path);
  if (!target.startsWith(root) || !existsSync(target)) return false;
  return statSync(target).isFile() || existsSync(join(target, "index.html"));
};

const patterns = {
  ".html": /(?:href|src|poster)="([^"]+)"|content="0; url=([^"]+)"/g,
  ".css": /url\("?([^")]+)"?\)/g,
};

const files = listFiles(root);
const broken = [];
let checked = 0;

for (const file of files) {
  const pattern = patterns[file.slice(file.lastIndexOf("."))];
  if (!pattern) continue;

  for (const match of readFileSync(file, "utf8").matchAll(pattern)) {
    const url = match[1] ?? match[2];
    if (isExternal(url)) continue;
    checked += 1;
    if (!resolvesToFile(file, url)) broken.push(`${relative(root, file)}: ${url}`);
  }
}

console.log(`Checked ${checked} local references in ${files.length} files.`);

if (broken.length > 0) {
  console.error(`\n${broken.length} broken:\n${broken.join("\n")}`);
  process.exit(1);
}
