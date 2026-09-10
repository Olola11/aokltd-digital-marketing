import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/** The shared social card for studio pages: brand, a label pill, one large line. */
export async function studioOgImage({
  eyebrow,
  title,
  footnote,
}: {
  eyebrow: string;
  title: string;
  footnote: string;
}) {
  // Literal paths so the bundler traces only these three files into the function.
  const [medium, semibold, logo] = await Promise.all([
    readFile(path.join(process.cwd(), 'src/assets/fonts/space-grotesk-500.woff')),
    readFile(path.join(process.cwd(), 'src/assets/fonts/space-grotesk-600.woff')),
    readFile(path.join(process.cwd(), 'public/images/logo/Apotheosis of Knowledge LOGO PNG-15.png')),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F5F6F8',
          color: '#00008B',
          padding: '56px 64px',
          fontFamily: 'Space Grotesk',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
            <img src={logoSrc} width={56} height={56} alt="" />
            <span style={{ fontSize: 34, fontWeight: 500 }}>AOK Studio</span>
          </div>
          <div
            style={{
              display: 'flex',
              border: '2px solid #00008B',
              borderRadius: 999,
              padding: '8px 24px',
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? 64 : 76,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 24,
            fontWeight: 500,
            color: 'rgba(0, 0, 139, 0.72)',
          }}
        >
          <span>{footnote}</span>
          <span>aokltd.org/studio</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Space Grotesk', data: medium, weight: 500, style: 'normal' },
        { name: 'Space Grotesk', data: semibold, weight: 600, style: 'normal' },
      ],
    }
  );
}
