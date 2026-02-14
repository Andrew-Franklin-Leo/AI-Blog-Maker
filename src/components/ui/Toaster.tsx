import { useState, useEffect } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToasterProps {
  duration?: number;
}

export const useToast = () => {
  const addToast = (message: string, type: Toast["type"] = "info") => {
    // In a real application, this would use a state management solution
    // like Context API or Redux to communicate with the Toaster component.
    // For now, we just log it to avoid the unused state warning.
    console.log(`Toast added: ${message} (${type})`);
  };

  const removeToast = (_id: string) => {
    // Similarly for removal
  };

  return { addToast, removeToast };
};

export const Toaster = ({ duration = 3000 }: ToasterProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [toasts, duration]);

  const getToastStyles = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(
            toast.type,
          )} text-white px-4 py-2 rounded-lg shadow-lg`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
