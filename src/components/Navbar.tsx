import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const skip = (e: React.MouseEvent) => {
    e.preventDefault();
    const m = document.getElementById("main-content");
    if (m) {
      m.tabIndex = -1;
      m.focus();
      m.scrollIntoView();
    }
  };
  const cls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md transition-all focus-visible:ring-2 focus-visible:ring-blue-500 outline-none ${
      isActive
        ? "text-blue-600 dark:text-blue-400 font-bold"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    }`;

  return (
    <>
      <a
        href="#main-content"
        onClick={skip}
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:inset-x-0 focus:z-[60] focus:bg-blue-600 focus:text-white focus:p-4 focus:text-center focus:font-bold"
      >
        Skip to content
      </a>
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 outline-none rounded-md px-2"
          >
            Li Xia&apos;s Blog
          </Link>
          <div className="flex space-x-1">
            {[
              ["/", "Home"],
              ["/create", "Create Post"],
              ["/test", "Test AI"],
            ].map(([to, lab]) => (
              <NavLink key={to} to={to} className={cls}>
                {lab}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
