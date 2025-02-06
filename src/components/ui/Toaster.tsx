import { useState, useEffect } from 'react';
import { Toast } from './toast-utils';

interface ToasterProps {
  autoClose?: number;
  onToastAdd?: (toast: Toast) => void;
}

const Toaster = ({ autoClose = 3000, onToastAdd }: ToasterProps) => {
  const [activeToasts, setActiveToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== currentToasts[0]?.id)
      );
    }, autoClose);

    return () => clearInterval(interval);
  }, [autoClose]);

  useEffect(() => {
    if (onToastAdd && activeToasts.length > 0) {
      onToastAdd(activeToasts[activeToasts.length - 1]);
    }
  }, [activeToasts, onToastAdd]);

  if (activeToasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {activeToasts.map((toast) => (
        <div
          key={toast.id}
          className={`mb-2 p-4 rounded shadow-lg text-white ${
            toast.type === 'error'
              ? 'bg-red-500'
              : toast.type === 'success'
              ? 'bg-green-500'
              : 'bg-blue-500'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toaster;