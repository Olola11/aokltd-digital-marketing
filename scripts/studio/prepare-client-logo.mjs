// Prepares a client logo for the studio logo wall.
//
// Trims the transparent padding around the logo and inks every visible pixel
// in the brand navy, keeping the alpha channel so anti-aliased edges stay
// smooth. Every logo on the wall then shares one colour, whatever its own.
//
// Usage:  node scripts/studio/prepare-client-logo.mjs <input.png|svg> <slug>
// Output: public/studio/clients/<slug>.png

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const [input, slug] = process.argv.slice(2);
if (!input || !slug) {
  console.error('Usage: node scripts/studio/prepare-client-logo.mjs <input.png|svg> <slug>');
  process.exit(1);
}

const INK = { r: 0, g: 0, b: 139 }; // #00008B
const out = path.join('public', 'studio', 'clients', `${slug}.png`);
await mkdir(path.dirname(out), { recursive: true });

// density only affects SVG input: rasterise vectors large enough to stay sharp.
const trimmed = await sharp(input, { density: 600 }).ensureAlpha().trim().toBuffer();
const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += info.channels) {
  data[i] = INK.r;
  data[i + 1] = INK.g;
  data[i + 2] = INK.b;
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(JSON.stringify({ slug, out, width: info.width, height: info.height }));
