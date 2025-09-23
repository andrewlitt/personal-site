import { readdir, readFile, rename, stat, unlink, writeFile } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';
import sharp from 'sharp';

const ROOT_DIR = resolve(process.cwd(), 'public');
const MAX_WIDTH = 1600;
const QUALITY = 80;
const JPEG_EXTENSIONS = new Set(['.jpg', '.jpeg']);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (JPEG_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      yield fullPath;
    }
  }
}

function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
}

async function optimizeImage(filePath) {
  const originalStats = await stat(filePath);
  const originalSize = originalStats.size;
  const inputBuffer = await readFile(filePath);

  const metadata = await sharp(inputBuffer).metadata();

  let pipeline = sharp(inputBuffer).rotate();
  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const optimizedBuffer = await pipeline
    .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
    .toBuffer();

  if (optimizedBuffer.length >= originalSize) {
    return { optimized: false };
  }

  const tempPath = `${filePath}.tmp`;
  await writeFile(tempPath, optimizedBuffer);
  await unlink(filePath);
  await rename(tempPath, filePath);

  return {
    optimized: true,
    originalSize,
    optimizedSize: optimizedBuffer.length,
    widthChanged: Boolean(metadata.width && metadata.width > MAX_WIDTH),
  };
}

async function main() {
  let optimizedCount = 0;
  let bytesSaved = 0;

  for await (const imagePath of walk(ROOT_DIR)) {
    try {
      const result = await optimizeImage(imagePath);
      if (result.optimized) {
        optimizedCount += 1;
        bytesSaved += result.originalSize - result.optimizedSize;
        const status = result.widthChanged ? 'resized+compressed' : 'compressed';
        console.log(`${status.padEnd(19)} ${formatBytes(result.originalSize)} -> ${formatBytes(result.optimizedSize)} ${imagePath}`);
      }
    } catch (error) {
      console.error(`Failed to optimize ${imagePath}:`, error);
    }
  }

  if (optimizedCount === 0) {
    console.log('No images were optimized.');
    return;
  }

  console.log(`\nOptimized ${optimizedCount} image(s); total savings ${formatBytes(bytesSaved)}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
