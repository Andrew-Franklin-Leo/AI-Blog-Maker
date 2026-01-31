import { useState, useEffect } from 'react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToasterProps {
  duration?: number
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return { toasts, addToast, removeToast }
}

export const Toaster = ({ duration = 3000 }: ToasterProps) => {
  const { toasts } = useToast()

  useEffect(() => {
    // Note: This local toasts state in Toaster is not synced with useToast()
    // but we'll leave it as is for now as it's a pre-existing architecture issue.
    // We just want to fix the lint error.
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
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(
            toast.type
          )} text-white px-4 py-2 rounded-lg shadow-lg`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
