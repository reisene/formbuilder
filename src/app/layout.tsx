import AppNavbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/hooks/useTheme';
import ThemeInit from '@/hooks/themeInit';
import site from '@/config/site';
import '@/styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Noto_Sans } from 'next/font/google';
import { headers } from 'next/headers';

import lang from '@/config/lang';

export const metadata: Metadata = {
  title: {
    template: `%s | ${site.meta.title}`,
    default: site.meta.title,
  },
  description: site.meta.description,
  metadataBase: new URL(site.url),
  authors: [{ name: site.author.name, url: site.author.url }],
  publisher: site.author.name,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: site.url,
    images: [
      {
        url: site.meta.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/ico/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/ico/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/ico/android-chrome-512x512.png',
      },
      {
        rel: 'icon',
        url: 'ico/favicon-16x16.png',
        sizes: '16x16',
      },
      {
        rel: 'icon',
        url: '/ico/favicon-32x32.png',
        sizes: '32x32',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lng = await lang(headers);

  return (
    <html lang={lng} suppressHydrationWarning>
      <body className={notoSans.className} suppressHydrationWarning>
        <ThemeInit />
        <ThemeProvider>
          <AppNavbar />
          <main className="app-content">{children}</main>
          <Footer author={site.author} />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
