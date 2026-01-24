import { useState, useEffect } from 'react'
import { Toast } from '../../hooks/useToast'

interface ToasterProps {
  duration?: number
}

export const Toaster = ({ duration = 3000 }: ToasterProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1))
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [toasts, duration])

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 space-y-2"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(
            toast.type
          )} text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="ml-4 p-1 text-white hover:bg-white/20 rounded-full"
            aria-label="Dismiss"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}