import { OG_CONTENT_TYPE, OG_SIZE, studioOgImage } from '@/lib/studio/og';
import { getStudioProject } from '@/data/studio/projects';

export const alt = 'AOK Studio case study';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getStudioProject(slug);
  return studioOgImage({
    eyebrow: 'Case study',
    title: project ? `${project.name}: ${project.summary}` : 'AOK Studio',
    footnote: project?.displayUrl ?? 'Lagos, Nigeria',
  });
}
