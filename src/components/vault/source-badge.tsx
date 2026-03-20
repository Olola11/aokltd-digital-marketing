export function DepthIndicator({ sourceCount }: { sourceCount: number }) {
  const tier = sourceCount >= 13 ? 3 : sourceCount >= 6 ? 2 : 1;
  const label = tier === 3 ? 'Deep Dive' : tier === 2 ? 'Investigation' : 'Brief';

  return (
    <div className="flex items-center gap-1" title={`${sourceCount} sources cited`}>
      <div className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-1 h-3 rounded-sm ${
              i <= tier ? 'bg-[#00008B]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="font-sans text-[10px] text-gray-400 uppercase tracking-wider ml-1">
        {label}
      </span>
    </div>
  );
}

export function SourceBadge({ sourceCount }: { sourceCount: number }) {
  if (!sourceCount) return null;

  return (
    <div className="flex items-center gap-1">
      <svg
        className="w-3 h-3 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
      <span className="font-sans text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">
        {sourceCount} sources
      </span>
    </div>
  );
}

export function ArticleSourceDisplay({ sourceCount }: { sourceCount: number }) {
  if (!sourceCount) return null;

  const tier = sourceCount >= 13 ? 3 : sourceCount >= 6 ? 2 : 1;
  const label = tier === 3 ? 'Deep Dive' : tier === 2 ? 'Investigation' : 'Brief';

  return (
    <div className="flex items-center gap-3 mt-3">
      <span className="font-sans text-sm text-[#00008B]/50">
        {sourceCount} sources cited
      </span>
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1 h-3 rounded-sm ${
                i <= tier ? 'bg-[#00008B]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="font-sans text-[10px] text-gray-400 uppercase tracking-wider ml-1">
          {label}
        </span>
      </div>
    </div>
  );
}
