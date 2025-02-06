import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            Li Xia&apos;s Blog
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Create Post
          </Link>
          <Link
            to="/test"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Test AI
          </Link>
        </div>
      </div>
    </nav>
  );
}