'use client';

import { BsMoon, BsSun } from 'react-icons/bs';
import useTheme from '@/hooks/useTheme';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      className={`theme-switch m-3 p-0 ${theme} ${className}`}
      onClick={toggle}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <span className="theme-switch-track">
        <span className="theme-switch-thumb">{theme === 'light' ? <BsMoon /> : <BsSun />}</span>
      </span>
    </button>
  );
}
