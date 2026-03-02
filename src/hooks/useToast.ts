import { useState, useEffect } from 'react'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

let subscribers: ((toasts: Toast[]) => void)[] = []
let toasts: Toast[] = []

const notify = () => {
  subscribers.forEach((callback) => callback([...toasts]))
}

export const useToast = () => {
  const [localToasts, setLocalToasts] = useState<Toast[]>(toasts)

  useEffect(() => {
    const callback = (newToasts: Toast[]) => setLocalToasts(newToasts)
    subscribers.push(callback)
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback)
    }
  }, [])

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9)
    toasts = [...toasts, { id, message, type }]
    notify()
  }

  const removeToast = (id: string) => {
    toasts = toasts.filter((toast) => toast.id !== id)
    notify()
  }

  return { toasts: localToasts, addToast, removeToast }
}
