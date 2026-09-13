import { StartBriefButton } from '../enquiry/enquiry-provider';
import { primaryButton } from '../ui/buttons';
import { StudioCard } from './studio-card';

const soft = 'font-serif text-base text-[var(--studio-ink-soft)] lg:text-lg';
const display = 'font-sans text-4xl tracking-[-0.02em] lg:text-5xl';

export function StatementCard() {
  return (
    <StudioCard label="About" className="min-h-[340px] lg:min-h-[440px]">
      <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
        <h1 className="max-w-[17ch] font-sans text-[28px] leading-[1.12] tracking-[-0.02em] lg:text-[34px]">
          A Lagos creative studio for companies whose work deserves better than noise.
        </h1>
        <p className={`mt-5 max-w-[34ch] ${soft}`}>
          Websites, brand identities, motion, copy and ghostwriting, from the team behind Apotheosis of Knowledge.
        </p>
      </div>
    </StudioCard>
  );
}

export function MethodCard() {
  return (
    <StudioCard label="Method">
      <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
        <p className={display}>
          Noise <span aria-hidden="true">→</span>
          <span className="sr-only">to</span> Order
        </p>
        <p className={`mt-4 max-w-[32ch] ${soft}`}>
          We research before we design, and design before we build. Anything that doesn’t help people understand
          you is removed.
        </p>
      </div>
    </StudioCard>
  );
}

export function BriefCard() {
  return (
    <StudioCard label="Next" tone="accent">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10 text-center">
        <p className="max-w-[16ch] font-sans text-3xl leading-[1.1] tracking-[-0.02em] lg:text-4xl">
          This space is reserved for your project.
        </p>
        <StartBriefButton className={primaryButton}>Start a brief</StartBriefButton>
      </div>
    </StudioCard>
  );
}
