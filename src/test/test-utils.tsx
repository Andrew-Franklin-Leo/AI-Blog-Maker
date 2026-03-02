import React, { ReactElement } from 'react';
import { HashRouter } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        {children}
      </HashRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
export * from '@testing-library/react';
export { AllTheProviders };
