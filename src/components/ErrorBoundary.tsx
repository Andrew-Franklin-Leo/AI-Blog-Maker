import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { captureError } from '../lib/error-monitoring';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export default class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ''
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.toString()
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    captureError(error, {
      componentStack: errorInfo.componentStack || ''
    });
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              We apologize, but there&apos;s been an error. Our team has been
              notified and we&apos;re working to fix it.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
            {process.env['NODE_ENV'] === 'development' && (
              <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto">
                {this.state.errorMessage}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}