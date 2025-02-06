import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { TestWrapper } from './test-components';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestWrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };