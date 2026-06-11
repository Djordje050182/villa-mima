// Scans public/images and writes src/lib/image-manifest.json so ImageSlot knows
// (at build time, bundled — no runtime fs) which photo slots have real files.
// Runs automatically via the predev/prebuild npm scripts.
import { readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const imagesDir = join(root, "public", "images");
const outFile = join(root, "src", "lib", "image-manifest.json");

const exts = [".avif", ".webp", ".jpg", ".jpeg", ".png"];
const manifest = {};

if (existsSync(imagesDir)) {
  for (const file of readdirSync(imagesDir).sort()) {
    const ext = extname(file).toLowerCase();
    if (!exts.includes(ext)) continue;
    const id = basename(file, ext);
    // First extension in priority order wins
    if (!manifest[id] || exts.indexOf(ext) < exts.indexOf(extname(manifest[id]))) {
      manifest[id] = `/images/${file}`;
    }
  }
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(manifest, null, 2) + "\n");
console.log(`image-manifest: ${Object.keys(manifest).length} image(s) found`);
