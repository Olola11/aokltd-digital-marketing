'use client';

import { useState } from 'react';

// TODO: Connect to backend — API route, email service (e.g., Resend, SendGrid), or form provider (e.g., Formspree)

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
          rows={6}
          placeholder="Tell us what's on your mind..."
          className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 font-sans text-base text-[#00008B] placeholder:text-gray-400 focus:outline-none focus:border-quill-500 focus:ring-1 focus:ring-quill-500/20 transition-colors resize-y min-h-[160px]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`w-full py-3.5 rounded-md font-sans font-medium text-sm uppercase tracking-[0.1em] transition-colors ${
          submitted
            ? 'bg-[#00008B]/80 text-white'
            : 'bg-[#00008B] text-white hover:bg-[#00008B]/90'
        }`}
      >
        {submitted ? (
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
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Message Sent
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
