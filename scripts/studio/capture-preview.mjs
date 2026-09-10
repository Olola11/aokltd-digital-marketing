// Records a motion preview of a live website for the studio showcase.
//
// Usage:
//   node scripts/studio/capture-preview.mjs <slug> <url> [options]
//
// Options:
//   --settle <ms>       Wait this long after load before recording (skips the
//                       entrance animation). Default 0: record from reload.
//   --travel <0–1>      How far down the page to travel, as a share of its
//                       scrollable height. Default 0.55. Pinned scroll sections
//                       (common on animated sites) consume a lot of scroll, so
//                       this is measured against the whole page.
//   --passes <n>        Number of scroll passes, with a pause between each. Default 3.
//   --target-duration <sec>
//                       Speed the recording up to at most this length. Default 16.
//   --poster-at <sec|%> Poster frame, in seconds or as a share of the final video
//                       ("40%"). Default 0.4 with --settle, else 2.6.
//   --hide "<css>"      Hide elements (e.g. a cookie banner) before recording.
//   --keep-frames       Keep the raw frames for inspection.
//
// Output (public/studio/work/<slug>/):
//   preview.mp4  H.264, 1280px wide, keyframe every 10 frames so pointer scrubbing stays smooth
//   poster.jpg   shown before the video loads
//
// Frames come from the Chrome DevTools screencast rather than Playwright's
// built-in recorder, which encodes at a low bitrate and blurs small type.
// Scrolling uses real wheel input, because sites with smooth-scroll libraries
// ignore window.scrollTo.

import { chromium } from 'playwright';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';

const args = process.argv.slice(2);
const [slug, url] = args;
if (!slug || !url) {
  console.error('Usage: node scripts/studio/capture-preview.mjs <slug> <url> [--settle ms] [--poster-at s] [--hide "<css>"] [--keep-frames]');
  process.exit(1);
}

function option(name, fallback) {
  const index = args.indexOf(name);
  return index > -1 ? args[index + 1] : fallback;
}

const settleMs = Number(option('--settle', '0'));
const posterOption = option('--poster-at', settleMs > 0 ? '0.4' : '2.6');
const travel = Number(option('--travel', '0.55'));
const passes = Math.max(1, Number(option('--passes', '3')));
const targetDuration = Number(option('--target-duration', '16'));
const hideSelector = option('--hide', null);
const keepFrames = args.includes('--keep-frames');

const VIEWPORT = { width: 1440, height: 900 };
const FFMPEG = process.env.FFMPEG ?? 'ffmpeg';
const outDir = path.join('public', 'studio', 'work', slug);
const frameDir = path.join(os.tmpdir(), `aok-capture-${slug}`);

await rm(frameDir, { recursive: true, force: true });
await mkdir(frameDir, { recursive: true });
await mkdir(outDir, { recursive: true });

// Edge ships with Windows, so no browser download is needed.
const browser = await chromium.launch({ channel: process.env.CAPTURE_CHANNEL ?? 'msedge', headless: true });
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
const page = await context.newPage();

async function prepare() {
  // The script supplies its own easing; a site's CSS smooth scrolling would
  // animate every wheel step on top of it and stall heavy pages.
  await page.addStyleTag({ content: 'html,body{scroll-behavior:auto!important}' });
  if (hideSelector) {
    await page.addStyleTag({ content: `${hideSelector}{display:none!important}` });
  }
  await page.mouse.move(VIEWPORT.width / 2, VIEWPORT.height / 2);
}

const cdp = await context.newCDPSession(page);
const frames = [];
cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
  frames.push({ data, t: metadata.timestamp });
  cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
});

function startScreencast() {
  return cdp.send('Page.startScreencast', {
    format: 'jpeg',
    quality: 92,
    maxWidth: VIEWPORT.width,
    maxHeight: VIEWPORT.height,
    everyNthFrame: 1,
  });
}

// First visit warms the cache so the recorded visit has no half-loaded fonts or images.
await page.goto(url, { waitUntil: 'networkidle', timeout: 90_000 });

