interface ErrorDetails {
  message: string
  stack?: string
  componentStack?: string
  metadata?: Record<string, any>
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
    // Example with a hypothetical error tracking service:
    /*
    try {
      fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV,
          ...details,
          // Add any other relevant information
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      })
    } catch (e) {
      // Fallback to console in case the logging endpoint fails
      console.error('Failed to log error:', e)
      console.error('Original error:', details)
    }
    */
  }

  public logWarning(message: string, metadata?: Record<string, any>) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Warning logged:', message, metadata)
      return
    }

    // In production, you might want to log warnings differently
    // this.logToService({ level: 'warning', message, metadata })
  }

  public logInfo(message: string, metadata?: Record<string, any>) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Info logged:', message, metadata)
      return
    }

    // In production, you might want to log info differently
    // this.logToService({ level: 'info', message, metadata })
  }

  public setGlobalMetadata(metadata: Record<string, any>) {
    // Add any global metadata that should be included with all error reports
    // For example: user information, app version, etc.
    // this.globalMetadata = metadata
  }
}

export const errorMonitor = ErrorMonitor.getInstance()

// Helper hooks and utilities
export const initErrorMonitoring = () => {
  errorMonitor.init()
  
  // Set up any global metadata
  errorMonitor.setGlobalMetadata({
    appVersion: import.meta.env.VITE_APP_VERSION || 'unknown',
    // Add any other global metadata
  })
}

// Export types for better developer experience
export type { ErrorDetails }