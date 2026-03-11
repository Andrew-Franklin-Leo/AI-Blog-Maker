import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `transition-colors duration-200 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-600 dark:border-blue-400'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent'
    }`
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-1">
            Li Xia&apos;s Blog
          </Link>

          <div className="flex space-x-6">
            <NavLink
              to="/"
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
