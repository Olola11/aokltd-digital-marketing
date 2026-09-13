// Splits the AOK mark into its two parts for the footer entrance: the ring,
// and the A with its quill. Both outputs keep the source canvas size so they
// line up exactly when stacked.
//
// The split radius is measured from the image itself: the ring's outer
// radius (from the visible bounding box) less 1.5× its stroke, which falls
// in the empty band between the ring and the A.
//
// Usage:  node scripts/studio/split-mark.mjs
// Output: public/studio/mark/ring.png, public/studio/mark/inner.png

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE = path.join('public', 'images', 'logo', 'Apotheosis of Knowledge LOGO PNG-15.png');
const OUT_DIR = path.join('public', 'studio', 'mark');
const VISIBLE = 16;

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const alpha = (x, y) => data[(y * width + x) * channels + 3];

let minX = width;
let maxX = 0;
let minY = height;
let maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (alpha(x, y) > VISIBLE) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const cx = (minX + maxX) / 2;
const cy = (minY + maxY) / 2;
const outer = (maxX - minX) / 2;

// Walk inward from the ring's left edge along the centre row to its inner edge.
let x = minX;
const row = Math.round(cy);
while (x < cx && alpha(x, row) > VISIBLE) x++;
const stroke = x - minX;
const split = outer - stroke * 1.5;

const ring = Buffer.from(data);
const inner = Buffer.from(data);
for (let y = 0; y < height; y++) {
  for (let px = 0; px < width; px++) {
    const i = (y * width + px) * channels + 3;
    if (Math.hypot(px - cx, y - cy) > split) inner[i] = 0;
    else ring[i] = 0;
  }
}

await mkdir(OUT_DIR, { recursive: true });
const raw = { raw: { width, height, channels } };
await sharp(ring, raw).png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'ring.png'));
await sharp(inner, raw).png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, 'inner.png'));

console.log(
  JSON.stringify({ width, height, centre: [cx, cy], outer, stroke, split: Number(split.toFixed(1)) })
);
