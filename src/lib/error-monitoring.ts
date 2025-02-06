interface ErrorMetadata {
  componentStack?: string;
  [key: string]: unknown;
}

class ErrorMonitor {
  private static instance: ErrorMonitor;
  private lastError: Error | null = null;
  private lastErrorTime: number = 0;
  private errorCount: number = 0;

  private constructor() {
    window.addEventListener('error', this.handleWindowError.bind(this));
    window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
  }

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  private handleWindowError(event: ErrorEvent): void {
    this.captureError(event.error || new Error(event.message));
  }

  private handlePromiseRejection(event: PromiseRejectionEvent): void {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    this.captureError(error);
  }

  captureError(error: Error, metadata: ErrorMetadata = {}): void {
    // Prevent duplicate error reports within 5 seconds
    const now = Date.now();
    if (
      this.lastError?.message === error.message &&
      now - this.lastErrorTime < 5000
    ) {
      return;
    }

    // Update error tracking
    this.lastError = error;
    this.lastErrorTime = now;
    this.errorCount++;

    // Prepare error report
    const errorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metadata: {
        ...metadata,
        errorCount: this.errorCount,
      },
    };

    // Log error in development
    if (process.env['NODE_ENV'] === 'development') {
      console.error('Error captured:', errorReport);
    }

    // In production, send to error monitoring service
    if (process.env['NODE_ENV'] === 'production') {
      this.sendErrorReport(errorReport);
    }
  }

  private async sendErrorReport(report: Record<string, unknown>): Promise<void> {
    try {
      const response = await fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });

      if (!response.ok) {
        console.error('Failed to send error report:', await response.text());
      }
    } catch (err) {
      // Fail silently in production, log in development
      if (process.env['NODE_ENV'] === 'development') {
        console.error('Failed to send error report:', err);
      }
    }
  }
}

// Export singleton instance methods
const errorMonitor = ErrorMonitor.getInstance();

export const captureError = (error: Error, metadata?: ErrorMetadata): void => {
  errorMonitor.captureError(error, metadata);
};