import { OG_CONTENT_TYPE, OG_SIZE, studioOgImage } from '@/lib/studio/og';
import { getStudioService } from '@/data/studio/services';

export const alt = 'AOK Studio service';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getStudioService(slug);
  return studioOgImage({
    eyebrow: 'Service',
    title: service?.h1 ?? 'AOK Studio',
    footnote: service?.name ?? 'Lagos, Nigeria',
  });
}
