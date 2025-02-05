import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })

    // Here you could send the error to your error tracking service
    // e.g., Sentry, LogRocket, etc.
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-lg w-full text-center">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Oops! Something went wrong
              </h1>
              
              <div className="mb-6 text-gray-600 dark:text-gray-400">
                <p>We're sorry for the inconvenience. The error has been logged and we'll look into it.</p>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mt-4">
                    <details className="text-left">
                      <summary className="cursor-pointer text-blue-600 dark:text-blue-400">
                        View Error Details
                      </summary>
                      <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-700 rounded overflow-auto text-sm">
                        {this.state.error.toString()}
                        {this.state.errorInfo?.componentStack}
                      </pre>
                    </details>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors w-full"
                >
                  Refresh Page
                </button>
                
                <Link
                  to="/"
                  className="block text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary