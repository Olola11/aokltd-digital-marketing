import { cn } from '@/lib/utils';

type Tone = 'plain' | 'accent';

const TONES: Record<Tone, string> = {
  plain: 'bg-[var(--studio-card)]',
  accent: 'bg-[var(--studio-accent-soft)]',
};

/** The hub's base tile: rounded, flat, with an outlined label pill at the top. */
export function StudioCard({
  label,
  tone = 'plain',
  className,
  children,
}: {
  label?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-[var(--studio-radius)] px-6 pb-7 pt-5 lg:px-8 lg:pb-9 lg:pt-6',
        TONES[tone],
        className
      )}
    >
      {label && (
        <div className="relative z-20 flex justify-center">
          <span className="studio-pill">{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}
