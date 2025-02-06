import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title: string;
  description: string;
  status: 'success' | 'error' | 'info';
}

let id = 0;
const generateId = () => `${id++}`;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(({ title, description, status }: Omit<Toast, 'id'>) => {
    const toast: Toast = {
      id: generateId(),
      title,
      description,
      status
    };

    setToasts(prev => [...prev, toast]);

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 5000);
  }, []);

  return {
    toasts,
    addToast
  };
}