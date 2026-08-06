// Provides global @testing-library/jest-dom matcher types (toBeInTheDocument,
// toHaveAttribute, ...) for Vitest test files. This file is part of the tsconfig
// `include` so the module augmentation is visible to the editor and tsc without
// adding entries to compilerOptions.types (which would break next dev).
import '@testing-library/jest-dom/vitest';

export {};
