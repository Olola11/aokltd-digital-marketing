'use client';

import { useState, FormEvent } from 'react';
import { cn } from '@/lib/utils';

export function ProspectusContact() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    // TODO: Connect to backend API for prospectus request
    // POST /api/prospectus-request { email }
    setSubmitted(true);
  };

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitted}
          placeholder="your@email.com"
          className={cn(
            'flex-1 px-4 py-3 bg-white border font-sans text-sm text-royal-800',
            'placeholder:text-royal-800/30',
            'transition-colors duration-200',
            'focus:outline-none focus:border-quill-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            submitted ? 'border-royal-800/20' : 'border-royal-800',
          )}
        />
        <button
          type="submit"
          disabled={submitted}
          className={cn(
            'px-6 py-3 font-sans text-sm font-medium uppercase tracking-[0.1em]',
            'transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-quill-500 focus-visible:ring-offset-2',
            submitted
              ? 'bg-royal-800/80 text-white cursor-default'
              : 'bg-royal-800 text-white hover:bg-royal-900',
          )}
        >
          {submitted ? (
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
              REQUEST SENT
            </span>
          ) : (
            'REQUEST ACCESS'
          )}
        </button>
      </form>
    </div>
  );
}
