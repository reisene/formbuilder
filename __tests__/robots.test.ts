import { afterEach, describe, expect, it } from 'vitest';
import robots from '@/app/robots';

const ORIGINAL_VERCEL_ENV = process.env.VERCEL_ENV;
const ORIGINAL_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;

afterEach(() => {
  if (ORIGINAL_VERCEL_ENV === undefined) {
    delete process.env.VERCEL_ENV;
  } else {
    process.env.VERCEL_ENV = ORIGINAL_VERCEL_ENV;
  }

  if (ORIGINAL_PRODUCTION_URL === undefined) {
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
  } else {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = ORIGINAL_PRODUCTION_URL;
  }
});

describe('robots', () => {
  it('disallows indexing outside production', () => {
    process.env.VERCEL_ENV = 'preview';
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;

    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    });
  });

  it('returns production rules and sitemap', () => {
    process.env.VERCEL_ENV = 'production';
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'example.vercel.app';

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
    process.env.VERCEL_ENV = 'production';
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;

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
