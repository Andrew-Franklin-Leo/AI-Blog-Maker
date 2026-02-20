import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-md ${
      isActive
        ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:border-gray-300 dark:hover:border-gray-600"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[60] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-br-lg focus:shadow-lg transition-all"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1"
          >
            Li Xia&apos;s Blog
          </Link>

          <div className="flex space-x-1 sm:space-x-4 h-16 items-center">
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
  );
};

export default Navbar;
