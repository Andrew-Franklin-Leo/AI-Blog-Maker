import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import Toaster from './components/ui/Toaster';
import Navbar from './components/Navbar';
import TestAI from './pages/TestAI';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function ErrorFallback({ error }: FallbackProps) {
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
            {error.message}
          </pre>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post/:id" element={<ViewPost />} />
              <Route path="/test-ai" element={<TestAI />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
