import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUser } from "../utils/storage";

const Navbar = () => {
  const location = useLocation();
  const user = getUser() || {};

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-purple-600 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="font-bold text-lg">User</h2>
      </div>
      <div className="flex space-x-6">
        <Link to="/dashboard"
          className={`px-4 py-2 rounded-lg hover:bg-purple-700 transition ${isActive("/dashboard") ? "bg-purple-800 font-semibold" : ""
            }`}
        >
          Dashboard
        </Link>
        {user.role === "admin" && (
          <>
            <Link to="/hr"
              className={`px-4 py-2 rounded-lg hover:bg-purple-700 transition ${isActive("/hr") ? "bg-purple-800 font-semibold" : ""
                }`}
            >HR</Link>
            <Link to="/managers"
              className={`px-4 py-2 rounded-lg hover:bg-purple-700 transition ${isActive("/managers") ? "bg-purple-800 font-semibold" : ""
                }`}
            >Managers</Link>
            <Link to="/employee"
              className={`px-4 py-2 rounded-lg hover:bg-purple-700 transition ${isActive("/employee") ? "bg-purple-800 font-semibold" : ""
                }`}
            >Employee</Link>
          </>
        )}

        {user.role === "hr" && (
          <>
            <Link to="/managers"
              className={`px-4 py-2 rounded-lg hover:bg-purple-700 transition ${isActive("/managers") ? "bg-purple-800 font-semibold" : ""
                }`}
            >Managers</Link>
            <Link to="/employee" className={`px-4 py-2 rounded-lg hover:bg-purple-700 transition ${isActive("/employee") ? "bg-purple-800 font-semibold" : ""
              }`}
            >Employee</Link>
          </>
        )}
        {user.role === "mgr" && (
          <>
            <Link to="/manager" className={`px-4 py-2 rounded-lg hover:bg-purple-700 transition ${isActive("/manager") ? "bg-purple-800 font-semibold" : ""
              }`}
            >Tasks to Assign</Link>
            <Link to="/employee" className={`px-4 py-2 rounded-lg hover:bg-purple-700 transition ${isActive("/employee") ? "bg-purple-800 font-semibold" : ""
              }`}
            >Employee</Link>
          </>
        )}
        {user.role === "employee" && (
          <>
            <Link to="/tasks" className={`px-4 py-2 rounded-lg hover:bg-purple-700 transition ${isActive("/tasks") ? "bg-purple-800 font-semibold" : ""
              }`}
            >My Tasks</Link>
          </>
        )}

        <Link to="/settings"
          className={`px-4 py-2 rounded-lg hover:bg-purple-700 transition ${isActive("/settings") ? "bg-purple-800 font-semibold" : ""
            }`}>
          Settings
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/profile" title={user.username}
          className="flex items-center justify-center w-10 h-10 bg-white text-purple-600 font-bold rounded-full hover:opacity-90 transition">
          {user.username[0].toUpperCase()}
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;