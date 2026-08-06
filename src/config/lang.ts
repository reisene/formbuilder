type HeadersGetter = () => Promise<Headers>;

async function lang(headers: HeadersGetter): Promise<string> {
  const acceptLanguage = (await headers()).get('accept-language');
  if (!acceptLanguage) return 'en';

  const first = acceptLanguage.split(',')[0];
  if (!first) return 'en';

  const tag = first.split(';')[0]?.trim();
  if (!tag) return 'en';

  try {
    // Intl.Locale safely extracts the two-letter language code (e.g. "en", "pl")
    return new Intl.Locale(tag).language || 'en';
  } catch {
    return 'en';
  }
}

export default lang;
