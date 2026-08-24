import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { junit } from 'node:test/reporters';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['__tests__/**/*.{test,spec}.{ts,tsx}'],
    reporters: ['junit', 'github-actions'],
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['text', 'html', 'clover', 'json', 'lcov', 'cobertura'],
    },
  },
});
