import { useEffect } from 'react'
import { useToast } from '../../hooks/useToast'

interface ToasterProps {
  duration?: number
}

export const Toaster = ({ duration = 3000 }: ToasterProps) => {
  const { toasts, removeToast } = useToast()

  useEffect(() => {
    if (toasts.length > 0) {
      const lastToast = toasts[toasts.length - 1]
      const timer = setTimeout(() => {
        removeToast(lastToast.id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [toasts, duration, removeToast])

  const getToastStyles = (type: string) => {
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
          )} text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 opacity-100`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
