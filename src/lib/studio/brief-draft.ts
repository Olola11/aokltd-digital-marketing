import type { BriefInput } from './brief-schema';

/**
 * Holds an unsent brief while the sheet is closed (the sheet unmounts its
 * form), so an accidental dismiss loses nothing. Plain storage, deliberately
 * outside React state: writing on every keystroke must not re-render the page.
 */
export interface BriefDraftStore {
  read(): Partial<BriefInput>;
  write(values: Partial<BriefInput>): void;
  clear(): void;
}

export function createBriefDraftStore(): BriefDraftStore {
  let values: Partial<BriefInput> = {};
  return {
    read: () => values,
    write: (next) => {
      values = next;
    },
    clear: () => {
      values = {};
    },
  };
}
