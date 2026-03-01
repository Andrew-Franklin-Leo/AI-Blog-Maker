import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `px-1 py-2 border-b-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm ${
      isActive
        ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
    }`
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1"
          >
            Li Xia&apos;s Blog
          </Link>

          <div className="flex items-center space-x-6">
            <NavLink
              to="/"
              end
              className={navLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/create"
              className={navLinkClass}
            >
              Create Post
            </NavLink>
            <NavLink
              to="/test"
              className={navLinkClass}
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
