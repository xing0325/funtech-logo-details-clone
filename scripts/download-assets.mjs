import { mkdir, writeFile } from "node:fs/promises";

const base = "https://ci.funtech.inc";
const slugs = ["home","brand-message","ci-update","vision-visual","funtech-way","megavolt-creative","breakers-of-victory","all-for-fun","logo-details","logo-variation","10th-special-item","ending-message","we-are-funtech","fin"];
const jobs = slugs.map((slug) => ({ url: `${base}/thumbnails/en/${slug}.webp`, path: `public/assets/thumbnails/${slug}.webp` }));
jobs.push(
  { url: `${base}/noise-border/fun-h.png`, path: "public/assets/ui/fun-h.png" },
  { url: `${base}/noise-border/fun-v.png`, path: "public/assets/ui/fun-v.png" },
  { url: `${base}/opengraph-image.jpg?opengraph-image.0fce5683.jpg`, path: "public/assets/ui/og.jpg" },
);

await mkdir("public/assets/thumbnails", { recursive: true });
await mkdir("public/assets/ui", { recursive: true });
for (let i = 0; i < jobs.length; i += 4) {
  await Promise.all(jobs.slice(i, i + 4).map(async ({ url, path }) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    await writeFile(path, Buffer.from(await response.arrayBuffer()));
  }));
}
console.log(`Downloaded ${jobs.length} assets.`);
