import sharp from "sharp";
import { readdir, stat, writeFile, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "..", "src", "public", "images");

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 72;
const PNG_COMPRESSION = 9;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function optimize(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return null;

  const before = (await stat(filePath)).size;

  try {
    const fileBuffer = await readFile(filePath);
    const img = sharp(fileBuffer, { failOnError: false });
    const meta = await img.metadata();

    let pipeline = img.rotate();

    const needsResize =
      (meta.width && meta.width > MAX_DIMENSION) ||
      (meta.height && meta.height > MAX_DIMENSION);

    if (needsResize) {
      pipeline = pipeline.resize(MAX_DIMENSION, MAX_DIMENSION, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    let buf;
    if (ext === ".jpg" || ext === ".jpeg") {
      buf = await pipeline
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toBuffer();
    } else if (ext === ".png") {
      buf = await pipeline
        .png({ compressionLevel: PNG_COMPRESSION })
        .toBuffer();
    } else if (ext === ".webp") {
      buf = await pipeline.webp({ quality: 82 }).toBuffer();
    }

    if (buf) {
      await writeFile(filePath, buf);
      return { before, after: buf.length };
    }
    return { before, after: before, skipped: true };
  } catch (err) {
    console.error(`  ❌  ${path.basename(filePath)}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(`\nOptimizing images in:\n  ${IMAGES_DIR}\n`);

  const all = await walk(IMAGES_DIR);
  const imgs = all.filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  console.log(`Found ${imgs.length} images\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const f of imgs) {
    const rel = path.relative(IMAGES_DIR, f);
    const result = await optimize(f);
    if (!result) continue;

    totalBefore += result.before;
    totalAfter += result.after;

    if (result.skipped) {
      console.log(`  ⏭   ${rel} — already optimal (${fmt(result.before)})`);
    } else {
      const saved = result.before - result.after;
      const pct = ((saved / result.before) * 100).toFixed(1);
      console.log(
        `  ✅  ${rel}\n       ${fmt(result.before)} → ${fmt(result.after)}  (saved ${fmt(saved)}, ${pct}%)`
      );
    }
  }

  const totalSaved = totalBefore - totalAfter;
  const totalPct = ((totalSaved / totalBefore) * 100).toFixed(1);
  console.log("\n" + "─".repeat(60));
  console.log(
    `TOTAL  ${fmt(totalBefore)} → ${fmt(totalAfter)}  (saved ${fmt(totalSaved)}, ${totalPct}%)\n`
  );
}

main().catch(console.error);
