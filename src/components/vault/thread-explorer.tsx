import { VAULT_DATA } from '@/lib/vault-data';
import { VaultLink } from './vault-link';
import type { VaultEntry } from '@/types';

interface Thread {
  title: string;
  description: string;
  articles: VaultEntry[];
}

function buildThreads(): Thread[] {
  const threads: Thread[] = [];

  // Thread 1: West African Heritage
  const beninBronzes = VAULT_DATA.find((e) => e.slug === 'lost-benin-bronzes');
  const igboUkwu = VAULT_DATA.find((e) => e.slug === 'igbo-ukwu-metallurgy');
  const orishas = VAULT_DATA.find((e) => e.slug === 'yoruba-cosmology');
  if (beninBronzes && igboUkwu && orishas) {
    threads.push({
      title: 'West African Heritage',
      description: 'West African artistic heritage across centuries',
      articles: [beninBronzes, igboUkwu, orishas],
    });
  }

  // Thread 2: Unsolved Codes
  const zodiac = VAULT_DATA.find((e) => e.slug === 'cipher-of-zodiac');
  const voynich = VAULT_DATA.find((e) => e.slug === 'voynich-manuscript');
  if (zodiac && voynich) {
    threads.push({
      title: 'Unsolved Codes',
      description: 'Ciphers and scripts that resisted decryption for decades',
      articles: [zodiac, voynich],
    });
  }

  // Thread 3: Unexplained Phenomena
  const sleepers = VAULT_DATA.find((e) => e.slug === 'sleepers-of-kalachi');
  const redRain = VAULT_DATA.find((e) => e.slug === 'red-rain-of-kerala');
  const dancing = VAULT_DATA.find((e) => e.slug === 'dancing-plague');
  if (sleepers && redRain && dancing) {
    threads.push({
      title: 'Unexplained Phenomena',
      description: 'Events that science struggled to explain',
      articles: [dancing, redRain, sleepers],
    });
  }

  return threads;
}

export function ThreadExplorer() {
  const threads = buildThreads();

  if (threads.length < 2) return null;

  return (
    <section className="px-4 sm:px-6 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-sans text-xs sm:text-sm font-medium text-quill-500 uppercase tracking-[0.25em]">
            Follow a Thread
          </span>
        </div>
        <p className="font-serif text-sm text-[#00008B]/50 mb-6">
          Curated pathways through connected knowledge.
        </p>

        {/* Desktop: horizontal chains */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {threads.map((thread) => (
            <VaultLink
              key={thread.title}
              href={`/vault/${thread.articles[0].category}/${thread.articles[0].slug}`}
              className="group block border border-[#00008B]/10 rounded-md p-5 hover:-translate-y-1 hover:shadow-sm transition-all duration-300 ease-out"
            >
              <h3 className="font-sans text-sm font-semibold text-[#00008B] mb-2">
                {thread.title}
              </h3>
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {thread.articles.map((article, i) => (
                  <span key={article.slug} className="flex items-center gap-1.5">
                    <span className="font-sans text-[10px] text-[#00008B]/50 truncate max-w-[120px]">
                      {article.title}
                    </span>
                    {i < thread.articles.length - 1 && (
                      <span className="text-[#00008B]/20 text-xs">&rarr;</span>
                    )}
                  </span>
                ))}
              </div>
              <p className="font-serif text-xs text-gray-500 italic">
                {thread.description}
              </p>
              <span className="font-sans text-[10px] text-quill-500 uppercase tracking-wider mt-3 block group-hover:translate-x-1 transition-transform">
                {thread.articles.length} articles &rarr;
              </span>
            </VaultLink>
          ))}
        </div>

        {/* Mobile: compact cards */}
        <div className="md:hidden space-y-3">
          {threads.map((thread) => (
            <VaultLink
              key={thread.title}
              href={`/vault/${thread.articles[0].category}/${thread.articles[0].slug}`}
              className="flex items-center justify-between border border-[#00008B]/10 rounded-md p-4"
            >
              <div className="min-w-0">
                <h3 className="font-sans text-sm font-semibold text-[#00008B] mb-0.5">
                  {thread.title}
                </h3>
                <p className="font-serif text-xs text-gray-500">
                  {thread.articles.length} articles
                </p>
              </div>
              <span className="text-[#00008B]/20 text-lg flex-shrink-0 ml-3">&rarr;</span>
            </VaultLink>
          ))}
        </div>
      </div>
    </section>
  );
}
