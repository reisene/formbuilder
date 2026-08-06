import { describe, test, expect, vi } from 'vitest';
import lang from '@/config/lang';

function makeHeaders(a: string | null): () => Promise<Headers> {
  const get = vi.fn((key: string) => {
    if (key.toLowerCase() === 'accept-language') return a;
    return null;
  });
  return vi.fn(async () => ({ get }) as unknown as Headers);
}

describe('lang()', () => {
  test('returns "en" when accept-language is missing', async () => {
    expect(await lang(makeHeaders(null))).toBe('en');
  });

  test('returns "pl" for "pl-PL,pl;q=0.9,en;q=0.8"', async () => {
    expect(await lang(makeHeaders('pl-PL,pl;q=0.9,en;q=0.8'))).toBe('pl');
  });

  test('returns "en" for "en-US,en;q=0.9"', async () => {
    expect(await lang(makeHeaders('en-US,en;q=0.9'))).toBe('en');
  });

  test('falls back to "en" for an invalid locale tag', async () => {
    expect(await lang(makeHeaders('not-a-locale!!'))).toBe('en');
  });

  test('handles a q-factor only header by returning "en" (missing base tag)', async () => {
    // Header that starts with an empty segment after splitting on comma won't
    // normally occur; ensure we still never throw and fall back to "en".
    const first = ';q=0.9';
    const get = vi.fn(() => first);
    const headers = vi.fn(async () => ({ get }) as unknown as Headers);
    expect(await lang(headers)).toBe('en');
  });
});
