'use client';

import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { SHOWCASE_SERVICES } from '@/data/showcase-data';

interface ProjectEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export function ProjectEnquiryModal({
  isOpen,
  onClose,
  preselectedService,
}: ProjectEnquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : ['Web Design']
  );
  const [timeline, setTimeline] = useState('1–2 Months');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync preselectedService during render if prop changed
  const [prevService, setPrevService] = useState(preselectedService);
  if (preselectedService !== prevService) {
    setPrevService(preselectedService);
    if (preselectedService && !selectedServices.includes(preselectedService)) {
      setSelectedServices((prev) => [...prev, preselectedService]);
    }
  }

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Send to existing contact API
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: `Creative Project Enquiry: ${company || name} [${selectedServices.join(', ')}]`,
          message: `Client: ${name} (${company || 'Direct'})\nEmail: ${email}\nServices Needed: ${selectedServices.join(', ')}\nTimeline: ${timeline}\n\nProject Brief:\n${message}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        // Fallback: mailto link
        window.location.href = `mailto:hello@aokltd.org?subject=Project%20Enquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(
          `Hi AOK Studio,\n\nName: ${name}\nCompany: ${company}\nServices: ${selectedServices.join(', ')}\nTimeline: ${timeline}\n\nProject Brief:\n${message}`
        )}`;
        setStatus('success');
      }
    } catch {
      // Fallback to mailto
      window.location.href = `mailto:hello@aokltd.org?subject=Project%20Enquiry%20from%20${encodeURIComponent(name)}`;
      setStatus('success');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#000066]/60 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#00008A]/10 p-6 md:p-10 text-[#00008A] showcase-scroll"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close enquiry modal"
          className="absolute top-5 right-5 p-2 rounded-full text-[#00008A]/50 hover:text-[#00008A] hover:bg-[#EEF0FB] transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-[#EEF0FB] text-[#4A8FE1] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-[#00008A] mb-3">
              Enquiry Received
            </h3>
            <p className="font-serif text-[#00008A]/70 max-w-md mx-auto leading-relaxed mb-8">
              Thank you for considering AOK Ltd. Our creative direction team will review your project brief and respond within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#00008A] text-white font-sans text-sm font-medium rounded-full hover:bg-[#000066] transition-colors"
            >
              Return to Showcase
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <span className="font-sans text-[11px] font-semibold tracking-[0.25em] text-[#4A8FE1] uppercase">
                Start a Conversation
              </span>
              <h2
                id="enquiry-modal-title"
                className="font-sans text-2xl md:text-3xl font-bold text-[#00008A] mt-2 tracking-tight"
              >
                Let’s create something extraordinary.
              </h2>
              <p className="font-serif text-sm md:text-base text-[#00008A]/60 mt-2 leading-relaxed">
                Tell us about your brand, your objectives, and what you want to achieve. We work with clients who value craftsmanship and strategic clarity.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection Pills */}
              <div>
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#00008A]/70 mb-2.5">
                  Capabilities Needed (Select All That Apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {SHOWCASE_SERVICES.map((s) => {
                    const isSelected = selectedServices.includes(s.name);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleService(s.name)}
                        className={`font-sans text-xs px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#00008A] text-white border-[#00008A] shadow-sm'
                            : 'bg-white text-[#00008A]/70 border-[#00008A]/15 hover:border-[#4A8FE1]'
                        }`}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="client-name"
                    className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#00008A]/70 mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="client-name"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Adebayo Ogunlesi"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#00008A]/15 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4A8FE1] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="client-email"
                    className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#00008A]/70 mb-1.5"
                  >
                    Work Email *
                  </label>
                  <input
                    id="client-email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#00008A]/15 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4A8FE1] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Company & Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="client-company"
                    className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#00008A]/70 mb-1.5"
                  >
                    Brand / Company
                  </label>
                  <input
                    id="client-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company or venture name"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#00008A]/15 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#4A8FE1] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="client-timeline"
                    className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#00008A]/70 mb-1.5"
                  >
                    Target Timeline
                  </label>
                  <select
                    id="client-timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#00008A]/15 font-sans text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4A8FE1] focus:border-transparent transition-all"
                  >
                    <option value="Urgent (< 1 Month)">Urgent (&lt; 1 Month)</option>
                    <option value="1–2 Months">1–2 Months</option>
                    <option value="3–6 Months">3–6 Months</option>
                    <option value="Exploratory">Exploratory / Advisory</option>
                  </select>
                </div>
              </div>

              {/* Project Brief */}
              <div>
                <label
                  htmlFor="client-message"
                  className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#00008A]/70 mb-1.5"
                >
                  Project Brief &amp; Context
                </label>
                <textarea
                  id="client-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are building, the problem you need solved, or any key references you admire..."
                  className="w-full px-4 py-3 rounded-xl border border-[#00008A]/15 font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#4A8FE1] focus:border-transparent transition-all"
                />
              </div>

              {/* Submit & direct email */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="mailto:hello@aokltd.org?subject=Direct%20Creative%20Enquiry"
                  className="inline-flex items-center gap-2 font-sans text-xs text-[#00008A]/60 hover:text-[#00008A] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#4A8FE1]" />
                  Or email directly: hello@aokltd.org
                </a>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#00008A] text-white font-sans text-sm font-semibold rounded-full hover:bg-[#000066] active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-50"
                >
                  <span>{status === 'submitting' ? 'Submitting...' : 'Send Enquiry'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
