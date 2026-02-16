import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
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

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

/* eslint-disable react-refresh/only-export-components */
export * from '@testing-library/react';
export { customRender as render };