'use client';

import { useSyncExternalStore } from 'react';

/** West Africa Time is UTC+1 all year; Nigeria has no daylight saving. */
const LAGOS_OFFSET_MINUTES = 60;

function subscribe(callback: () => void) {
  let timer: number;
  const schedule = () => {
    // Wake at the top of each minute rather than polling.
    timer = window.setTimeout(() => {
      callback();
      schedule();
    }, 60_000 - (Date.now() % 60_000) + 25);
  };
  schedule();
  return () => window.clearTimeout(timer);
}

const getSnapshot = () => Math.floor(Date.now() / 60_000);
const getServerSnapshot = () => null;

const timeFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Africa/Lagos',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

function describeGap(diffMinutes: number): string {
  if (diffMinutes === 0) return 'We’re on the same time as you.';
  const abs = Math.abs(diffMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  const span = [hours ? `${hours} hour${hours === 1 ? '' : 's'}` : '', minutes ? `${minutes} minutes` : '']
    .filter(Boolean)
    .join(' ');
  return diffMinutes > 0 ? `We’re ${span} ahead of you.` : `We’re ${span} behind you.`;
}

export interface LagosTime {
  /** e.g. "3:17 PM" */
  time: string;
  /** e.g. "We’re 4 hours ahead of you." */
  gap: string;
}

/** Current time in Lagos and how it relates to the visitor's clock. Null during server render. */
export function useLagosTime(): LagosTime | null {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (minute === null) return null;

  const now = new Date(minute * 60_000);
  const visitorOffset = -now.getTimezoneOffset();
  return {
    time: timeFormat.format(now),
    gap: describeGap(LAGOS_OFFSET_MINUTES - visitorOffset),
  };
}
