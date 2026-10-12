import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Preserve the original transparent Figma layers at every output density.
for (const layer of ['sky', 'mountains', 'foreground']) {
  const source = resolve(root, `src/img/hero/${layer}-source.png`);
  for (const [suffix, width] of [
    ['mobile', 960],
    ['source', 1920],
    ['2x', 3840],
  ]) {
    await sharp(source)
      .resize({ width })
      .webp({ quality: 90, alphaQuality: 100, effort: 6 })
      .toFile(resolve(root, `src/img/hero/${layer}-${suffix}.webp`));
  }
}

// Keep the exact portrait crop used by each 566 × 720 design slot.
for (const photo of ['hiker', 'gear', 'map']) {
  for (const scale of [1, 2]) {
    await sharp(resolve(root, `src/img/content/${photo}-source.png`))
      .resize({
        width: 566 * scale,
        height: 720 * scale,
        fit: 'cover',
        position: 'centre',
      })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(resolve(root, `src/img/content/${photo}-${scale}x.jpg`));
  }
}
