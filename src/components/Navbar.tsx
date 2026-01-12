import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getLinkProps = (path: string) => {
    const active = location.pathname === path;
    return {
      "aria-current": active ? ("page" as const) : undefined,
      className: `${
        active
          ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      } transition-colors duration-200 pb-1`,
    };
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Li Xia&apos;s Blog
          </Link>

          <div className="flex space-x-4">
            <Link to="/" {...getLinkProps("/")}>
              Home
            </Link>
            <Link to="/create" {...getLinkProps("/create")}>
              Create Post
            </Link>
            <Link to="/test" {...getLinkProps("/test")}>
              Test AI
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
