'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Reads the startup theme. Order of precedence:
 *  1. `data-theme` already set on <html> by the inline no-flash script in the
 *     root layout (avoids a flash of the wrong theme on reload).
 *  2. The user's previous explicit choice in `localStorage`.
 *  3. The operating system preference via `prefers-color-scheme`.
 *  4. Fallback to `light`.
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const domTheme = document.documentElement.dataset.theme as Theme | undefined;
  if (domTheme === 'light' || domTheme === 'dark') return domTheme;

  const saved = window.localStorage.getItem('theme') as Theme | null;
  if (saved === 'light' || saved === 'dark') return saved;

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(() => initialTheme ?? getInitialTheme());

  // Single place that applies the resolved theme to the DOM (globally) and
  // persists it. The `data-theme` on <html> drives the SCSS custom properties,
  // while `data-bs-theme` on <body> drives React Bootstrap. The theme is a
  // client-side preference (it only affects colors/CSS), so it is persisted in
  // localStorage only — no server-side cookie is needed.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.bsTheme = theme;
    document.body.dataset.bsTheme = theme;

    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  // Keep multiple open tabs in sync via the `storage` event.
  useEffect(() => {
    const onStorage = () => {
      const saved = window.localStorage.getItem('theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), []);
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
