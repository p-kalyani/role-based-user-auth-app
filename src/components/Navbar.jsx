import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUser } from "../utils/storage";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const user = getUser() || {};
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const isActive = (path) => location.pathname.startsWith(path);

  const links = [
    { path: "/dashboard", label: "Dashboard", roles: ["admin", "hr", "mgr", "employee"] },
    { path: "/hr", label: "HR", roles: ["admin"] },
    { path: "/managers", label: "Managers", roles: ["admin", "hr"] },
    { path: "/employee", label: "Employee", roles: ["admin", "hr", "mgr"] },

    { path: "/manager", label: "Tasks", roles: ["mgr"] },
    { path: "/tasks", label: "My Tasks", roles: ["employee"] },

    { path: "/settings", label: "Settings", roles: ["admin", "hr", "mgr", "employee"] },
  ];

  const filteredLinks = links.filter(link =>
    link.roles.includes(user.role)
  );

  const linkClass = (path) =>
    `block px-3 py-2 rounded-lg transition-all duration-200
    ${isActive(path)
      ? "bg-purple-700 text-white"
      : "text-white/90 hover:bg-purple-500 hover:text-white"
    }`;

  return (
    <nav className="bg-purple-600 text-white px-4 sm:px-6 py-4 shadow-md sticky top-0 z-50">

      <div className="flex items-center justify-between">

        <h2 className="font-bold text-lg">User</h2>

        <button
          className="sm:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <div className="hidden sm:flex items-center gap-4">
          {filteredLinks.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={linkClass(item.path)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          to="/profile"
          className="w-10 h-10 bg-white text-purple-600 flex items-center justify-center rounded-full font-bold"
        >
          {user?.username?.[0]?.toUpperCase() || "U"}
        </Link>
      </div>

      {open && (
        <div className="sm:hidden mt-4 space-y-2">
          {filteredLinks.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={linkClass(item.path)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;