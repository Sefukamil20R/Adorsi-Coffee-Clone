import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "../docs/original-menu.html");
const outPath = path.join(__dirname, "../app/data/menu/seed-data.json");

const html = fs.readFileSync(htmlPath, "utf8");

const articleRe =
  /<article id="(menu-item-[^"]+)"[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?font-display text-xl text-gold whitespace-nowrap">\s*(\d+)\s*[\s\S]*?<span class="text-sm text-gold\/80">ETB<\/span>[\s\S]*?<div class="flex flex-wrap gap-2">([\s\S]*?)<\/div>[\s\S]*?<p class="text-sm text-ivory\/65 leading-relaxed flex-1">([\s\S]*?)<\/p>/g;

const spanRe = /<span[^>]*>([\s\S]*?)<\/span>/g;

const items = [];
let m;
while ((m = articleRe.exec(html)) !== null) {
  const [, id, rawName, priceStr, tagsBlock, rawDesc] = m;
  const name = rawName.replace(/<!--[\s\S]*?-->/g, "").trim();
  const description = rawDesc
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/&amp;/g, "&")
    .trim();
  const spans = [];
  let sm;
  const localSpanRe = new RegExp(spanRe.source, "g");
  while ((sm = localSpanRe.exec(tagsBlock)) !== null) {
    spans.push(
      sm[1]
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/&amp;/g, "&")
        .trim(),
    );
  }
  const category = spans[0] ?? "";
  const tagCandidate = spans[1];
  const tag =
    tagCandidate &&
    ["Signature", "New", "Seasonal", "Fasting"].includes(tagCandidate)
      ? tagCandidate
      : tagCandidate ?? null;

  items.push({
    id,
    name,
    price: Number(priceStr),
    category,
    tag: tag ?? null,
    description: description || null,
  });
}

if (items.length !== 126) {
  console.error(`Expected 126 items, got ${items.length}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} items to ${outPath}`);
