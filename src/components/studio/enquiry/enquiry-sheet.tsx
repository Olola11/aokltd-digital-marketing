'use client';

import { useEffect } from 'react';
import { Drawer } from 'vaul';
import { X } from 'lucide-react';
import type { StudioServiceSlug } from '@/data/studio/services';
import type { BriefDraftStore } from '@/lib/studio/brief-draft';
import { useStudioMotion } from '../motion/studio-motion';
import { BriefForm } from './brief-form';

/**
 * EnquirySheet — the brief rises from the bottom over a dimmed page, and its
 * sentence fades in a beat later. Vaul provides the focus trap, Escape to
 * close, and swipe-to-dismiss on touch screens.
 */
export function EnquirySheet({
  open,
  onOpenChange,
  onCloseAutoFocus,
  service,
  draft,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseAutoFocus: (event: Event) => void;
  service?: StudioServiceSlug;
  draft: BriefDraftStore;
}) {
  const { stopScroll, startScroll } = useStudioMotion();

  useEffect(() => {
    if (open) stopScroll();
    else startScroll();
  }, [open, stopScroll, startScroll]);

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-[#0b1033]/55" />
        <Drawer.Content
          aria-describedby="brief-sheet-description"
          onCloseAutoFocus={onCloseAutoFocus}
          className="studio-tokens fixed inset-x-0 bottom-0 z-[61] mx-auto flex max-h-[94dvh] w-full max-w-6xl flex-col rounded-t-[28px] bg-[var(--studio-accent-soft)] text-[var(--studio-ink)] outline-none"
        >
          <div aria-hidden="true" className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-[var(--studio-ink-faint)]" />
          <Drawer.Close className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-sans text-sm transition-colors duration-200 hover:bg-white/60 lg:right-6 lg:top-6 lg:text-[15px]">
            <X className="h-4 w-4" aria-hidden="true" />
            Close
          </Drawer.Close>

          <div data-lenis-prevent className="overflow-y-auto overscroll-contain px-6 pb-12 pt-8 sm:px-12 lg:px-20 lg:pb-16 lg:pt-12">
            <Drawer.Title className="font-sans text-xl lg:text-2xl">Start a brief</Drawer.Title>
            <Drawer.Description
              id="brief-sheet-description"
              className="mt-2 max-w-xl font-serif text-base text-[var(--studio-ink-soft)] lg:text-lg"
            >
              Complete the sentence below. It takes about a minute, and we reply by email.
            </Drawer.Description>
            <BriefForm preselect={service} draft={draft} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
