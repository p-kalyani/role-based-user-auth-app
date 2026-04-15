import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4">

      <h1 className="text-5xl sm:text-6xl font-bold">404</h1>

      <p className="text-lg sm:text-xl mt-2">Page Not Found</p>

      <Link
        to="/dashboard"
        className="mt-6 px-6 py-3 bg-white text-purple-600 rounded-lg"
      >
        Go to Dashboard
      </Link>

    </div>
  );
};

export default NotFound;