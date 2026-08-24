import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as langModule from '@/config/lang';

const ORIGINAL_DOCUMENT = globalThis.document;
const ORIGINAL_NAVIGATOR = globalThis.navigator;

function restoreDocument() {
  Object.defineProperty(globalThis, 'document', {
    value: ORIGINAL_DOCUMENT,
    configurable: true,
    writable: true,
  });
}

function restoreNavigator() {
  Object.defineProperty(globalThis, 'navigator', {
    value: ORIGINAL_NAVIGATOR,
    configurable: true,
    writable: true,
  });
}

describe('getPreferredLanguage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    restoreNavigator();
  });

  it('returns en when navigator is undefined', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: undefined,
      configurable: true,
    });

    expect(langModule.getPreferredLanguage()).toBe('en');
  });

  it('returns the language from the first navigator.languages entry', () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['pl-PL', 'en-US']);

    expect(langModule.getPreferredLanguage()).toBe('pl');
  });

  it('handles a language without a region', () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['de']);

    expect(langModule.getPreferredLanguage()).toBe('de');
  });

  it('falls back to navigator.language when languages is empty', () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue([]);
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('fr-FR');

    expect(langModule.getPreferredLanguage()).toBe('fr');
  });

  it('falls back to navigator.language when navigator.languages is undefined', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        language: 'it-IT',
        languages: undefined,
      },
      configurable: true,
    });

    expect(langModule.getPreferredLanguage()).toBe('it');
  });

  it('falls back to navigator.language when navigator.languages is missing', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        language: 'es-ES',
      },
      configurable: true,
    });

    expect(langModule.getPreferredLanguage()).toBe('es');
  });

  it('returns en when Intl.Locale returns an empty language', () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['pl-PL']);

    const localeSpy = vi.spyOn(Intl, 'Locale').mockImplementation(function () {
      return { language: '' } as Intl.Locale;
    } as unknown as typeof Intl.Locale);

    expect(langModule.getPreferredLanguage()).toBe('en');

    localeSpy.mockRestore();
  });
  it('returns en when no language is available', () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue([]);
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('');

    expect(langModule.getPreferredLanguage()).toBe('en');
  });

  it('returns en when the first language-like value is empty', () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['']);
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('');

    expect(langModule.getPreferredLanguage()).toBe('en');
  });

  it('returns en for a syntactically invalid language tag', () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['en_US']);

    expect(langModule.getPreferredLanguage()).toBe('en');
  });

  it('returns en when Intl.Locale throws', () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['pl-PL']);

    const localeSpy = vi.spyOn(Intl, 'Locale').mockImplementation(function () {
      throw new RangeError('Invalid locale');
    } as unknown as typeof Intl.Locale);

    expect(langModule.getPreferredLanguage()).toBe('en');

    localeSpy.mockRestore();
  });
});

describe('hasClosedTranslationNotice', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    restoreDocument();
    document.cookie = 'translation_notice_closed=; Path=/; Max-Age=0';
    document.cookie = 'my_translation_notice_closed=; Path=/; Max-Age=0';
  });

  it('returns false when document is undefined', () => {
    Object.defineProperty(globalThis, 'document', {
      value: undefined,
      configurable: true,
    });

    expect(langModule.hasClosedTranslationNotice()).toBe(false);
  });

  it('returns false when the cookie does not exist', () => {
    expect(langModule.hasClosedTranslationNotice()).toBe(false);
  });

  it('returns true when the cookie value is true', () => {
    document.cookie = 'translation_notice_closed=true; Path=/';

    expect(langModule.hasClosedTranslationNotice()).toBe(true);
  });

  it('returns false when the cookie has another value', () => {
    document.cookie = 'translation_notice_closed=false; Path=/';

    expect(langModule.hasClosedTranslationNotice()).toBe(false);
  });

  it('does not match a similar cookie name', () => {
    document.cookie = 'my_translation_notice_closed=true; Path=/';

    expect(langModule.hasClosedTranslationNotice()).toBe(false);
  });

  it('returns true when there are multiple cookies and the target one is present', () => {
    document.cookie = 'theme=dark; Path=/';
    document.cookie = 'translation_notice_closed=true; Path=/';

    expect(langModule.hasClosedTranslationNotice()).toBe(true);
  });
});

describe('closeTranslationNotice', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    restoreDocument();
    document.cookie = 'translation_notice_closed=; Path=/; Max-Age=0';
  });

  it('does nothing when document is undefined', () => {
    Object.defineProperty(globalThis, 'document', {
      value: undefined,
      configurable: true,
    });

    expect(() => langModule.closeTranslationNotice()).not.toThrow();
  });

  it('sets the translation notice cookie', () => {
    langModule.closeTranslationNotice();

    expect(document.cookie).toContain('translation_notice_closed=true');
  });
});
