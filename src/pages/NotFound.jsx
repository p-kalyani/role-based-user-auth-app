import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <FaExclamationTriangle className="text-9xl mb-6 animate-bounce" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page Not Found</p>
      <p className="text-center max-w-md mb-6">
        The page you are looking is unavailable.
      </p>
      <Link
        to="/dashboard"
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
        Go Back Dashboard
      </Link>
    </div>
  );
};

export default NotFound;