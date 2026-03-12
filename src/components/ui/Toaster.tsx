import { useEffect } from 'react'
import { useToast, Toast } from '../../hooks/useToast'

interface ToasterProps {
  duration?: number
}

export const Toaster = ({ duration = 3000 }: ToasterProps) => {
  const { toasts, removeToast } = useToast()

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [toasts, duration, removeToast])

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

export { useToast }
