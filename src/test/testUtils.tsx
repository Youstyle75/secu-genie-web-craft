import React, { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';

interface AllProvidersProps {
  children: React.ReactNode;
}

const AllProviders = ({ children }: AllProvidersProps) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => rtlRender(ui, { wrapper: AllProviders, ...options });

// Re-export everything from @testing-library/react  
export * from '@testing-library/react';

// Create screen object with common queries
export const screen = {
  getByRole: (role: string, options?: any) => {
    const container = document.body;
    const elements = container.querySelectorAll(`[role="${role}"]`);
    if (options?.name) {
      const regex = new RegExp(options.name, 'i');
      for (let i = 0; i < elements.length; i++) {
        if (regex.test(elements[i].textContent || '')) {
          return elements[i];
        }
      }
    }
    return elements[0];
  },
  
  getByText: (text: string | RegExp) => {
    const container = document.body;
    const regex = typeof text === 'string' ? new RegExp(text, 'i') : text;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent && regex.test(node.textContent)) {
        return node.parentElement;
      }
    }
    throw new Error(`Unable to find element with text: ${text}`);
  },
  
  getByLabelText: (text: string | RegExp) => {
    const labels = document.querySelectorAll('label');
    const regex = typeof text === 'string' ? new RegExp(text, 'i') : text;
    for (let i = 0; i < labels.length; i++) {
      if (regex.test(labels[i].textContent || '')) {
        const forAttr = labels[i].getAttribute('for');
        if (forAttr) {
          return document.getElementById(forAttr);
        }
        return labels[i].querySelector('input, textarea, select');
      }
    }
    throw new Error(`Unable to find label with text: ${text}`);
  },
  
  getByPlaceholderText: (text: string) => {
    return document.querySelector(`[placeholder*="${text}"]`);
  },
  
  getAllByLabelText: (text: string | RegExp) => {
    const labels = document.querySelectorAll('label');
    const regex = typeof text === 'string' ? new RegExp(text, 'i') : text;
    const results: any[] = [];
    for (let i = 0; i < labels.length; i++) {
      if (regex.test(labels[i].textContent || '')) {
        const forAttr = labels[i].getAttribute('for');
        if (forAttr) {
          const el = document.getElementById(forAttr);
          if (el) results.push(el);
        } else {
          const el = labels[i].querySelector('input, textarea, select');
          if (el) results.push(el);
        }
      }
    }
    return results;
  },
  
  getAllByRole: (role: string) => {
    return Array.from(document.querySelectorAll(`[role="${role}"]`));
  },
  
  queryByText: (text: string | RegExp) => {
    try {
      return screen.getByText(text);
    } catch {
      return null;
    }
  },
};

// Create waitFor helper
export const waitFor = async (callback: () => void | Promise<void>, options?: { timeout?: number }) => {
  const timeout = options?.timeout || 1000;
  const startTime = Date.now();
  let lastError;
  
  while (Date.now() - startTime < timeout) {
    try {
      await callback();
      return;
    } catch (error) {
      lastError = error;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  
  throw lastError || new Error('Timeout waiting for condition');
};

// Override render with our custom version
export { customRender as render };
