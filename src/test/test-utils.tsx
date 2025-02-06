import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '../lib/toast';

// Custom render that includes all providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ToastProvider>
        {children}
      </ToastProvider>
    </BrowserRouter>
  );
};

// Custom render method
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const view = render(ui, { wrapper: AllTheProviders, ...options });

  // Add convenience methods for testing forms
  return {
    ...view,
    // Helper to check form validation
    findInvalidInput: async (name: string) => {
      const input = view.getByLabelText(name);
      expect(input).toBeInvalid();
      return input;
    },
    // Helper to get form instance
    getForm: () => {
      const form = view.container.querySelector('form');
      if (!form) throw new Error('No form found in component');
      return form;
    }
  };
};

export * from '@testing-library/react';
export { customRender as render };