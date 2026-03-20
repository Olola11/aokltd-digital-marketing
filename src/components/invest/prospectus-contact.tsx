'use client';

import { useState, useSyncExternalStore, FormEvent } from 'react';
import { cn } from '@/lib/utils';

function generateFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('fingerprint', 2, 2);
    }
    const data = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
    ].join('|');

    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  } catch {
    // Fallback for browsers with canvas fingerprint protection (Firefox, Brave)
    const data = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
    ].join('|');
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export function ProspectusContact() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const emptySubscribe = () => () => {};
  const alreadyRequested = useSyncExternalStore(
    emptySubscribe,
    () => getCookie('prospectus_requested') === '1',
    () => false
  );

  // Initialize status when cookie indicates previous submission
  const [prevRequested, setPrevRequested] = useState(alreadyRequested);
  if (alreadyRequested && !prevRequested) {
    setPrevRequested(true);
    setStatus('success');
    setSuccessMessage('You have already requested the prospectus. Check your email.');
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || status === 'sending' || status === 'success') return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const fingerprint = generateFingerprint();

      const res = await fetch('/api/prospectus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), fingerprint }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      // Success
      setStatus('success');
      setSuccessMessage(data.message || 'Request received.');
      document.cookie = 'prospectus_requested=1; max-age=31536000; path=/; SameSite=Lax; Secure';
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const isDisabled = status === 'success' || status === 'sending' || alreadyRequested;

  return (
    <div className="max-w-[540px] mx-auto text-center">
      <h2 className="font-sans text-2xl md:text-3xl font-semibold text-royal-800 mb-3">
        Request the Full Prospectus
      </h2>

      <p className="font-serif text-sm text-royal-800/60 leading-relaxed mb-8">
        Enter your email to receive our strategic overview and partnership framework.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <label className="sr-only" htmlFor="prospectus-email">
          Email address
        </label>
        <input
          id="prospectus-email"
          type="email"
          required
          aria-required="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isDisabled}
          placeholder="your@email.com"
          className={cn(
            'flex-1 px-4 py-3 bg-white border font-sans text-sm text-royal-800',
            'placeholder:text-royal-800/30',
            'transition-colors duration-200',
            'focus:outline-none focus:border-quill-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isDisabled ? 'border-royal-800/20' : 'border-royal-800',
          )}
        />
        <button
          type="submit"
          disabled={isDisabled}
          aria-live="polite"
          className={cn(
            'px-6 py-3 font-sans text-sm font-medium uppercase tracking-[0.1em]',
            'transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-quill-500 focus-visible:ring-offset-2',
            status === 'success'
              ? 'bg-royal-800/80 text-white cursor-default'
              : status === 'sending'
                ? 'bg-royal-800/60 text-white cursor-wait'
                : 'bg-royal-800 text-white hover:bg-royal-900',
          )}
        >
          {status === 'success' ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8.5L6.5 12L13 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              REQUEST RECEIVED
            </span>
          ) : status === 'sending' ? (
            <span className="animate-pulse">SENDING...</span>
          ) : (
            'REQUEST ACCESS'
          )}
        </button>
      </form>

      {/* Success message */}
      {status === 'success' && successMessage && (
        <p role="status" className="mt-4 font-sans text-sm text-royal-800/60 animate-in fade-in duration-300">
          {successMessage}
        </p>
      )}

      {/* Error message */}
      {status === 'error' && errorMessage && (
        <p role="alert" className="mt-4 font-sans text-sm text-red-500 animate-in fade-in duration-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
