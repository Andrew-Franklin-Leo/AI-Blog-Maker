import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-600 dark:border-blue-400"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent"
    }`;

  const scrollToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const content = document.getElementById("main-content");
    if (content) {
      content.setAttribute("tabindex", "-1");
      content.focus();
      content.scrollIntoView();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
      <a
        href="#main-content"
        onClick={scrollToContent}
        className="absolute left-0 top-0 -translate-y-full focus:translate-y-0 z-[60] bg-blue-600 text-white px-4 py-2 rounded-br-lg transition-transform"
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

          <div className="flex space-x-6">
            <NavLink to="/" className={navLinkClass}>
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
