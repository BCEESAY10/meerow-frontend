export function formatReadTime(minutes: number): string {
  if (minutes < 1) return "< 1 min read";
  return `~${minutes} min read`;
}

export function calculateReadTime(content: string): number {
  const WORDS_PER_MINUTE = 200;
  // Strip HTML tags
  const text = content.replace(/<[^>]+>/g, "");
  // Count words
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  // Calculate minutes
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}
