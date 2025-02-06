import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';
import { TestAI } from './pages/TestAI';
import { ViewPost } from './pages/ViewPost';
import { ToastProvider } from './context/ToastContext';
import { Toaster } from './components/ui/Toaster';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/ai" element={<TestAI />} />
              <Route path="/post/:id" element={<ViewPost />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </ToastProvider>
    </ErrorBoundary>
  );
};
