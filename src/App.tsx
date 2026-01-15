import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toaster from "./components/ui/Toaster";
import { ToastProvider } from "./context/ToastContext";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import TestAI from "./pages/TestAI";
import ViewPost from "./pages/ViewPost";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router basename="/AI-Blog-Maker/">
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<ViewPost />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/test" element={<TestAI />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </Router>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
