import { readFile, mkdir, writeFile } from "node:fs/promises";

const source = process.argv[2] ?? "/tmp/funtech-logo-details.html";
const output = process.argv[3] ?? "work/reverse/rsc-records";
const html = await readFile(source, "utf8");
const payloads = [...html.matchAll(/self\.__next_f\.push\(\[1,"((?:\\.|[^"\\])*)"\]\)/g)]
  .map((match) => JSON.parse(`"${match[1]}"`));
const flight = payloads.join("");

await mkdir(output, { recursive: true });
const records = [];
const marker = /(?:^|\n)([0-9a-z]+):T([0-9a-f]+),/g;
for (const match of flight.matchAll(marker)) {
  const id = match[1];
  const size = Number.parseInt(match[2], 16);
  const start = match.index + match[0].length;
  const value = flight.slice(start, start + size);
  const extension = value.trimStart().startsWith("<") ? "svg" : "txt";
  const path = `${output}/${id}.${extension}`;
  await writeFile(path, value);
  records.push({ id, size, path, startsWith: value.slice(0, 60) });
}

await writeFile(`${output}/manifest.json`, JSON.stringify(records, null, 2));
const publicOutput = "public/assets/logo-details";
await mkdir(publicOutput, { recursive: true });
for (const [id, name] of [["20", "detail-01"], ["1a", "detail-02"], ["23", "detail-03"]]) {
  const record = records.find((item) => item.id === id);
  if (!record) throw new Error(`Missing RSC text record ${id}`);
  const inner = await readFile(record.path, "utf8");
  await writeFile(
    `${publicOutput}/${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 380" fill="none">${inner.replaceAll("var(--color-key)", "#ff481b")}</svg>`,
  );
}
console.log(JSON.stringify(records, null, 2));
