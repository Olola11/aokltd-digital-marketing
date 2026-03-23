'use client';

import { useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (items.length < 3) return null;

  return (
    <nav
      className="border border-[#00008B]/10 rounded-md p-5 mb-8 bg-[#00008B]/[0.02]"
      aria-label="Table of contents"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full"
        aria-expanded={isExpanded}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#00008B]/30">
          In this article ({items.length} sections)
        </span>
        <svg
          className={`w-4 h-4 text-[#00008B]/30 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isExpanded && (
        <ol className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="font-serif text-sm text-[#00008B]/50 hover:text-[#00008B] transition-colors block py-1"
                style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
