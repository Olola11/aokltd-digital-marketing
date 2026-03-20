const COOKIE_NAME = 'aok_vault_read';
const MAX_AGE = 31536000; // 365 days

export function getReadArticles(): string[] {
  if (typeof document === 'undefined') return [];
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
  } catch {
    return [];
  }
}

export function markAsRead(slug: string): void {
  if (typeof document === 'undefined') return;
  const read = getReadArticles();
  if (!read.includes(slug)) {
    read.push(slug);
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(read))}; max-age=${MAX_AGE}; path=/; SameSite=Lax`;
  }
}

export function isRead(slug: string): boolean {
  return getReadArticles().includes(slug);
}

export function getReadCount(): number {
  return getReadArticles().length;
}

export function getCategoryReadCount(articleSlugs: string[]): number {
  const read = getReadArticles();
  return articleSlugs.filter((slug) => read.includes(slug)).length;
}
