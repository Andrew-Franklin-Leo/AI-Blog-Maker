import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { vi } from 'vitest';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: {
      getSession: () => ({ data: { session: null }, error: null }),
    },
    from: () => ({
      select: () => ({
        order: () => ({
          limit: () => ({
            data: [],
            error: null,
          }),
        }),
      }),
    }),
  }),
}));

import AllTheProviders from './TestProviders';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };