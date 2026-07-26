import { mkdir, readFile, writeFile } from "node:fs/promises";

const html = await readFile("index.html", "utf8");
const rawCss = await readFile("styles.css", "utf8");
const js = await readFile("script.js", "utf8");
const hero = await readFile("assets/cultural-intelligence-hero.jpg");
const mark = await readFile("assets/Frame 2136139202.svg", "utf8");
const markDataUri = `data:image/svg+xml,${encodeURIComponent(mark)}`;
const css = rawCss.replaceAll("assets/Frame 2136139202.svg", markDataUri);

const bundledHtml = html
  .replace('<link rel="stylesheet" href="styles.css" />', `<style>${css}</style>`)
  .replace(
    'src="assets/cultural-intelligence-hero.jpg"',
    `src="data:image/jpeg;base64,${hero.toString("base64")}"`
  )
  .replace('<script src="script.js"></script>', `<script>${js}</script>`);

const source = `const html = ${JSON.stringify(bundledHtml)};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== "/" && url.pathname !== "/index.html") {
      return new Response("Not found", { status: 404 });
    }

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300"
      }
    });
  }
};
`;

await mkdir("dist", { recursive: true });
await writeFile("dist/index.js", source);
