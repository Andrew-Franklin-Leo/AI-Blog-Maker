import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts', 'src/test/setup-env.ts'],
    css: true,
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        '**/[.]**',
        'packages/*/test?(s)/**',
        '**/*.d.ts',
        '**/virtual:*',
        '**/__mocks__/*',
        '**/test/**',
      ],
    },
    testTimeout: 10000, // Increase default timeout to 10 seconds
    hookTimeout: 10000, // Increase hook timeout as well
  },
});