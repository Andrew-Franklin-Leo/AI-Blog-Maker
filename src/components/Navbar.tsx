import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
      isActive
        ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent"
    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-sm`;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:right-0 focus:z-[60] focus:bg-white dark:focus:bg-gray-800 focus:p-4 focus:text-center focus:font-bold focus:text-blue-600 dark:focus:text-blue-400 focus:shadow-md"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Li Xia&apos;s Blog
          </Link>

          <div className="flex space-x-4">
            <NavLink to="/" className={navLinkClass} end>
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
