import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
      isActive
        ? "border-blue-600 text-gray-900 dark:text-white dark:border-blue-400"
        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <a
        href="#main-content"
        className="absolute left-0 -top-16 bg-blue-600 text-white px-4 py-2 z-[60] transition-all focus:top-0 focus:left-0 focus:right-0 focus:text-center"
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

          <div className="flex space-x-8 h-full">
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
