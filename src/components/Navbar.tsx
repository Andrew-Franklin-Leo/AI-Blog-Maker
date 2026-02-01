import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 px-1 py-1 text-sm font-medium border-b-2 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent'
    }`

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
            aria-label="Li Xia&apos;s Blog Home"
          >
            Li Xia&apos;s Blog
          </Link>

          <div className="flex space-x-4">
            <NavLink to="/" end className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/create" className={getNavLinkClass}>
              Create Post
            </NavLink>
            <NavLink to="/test" className={getNavLinkClass}>
              Test AI
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
