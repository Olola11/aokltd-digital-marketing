import { OG_CONTENT_TYPE, OG_SIZE, studioOgImage } from '@/lib/studio/og';

export const alt = 'AOK Studio — a Lagos creative studio';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return studioOgImage({
    eyebrow: 'Studio',
    title: 'A Lagos creative studio for companies whose work deserves better than noise.',
    footnote: 'Websites · Brand identity · Motion · Copy · Ghostwriting',
  });
}
