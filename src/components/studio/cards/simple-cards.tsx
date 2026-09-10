import Link from 'next/link';
import { STUDIO_PROJECTS } from '@/data/studio/projects';
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

export function CredentialCard() {
  return (
    <StudioCard label="Registered">
      <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
        <p className={`${display} tabular-nums`}>RC 1956161</p>
        <p className={`mt-3 max-w-[30ch] ${soft}`}>
          Apotheosis of Knowledge Limited, incorporated in Nigeria on 27 July 2022.
        </p>
        <Link href="/about/registration" className="mt-5 font-sans text-sm underline underline-offset-4 lg:text-[15px]">
          Verify our registration
        </Link>
      </div>
    </StudioCard>
  );
}

const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

export function ClientsCard() {
  const count = STUDIO_PROJECTS.length;
  return (
    <StudioCard label="Clients">
      <ul className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
        {STUDIO_PROJECTS.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/studio/work/${project.slug}`}
              className="font-sans text-2xl tracking-[-0.02em] underline-offset-4 hover:underline lg:text-3xl"
            >
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-center font-serif text-sm text-[var(--studio-ink-soft)] lg:text-base">
        {COUNT_WORDS[count] ?? count} {count === 1 ? 'site' : 'sites'} launched. More in progress.
      </p>
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
