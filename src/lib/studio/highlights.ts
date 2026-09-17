import { VAULT_DATA } from '@/lib/vault-data';
import { nigerianFacts } from '@/data/nigerian-facts';

/**
 * Figures shown on case study pages. Counts come from live data where we
 * have it, so they never go stale. Server-only: imports the Vault content.
 */
export function getProjectHighlights(slug: string): { value: string; label: string }[] {
  switch (slug) {
    case 'aokltd':
      return [
        { value: String(VAULT_DATA.length), label: 'long-form research articles in the Vault' },
        { value: String(nigerianFacts.length), label: 'sourced facts in the random fact generator' },
        { value: '2', label: 'typefaces carrying the entire system' },
      ];
    case 'arsom-global':
      return [
        { value: '3', label: 'services, each with its own way in' },
        { value: '4', label: 'places a building’s power goes, named before anything is sold' },
        { value: '4', label: 'kinds of building addressed, from duplexes to factories' },
      ];
    case 'gorille-and-co':
      return [
        { value: '6', label: 'case studies, each led by its headline result' },
        { value: '5', label: 'core sections, from capabilities to insights' },
      ];
    default:
      return [];
  }
}
