const PHRASES = [
  'ELEVATING CURIOSITY',
  'COUNTERING NOISE',
  'ARCHITECTING TRUTH',
];

export function InfiniteTicker() {
  return (
    <div
      className="w-full overflow-hidden border-t border-[#00008B]/10 py-3 sm:py-4"
      aria-hidden="true"
    >
      <div className="flex animate-ticker">
        {/* Two identical sets for seamless infinite loop */}
        {[0, 1].map((set) => (
          <div key={set} className="flex shrink-0">
            {Array.from({ length: 5 }, (_, r) =>
              PHRASES.map((phrase, i) => (
                <span
                  key={`${set}-${r}-${i}`}
                  className="font-sans text-[11px] sm:text-xs text-quill-500 tracking-[0.2em] mx-3 sm:mx-5 whitespace-nowrap"
                >
                  {phrase} &bull;
                </span>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
