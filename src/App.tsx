import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import ViewPost from './pages/ViewPost'
import TestAI from './pages/TestAI'
import { Toaster } from './components/ui/Toaster'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/test" element={<TestAI />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  )
}

export default App
