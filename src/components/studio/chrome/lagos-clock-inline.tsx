'use client';

import { useLagosTime } from '../hooks/use-lagos-time';

export function LagosClockInline() {
  const lagos = useLagosTime();
  return (
    <p className="text-right tabular-nums">
      {lagos ? `${lagos.time} in Lagos` : 'Lagos, Nigeria'}
    </p>
  );
}
