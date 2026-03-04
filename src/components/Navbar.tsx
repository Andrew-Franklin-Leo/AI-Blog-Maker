import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navLinkClass = (path: string) => {
    const active = isActive(path)
    return `px-1 py-2 text-sm font-medium transition-colors duration-200 border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm ${
      active
        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent'
    }`
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Skip to content
      </a>
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md px-2"
            >
              Li Xia&apos;s Blog
            </Link>

            <div className="flex space-x-4">
              <Link
                to="/"
                className={navLinkClass('/')}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Home
              </Link>
              <Link
                to="/create"
                className={navLinkClass('/create')}
                aria-current={isActive('/create') ? 'page' : undefined}
              >
                Create Post
              </Link>
              <Link
                to="/test"
                className={navLinkClass('/test')}
                aria-current={isActive('/test') ? 'page' : undefined}
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
