'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { StudioServiceSlug } from '@/data/studio/services';
import { createBriefDraftStore } from '@/lib/studio/brief-draft';
import { EnquirySheet } from './enquiry-sheet';

interface EnquiryValue {
  isOpen: boolean;
  open: (service?: StudioServiceSlug) => void;
  close: () => void;
}

const EnquiryContext = createContext<EnquiryValue | null>(null);

/**
 * EnquiryProvider — owns the brief sheet so any button on any studio page
 * can open it, optionally with a service preselected. The draft survives
 * closing the sheet, so an accidental dismiss loses nothing.
 */
export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<StudioServiceSlug | undefined>();
  const [draft] = useState(createBriefDraftStore);
  // The sheet opens from many buttons, none of them a Radix trigger, so
  // focus is returned to whichever one opened it.
  const openerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((next?: StudioServiceSlug) => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setService(next);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const restoreFocus = useCallback((event: Event) => {
    event.preventDefault();
    openerRef.current?.focus();
  }, []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquirySheet
        open={isOpen}
        onOpenChange={setIsOpen}
        onCloseAutoFocus={restoreFocus}
        service={service}
        draft={draft}
      />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry(): EnquiryValue {
  const value = useContext(EnquiryContext);
  if (!value) throw new Error('useEnquiry must be used inside EnquiryProvider');
  return value;
}

/** Client button for server-rendered pages. */
export function StartBriefButton({
  service,
  className,
  children,
}: {
  service?: StudioServiceSlug;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useEnquiry();
  return (
    <button type="button" aria-haspopup="dialog" onClick={() => open(service)} className={className}>
      {children}
    </button>
  );
}
