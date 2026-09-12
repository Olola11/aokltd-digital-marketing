/** Glyphs text passes through on its way from noise to order. */
export const NOISE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#%&*+=<>/';

export function noiseOf(length: number): string {
  let text = '';
  for (let i = 0; i < length; i++) {
    text += NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)];
  }
  return text;
}
