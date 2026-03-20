import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Apotheosis of Knowledge',
    short_name: 'AOK',
    description: 'A Nigerian knowledge initiative producing research-driven content for the endlessly curious.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#00008B',
    icons: [
      // TODO: Create icon-192.png and icon-512.png from AOK logo
      // { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      // { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
