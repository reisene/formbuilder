import { afterEach, describe, expect, it, vi } from 'vitest';
import robots from '@/app/robots';

describe('robots', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns robots rules for production', () => {
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'example.vercel.app');

    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '*/_next/'],
      },
      sitemap: 'https://example.vercel.app/sitemap.xml',
    });
  });

  it('uses localhost when production URL is not defined', () => {
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', undefined);

    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '*/_next/'],
      },
      sitemap: 'http://localhost:3000/sitemap.xml',
    });
  });
});
