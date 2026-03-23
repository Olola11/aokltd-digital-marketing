'use client';

import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  excerpt?: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttonClass =
    'font-sans text-sm text-[#00008B]/40 border border-[#00008B]/10 rounded-full px-4 py-2 hover:border-[#00008B] hover:text-[#00008B] transition-colors';

  return (
    <div className="border-t border-quill-500/10 pt-8 mt-12">
      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#00008B]/30 mb-4">
        Share this article
      </p>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            {link.name}
          </a>
        ))}
        <button onClick={handleCopy} className={buttonClass}>
          {copied ? 'Copied' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
