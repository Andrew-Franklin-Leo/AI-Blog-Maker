import { Link, useLocation } from 'react-router-dom'
import React from 'react'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-blue-600 dark:text-blue-400 font-medium'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
  }

  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView()
    }
  }

  return (
    <>
      <a
        href="#main-content"
        onClick={handleSkipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:right-0 focus:z-[60] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:text-center focus:outline-none"
      >
        Skip to content
      </a>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1">
              Li Xia&apos;s Blog
            </Link>

            <div className="flex space-x-4">
              <Link
                to="/"
                className={`${isActive('/')} transition-colors duration-200 px-2 py-1 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500`}
              >
                Home
              </Link>
              <Link
                to="/create"
                className={`${isActive('/create')} transition-colors duration-200 px-2 py-1 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500`}
              >
                Create Post
              </Link>
              <Link
                to="/test"
                className={`${isActive('/test')} transition-colors duration-200 px-2 py-1 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500`}
              >
                Test AI
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
