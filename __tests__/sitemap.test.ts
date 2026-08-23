import { afterEach, describe, expect, it, vi } from 'vitest';
import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it('returns all expected URLs in production', () => {
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'example.vercel.app');

    const result = sitemap();

    expect(result).toHaveLength(4);

    expect(result.map((entry) => entry.url)).toEqual([
      'https://example.vercel.app',
      'https://example.vercel.app/editor',
      'https://example.vercel.app/docs',
      'https://example.vercel.app/about',
    ]);
  });

  it('uses localhost when production URL is not defined', () => {
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', undefined);

    const result = sitemap();

    expect(result.map((entry) => entry.url)).toEqual([
      'http://localhost:3000',
      'http://localhost:3000/editor',
      'http://localhost:3000/docs',
      'http://localhost:3000/about',
    ]);
  });

  it('returns the expected sitemap metadata', () => {
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'example.vercel.app');

    vi.useFakeTimers();
    const now = new Date('2026-08-23T12:00:00.000Z');
    vi.setSystemTime(now);

    expect(sitemap()).toEqual([
      {
        url: 'https://example.vercel.app',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 1,
      },
      {
        url: 'https://example.vercel.app/editor',
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: 'https://example.vercel.app/docs',
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: 'https://example.vercel.app/about',
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.5,
      },
    ]);
  });
});
