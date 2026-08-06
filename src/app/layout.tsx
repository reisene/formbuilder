import AppNavbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/hooks/useTheme';
import site from '@/config/site';
import '@/styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { Metadata, Viewport } from 'next';

import Script from 'next/script';
import { Noto_Sans } from 'next/font/google';
import { headers } from 'next/headers';

import lang from '@/config/lang';

export const metadata: Metadata = {
  title: site.meta.title,
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
    <html lang={lng}>
      <head>
        {/* No-flash theme: runs before paint. Reads the user's saved choice from
            localStorage, falling back to the OS preference, and applies it to
            <html> before React hydrates. ThemeProvider then takes over the state. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function () {
            try {
              var theme = localStorage.getItem('theme');
              if (theme !== 'light' && theme !== 'dark') {
                theme = window.matchMedia &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches
                  ? 'dark'
                  : 'light';
              }
              document.documentElement.dataset.theme = theme;
              document.body.dataset.bsTheme = theme;
            } catch (e) {}
          })();`}
        </Script>
      </head>
      <body className={notoSans.className}>
        <ThemeProvider>
          <AppNavbar />
          <main className="app-content">{children}</main>
          <Footer author={site.author} />
        </ThemeProvider>
      </body>
    </html>
  );
}
