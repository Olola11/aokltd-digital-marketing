'use client';

import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormState('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setFormState('success');
      form.reset();
      setTimeout(() => setFormState('idle'), 4000);
    } catch {
      setFormState('error');
      setErrorMessage('Could not reach the server. Please check your connection and try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block font-sans text-sm font-medium text-[#00008B] mb-2"
        >
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-required="true"
          placeholder="Full name"
          className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 font-sans text-base text-[#00008B] placeholder:text-gray-400 focus:outline-none focus:border-quill-500 focus:ring-1 focus:ring-quill-500/20 transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block font-sans text-sm font-medium text-[#00008B] mb-2"
        >
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-required="true"
          placeholder="you@example.com"
          className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 font-sans text-base text-[#00008B] placeholder:text-gray-400 focus:outline-none focus:border-quill-500 focus:ring-1 focus:ring-quill-500/20 transition-colors"
        />
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block font-sans text-sm font-medium text-[#00008B] mb-2"
        >
          What is this regarding?
        </label>
        <select
          id="subject"
          name="subject"
          required
          aria-required="true"
          defaultValue=""
          className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 font-sans text-base text-[#00008B] focus:outline-none focus:border-quill-500 focus:ring-1 focus:ring-quill-500/20 transition-colors appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2300008B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
        >
          <option value="" disabled>
            Select a topic
          </option>
          <option value="partnership">Partnership enquiry</option>
          <option value="editorial">Editorial / Content</option>
          <option value="press">Press / Media</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block font-sans text-sm font-medium text-[#00008B] mb-2"
        >
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={6}
          placeholder="Tell us what's on your mind..."
          className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 font-sans text-base text-[#00008B] placeholder:text-gray-400 focus:outline-none focus:border-quill-500 focus:ring-1 focus:ring-quill-500/20 transition-colors resize-y min-h-[160px]"
        />
      </div>

      {/* Error message */}
      {formState === 'error' && (
        <p role="alert" className="font-sans text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === 'submitting' || formState === 'success'}
        aria-live="polite"
        className={`w-full py-3.5 rounded-md font-sans font-medium text-sm uppercase tracking-[0.1em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-quill-500 focus-visible:ring-offset-2 active:scale-[0.98] ${
          formState === 'success'
            ? 'bg-[#00008B]/80 text-white cursor-default'
            : formState === 'submitting'
              ? 'bg-[#00008B]/60 text-white/70 cursor-wait'
              : 'bg-[#00008B] text-white hover:bg-[#00008B]/90'
        }`}
      >
        {formState === 'success' ? (
          <span className="inline-flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Message Sent
          </span>
        ) : formState === 'submitting' ? (
          'Sending...'
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
