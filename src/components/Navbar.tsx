import { Link, NavLink } from 'react-router-dom'
import React from 'react'

const Navbar = () => {
  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView()
    }
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `px-1 py-2 border-b-2 transition-all duration-200 font-medium focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded-sm ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
        : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
    }`
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <a
        href="#main-content"
        onClick={handleSkipToContent}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-full focus:translate-y-0 z-[60] bg-blue-600 text-white px-4 py-2 rounded-b-md transition-transform duration-200"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded"
          >
            Li Xia&apos;s Blog
          </Link>

          <div className="flex space-x-6">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/create" className={navLinkClass}>
              Create Post
            </NavLink>
            <NavLink to="/test" className={navLinkClass}>
              Test AI
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
