/**
 * Builds the studio's tab icon from the AOK mark.
 *
 *   node scripts/studio/make-favicon.mjs
 *
 * Two outputs:
 *   src/app/studio/icon.png        static favicon (what a visitor sees before
 *                                  scripts run, and if they never do)
 *   src/app/studio/apple-icon.png  home-screen icon
 *   public/studio/mark/favicon-source.png
 *                                  transparent square the animated favicon
 *                                  samples its particles from
 *
 * The static icons sit on the studio's paper colour rather than transparency,
 * so the navy mark stays legible on a dark browser chrome.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'public/images/logo/Apotheosis of Knowledge LOGO PNG-15.png');
const PAPER = { r: 0xf5, g: 0xf6, b: 0xf8, alpha: 1 };

/** The mark, trimmed of its transparent margin and squared up. */
async function mark(size, padding) {
  const inner = size - padding * 2;
  const trimmed = await sharp(SOURCE).trim().resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: trimmed, gravity: 'center' }])
    .png();
}

async function main() {
  await mkdir(path.join(ROOT, 'public/studio/mark'), { recursive: true });

  const icon = await mark(64, 3);
  await icon.clone().flatten({ background: PAPER }).toFile(path.join(ROOT, 'src/app/studio/icon.png'));

  const apple = await mark(180, 16);
  await apple.flatten({ background: PAPER }).toFile(path.join(ROOT, 'src/app/studio/apple-icon.png'));

  // Kept transparent: the animation composites it over the tab itself.
  const source = await mark(96, 4);
  await source.toFile(path.join(ROOT, 'public/studio/mark/favicon-source.png'));

  console.log('favicon written');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
