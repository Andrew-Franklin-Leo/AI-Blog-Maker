import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${
      isActive
        ? "text-blue-600 dark:text-blue-400 font-medium"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    } transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1`;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1"
          >
            Li Xia&apos;s Blog
          </Link>

          <div className="flex space-x-2 md:space-x-4">
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
  );
};

export default Navbar;
