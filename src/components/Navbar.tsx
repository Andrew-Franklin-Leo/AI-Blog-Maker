import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-blue-600 dark:text-blue-400'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Li Xia's Blog
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`${isActive('/')} transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              to="/create"
              className={`${isActive('/create')} transition-colors duration-200`}
            >
              Create Post
            </Link>
            <Link
              to="/test"
              className={`${isActive('/test')} transition-colors duration-200`}
            >
              Test AI
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar