import { Link, useLocation } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-blue-600 dark:text-blue-400 font-medium"
      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200";
  };

  const skipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
      <a
        href="#main-content"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:right-0 focus:z-[60] focus:bg-blue-600 focus:text-white focus:p-4 focus:text-center focus:font-bold"
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
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
            <Link to="/create" className={isActive("/create")}>
              Create Post
            </Link>
            <Link to="/test" className={isActive("/test")}>
              Test AI
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
