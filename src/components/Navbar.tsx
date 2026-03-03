import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-md ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50'
    }`

  const handleSkip = (e: React.MouseEvent) => {
    e.preventDefault(); const m = document.getElementById('main-content')
    if (m) { m.setAttribute('tabindex', '-1'); m.focus(); m.scrollIntoView({ behavior: 'smooth' }) }
  }

  return (
    <>
      <a href="#main-content" onClick={handleSkip} className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-gray-800 focus:text-blue-600 dark:focus:text-blue-400 focus:border-2 focus:border-blue-600 focus:rounded-md focus:shadow-lg focus:outline-none">Skip to content</a>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1 transition-shadow">Li Xia&apos;s Blog</Link>
            <div className="flex space-x-1">
              <NavLink to="/" end className={navLinkClass}>Home</NavLink>
              <NavLink to="/create" className={navLinkClass}>Create Post</NavLink>
              <NavLink to="/test" className={navLinkClass}>Test AI</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Navbar
