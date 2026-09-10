/** "10 Sept 2026" — used wherever a Lighthouse measurement date is shown. */
export function formatMeasuredDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
