interface ErrorDetails {
  message: string
  stack?: string
  componentStack?: string
  metadata?: Record<string, unknown>
}

class ErrorMonitor {
  private static instance: ErrorMonitor
  private isInitialized: boolean = false

  private constructor() {}

  public static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor()
    }
    return ErrorMonitor.instance
  }

  public init() {
    if (this.isInitialized) {
      return
    }

    // Set up global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      this.logError({
        message: message.toString(),
        stack: error?.stack,
        metadata: {
          source,
          lineno,
          colno
        }
      })
    }

    // Set up unhandled rejection handler
    window.onunhandledrejection = (event) => {
      this.logError({
        message: 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        metadata: {
          reason: event.reason
        }
      })
    }

    this.isInitialized = true
  }

  public logError(details: ErrorDetails) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', details)
      return
    }

    // In production, you would send this to your error tracking service
  }

  public logWarning(message: string, metadata?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Warning logged:', message, metadata)
      return
    }
  }

  public logInfo(message: string, metadata?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Info logged:', message, metadata)
      return
    }
  }

  public setGlobalMetadata(_metadata: Record<string, unknown>) {
    // Add any global metadata that should be included with all error reports
  }
}

export const errorMonitor = ErrorMonitor.getInstance()

// Helper hooks and utilities
export const initErrorMonitoring = () => {
  errorMonitor.init()

  // Set up any global metadata
  errorMonitor.setGlobalMetadata({
    appVersion: import.meta.env.VITE_APP_VERSION || 'unknown',
  })
}

// Export types for better developer experience
export type { ErrorDetails }
