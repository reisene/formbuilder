import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

// Mock next/image so it renders a plain <img> in the test environment.
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} />
  ),
}));

// Mock next/link to render a plain anchor.
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// Typewriter animates text over time; mock it to render the first string synchronously.
vi.mock('typewriter-effect', () => ({
  default: ({ options }: { options?: { strings?: string[] } }) => (
    <span>{options?.strings?.[0] ?? ''}</span>
  ),
}));

describe('NotFound component', () => {
  test('renders the heading, paragraph and home link', () => {
    render(<NotFound />);

    expect(screen.getByText(/Not Found.../i)).toBeInTheDocument();
    expect(screen.getByText(/This page could not be found/i)).toBeInTheDocument();

    const homeLink = screen.getByRole('button', { name: /Go back home/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('renders the illustration image with the correct alt text', () => {
    render(<NotFound />);

    const images = screen.getAllByRole('img', { name: /Not Found/i });
    expect(images.length).toBeGreaterThan(0);
    images.forEach((img) => {
      expect(img).toHaveAttribute('src', '/notfound.png');
    });
  });
});
