import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const origin = "https://ci.funtech.inc";
const htmlDirectory = "work/reverse/full-site/html";
const chunkDirectory = "work/reverse/full-site/chunks";
const outputDirectory = "public/assets/full-site";
const extensions = "(?:webp|png|jpe?g|gif|svg|glb|obj|mp3|aac)";
const assetPattern = new RegExp(`\\/[A-Za-z0-9_?=&.%\\/-]+\\.${extensions}`, "g");

const assetPaths = new Set();
for (const directory of [htmlDirectory, chunkDirectory]) {
  for (const filename of await readdir(directory)) {
    const contents = await readFile(path.join(directory, filename), "utf8");
    for (const match of contents.matchAll(assetPattern)) {
      const value = match[0].replaceAll("\\u0026", "&");
      if (!value.startsWith("//") && !value.includes("opengraph-image")) assetPaths.add(value);
    }
  }
}

for (const value of [
  "/noise-border/volt-h.png", "/noise-border/volt-v.png",
  "/noise-border/breaker-h.png", "/noise-border/breaker-v.png",
  "/noise-border/fun-h.png", "/noise-border/fun-v.png",
  "/logo-variation/volt-bg.png", "/logo-variation/breaker-bg.png", "/logo-variation/fun-bg.png",
  ...["vision-visual", "funtech-way-lightning", "funtech-way-02", "funtech-way-03"].flatMap((name) => [0, 1, 2].map((frame) => `/noise-illustrations/${name}-${frame}.webp`)),
]) assetPaths.add(value);

const jobs = [...assetPaths].sort().map((assetPath) => {
  const cleanPath = assetPath.split("?")[0];
  const outputPath = cleanPath.startsWith("/_next/static/media/")
    ? path.join(outputDirectory, "media", path.basename(cleanPath))
    : path.join(outputDirectory, cleanPath.replace(/^\//, ""));
  return { assetPath, outputPath, url: `${origin}${assetPath}` };
});

for (let index = 0; index < jobs.length; index += 6) {
  await Promise.all(jobs.slice(index, index + 6).map(async ({ assetPath, outputPath, url }) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
    console.log(assetPath);
  }));
}

await writeFile(path.join(outputDirectory, "manifest.json"), JSON.stringify(jobs, null, 2));
for (const name of ["a", "b", "c", "d"]) {
  const source = path.join(outputDirectory, "webgl", `manga-${name}-sprite.jpg`);
  const output = path.join(outputDirectory, "webgl", `manga-${name}-alpha.png`);
  const metadata = await sharp(source).metadata();
  const alpha = await sharp(source).grayscale().raw().toBuffer();
  await sharp({
    create: {
      width: metadata.width,
      height: metadata.height,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  }).joinChannel(alpha, {
    raw: { width: metadata.width, height: metadata.height, channels: 1 },
  }).png().toFile(output);
}

await mkdir(path.join(outputDirectory, "video-posters"), { recursive: true });
await sharp(path.join(outputDirectory, "thumbnails", "vision-visual.webp"))
  .extract({ left: 456, top: 8, width: 560, height: 560 })
  .webp({ quality: 92 })
  .toFile(path.join(outputDirectory, "video-posters", "vision-visual.webp"));
console.log(`Downloaded ${jobs.length} full-site assets.`);
