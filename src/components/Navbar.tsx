import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const navLinkClass = (isActive: boolean) => {
    return `px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm ${
      isActive
        ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
        : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:border-gray-600'
    }`
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:right-0 focus:z-[60] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:text-center focus:font-bold focus:shadow-lg"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
          >
            Li Xia&apos;s Blog
          </Link>

          <div className="flex space-x-1 sm:space-x-4 h-full items-center">
            <NavLink
              to="/"
              end
              className={({ isActive }) => navLinkClass(isActive)}
            >
              Home
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) => navLinkClass(isActive)}
            >
              Create Post
            </NavLink>
            <NavLink
              to="/test"
              className={({ isActive }) => navLinkClass(isActive)}
            >
              Test AI
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
