import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';

// Extend vitest's expect with @testing-library/jest-dom's matchers
expect.extend(matchers);

// Reset all mocks after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock window.fetch
const originalFetch = global.fetch;
global.fetch = vi.fn();

// Reset fetch mock after each test
afterEach(() => {
  global.fetch = originalFetch;
});

// Mock environment variables
process.env['VITE_SUPABASE_URL'] = 'http://localhost:54321';
process.env['VITE_SUPABASE_ANON_KEY'] = 'mock-key';
process.env['VITE_OPENROUTER_API_KEY'] = 'mock-api-key';