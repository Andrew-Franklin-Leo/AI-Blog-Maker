import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, type ToastProps } from '../components/ui/Toaster';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
  toasts: ToastItem[];
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [nextId, setNextId] = useState(1);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = nextId;
    setNextId((prev) => prev + 1);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider 
      value={{
        showToast,
        toasts,
        removeToast
      }}
    >
      {children}
      <div 
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 z-50"
        data-testid="toast-container"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.showToast;
}

export function useToastState() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider');
  }
  return {
    toasts: context.toasts,
    removeToast: context.removeToast,
  };
}