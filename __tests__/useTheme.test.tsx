import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, renderHook, act, cleanup } from '@testing-library/react';
import useTheme, { ThemeProvider } from '@/hooks/useTheme';

afterEach(() => {
  cleanup();
  document.documentElement.dataset.theme = '';
  document.documentElement.dataset.bsTheme = '';
  document.body.dataset.bsTheme = '';
  window.localStorage.clear();
});

describe('useTheme / ThemeProvider', () => {
  test('throws when used outside a provider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(/must be used within/);
  });

  test('initializes from an inline data-theme on <html>', () => {
    document.documentElement.dataset.theme = 'dark';

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    expect(result.current.theme).toBe('dark');
  });

  test('persists the theme to localStorage and DOM when toggled', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.dataset.bsTheme).toBe('dark');
    expect(document.body.dataset.bsTheme).toBe('dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');
  });

  test('provides theme context to children', () => {
    function Consumer() {
      const { theme, toggle } = useTheme();
      return (
        <button onClick={toggle} type="button">
          theme:{theme}
        </button>
      );
    }

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );

    expect(screen.getByText(/theme:light/i)).toBeInTheDocument();
    act(() => {
      screen.getByRole('button').click();
    });
    expect(screen.getByText(/theme:dark/i)).toBeInTheDocument();
  });
});
