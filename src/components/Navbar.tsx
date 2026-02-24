import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700'
    }`

  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('main-content')
    if (element) {
      element.focus()
      element.scrollIntoView()
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <a
        href="#main-content"
        onClick={handleSkipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:right-0 focus:z-[60] focus:bg-white focus:dark:bg-gray-800 focus:p-4 focus:text-center focus:text-blue-600 focus:dark:text-blue-400 focus:font-bold focus:shadow-md"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Li Xia&apos;s Blog
            </Link>
          </div>

          <div className="flex space-x-8">
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