if (settleMs > 0) {
  await prepare();
  await page.waitForTimeout(settleMs);
  await startScreencast();
} else {
  await startScreencast();
  // Some sites hold the load event open (analytics, long requests); the
  // document is enough, and the choreography's opening hold covers the rest.
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 90_000 });
  await prepare();
}
const startedAt = Date.now() / 1000;

async function hold(ms) {
  await page.waitForTimeout(ms);
}

const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

async function glide(distance, ms) {
  const steps = Math.max(1, Math.round(ms / 16));
  let travelled = 0;
  for (let i = 1; i <= steps; i++) {
    const target = distance * ease(i / steps);
    await page.mouse.wheel(0, target - travelled);
    travelled = target;
    await page.waitForTimeout(16);
  }
}

// Choreography: a beat on the hero, then unhurried passes down the page.
const scrollable = await page.evaluate(
  () => document.documentElement.scrollHeight - window.innerHeight
);
const perPass = (Math.max(0, scrollable) * travel) / passes;

await hold(settleMs > 0 ? 1200 : 2600);
for (let i = 0; i < passes; i++) {
  await glide(perPass, 2600);
  await hold(i === passes - 1 ? 1600 : 1300);
}

await cdp.send('Page.stopScreencast');
await browser.close();

const usable = frames.filter((f) => f.t >= startedAt - 0.05);
if (usable.length < 20) {
  console.error(`Only ${usable.length} frames captured; the page may not have repainted.`);
  process.exit(1);
}

// Screencast frames arrive only when the page repaints, so each frame is held
// until the next one: the concat demuxer's per-file duration does exactly that.
const lines = ['ffconcat version 1.0'];
for (let i = 0; i < usable.length; i++) {
  const name = `f_${String(i).padStart(5, '0')}.jpg`;
  await writeFile(path.join(frameDir, name), Buffer.from(usable[i].data, 'base64'));
  const next = usable[i + 1]?.t ?? usable[i].t + 1 / 30;
  lines.push(`file '${name}'`, `duration ${Math.max(1 / 60, next - usable[i].t).toFixed(4)}`);
}
lines.push(`file 'f_${String(usable.length - 1).padStart(5, '0')}.jpg'`);
const listPath = path.join(frameDir, 'list.ffconcat');
await writeFile(listPath, lines.join('\n'));

function ffmpeg(ffArgs) {
  const result = spawnSync(FFMPEG, ['-y', '-v', 'error', ...ffArgs], { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`ffmpeg failed: ${ffArgs.join(' ')}`);
    process.exit(1);
  }
}

const mp4 = path.join(outDir, 'preview.mp4');
const poster = path.join(outDir, 'poster.jpg');

// Heavy pages process wheel input slowly, so real time can run long.
// Speed up (never slow down) to the target length.
const seconds = usable[usable.length - 1].t - usable[0].t;
const speed = seconds > targetDuration ? targetDuration / seconds : 1;
const finalSeconds = seconds * speed;

ffmpeg([
  '-f', 'concat', '-safe', '0', '-i', listPath,
  '-vf', `setpts=${speed.toFixed(5)}*PTS,fps=30,scale=1280:-2:flags=lanczos,format=yuv420p`,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-g', '10',
  '-movflags', '+faststart', '-an', mp4,
]);

const posterAt = posterOption.endsWith('%')
  ? (Number(posterOption.slice(0, -1)) / 100) * finalSeconds
  : Number(posterOption);
ffmpeg(['-ss', posterAt.toFixed(2), '-i', mp4, '-frames:v', '1', '-q:v', '3', poster]);

if (!keepFrames) await rm(frameDir, { recursive: true, force: true });

console.log(
  JSON.stringify({
    slug,
    url,
    frames: usable.length,
    recordedSeconds: Number(seconds.toFixed(2)),
    finalSeconds: Number(finalSeconds.toFixed(2)),
    mp4,
    poster,
  })
);
