const TRANSLATION_NOTICE_COOKIE = 'translation_notice_closed';

export function getPreferredLanguage(): string {
  if (typeof navigator === 'undefined') return 'en';

  const languages =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];

  const first = languages.find(Boolean);
  if (!first) return 'en';

  try {
    return new Intl.Locale(first).language || 'en';
  } catch {
    return 'en';
  }
}

export function hasClosedTranslationNotice(): boolean {
  if (typeof document === 'undefined') return false;

  return document.cookie
    .split('; ')
    .some((cookie) => cookie.startsWith(`${TRANSLATION_NOTICE_COOKIE}=true`));
}

export function closeTranslationNotice() {
  if (typeof document === 'undefined') return;

  document.cookie = `${TRANSLATION_NOTICE_COOKIE}=true; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
}
