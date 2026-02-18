import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    const baseClasses = 'px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2'
    return isActive
      ? `${baseClasses} text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400`
      : `${baseClasses} text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent`
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:right-0 focus:z-[60] focus:p-4 focus:bg-blue-600 focus:text-white focus:text-center"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Li Xia&apos;s Blog
          </Link>

          <div className="flex space-x-4">
            <NavLink to="/" end className={navLinkClass}>
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
