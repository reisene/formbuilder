'use client';

import { useEffect, useState } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import useTheme from '@/hooks/useTheme';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  const displayedTheme = mounted ? theme : 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      className={`theme-switch m-3 p-0 ${className}`}
      onClick={toggle}
      title={displayedTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-label={displayedTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <span className="theme-switch-track">
        <span className="theme-switch-thumb">
          {displayedTheme === 'light' ? <BsMoon /> : <BsSun />}
        </span>
      </span>
    </button>
  );
}
