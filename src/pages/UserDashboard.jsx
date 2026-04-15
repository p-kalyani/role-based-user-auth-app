import React from "react";
import { useLocation } from "react-router-dom";

const UserDashboard = () => {
  const location = useLocation();
  const user = location.state;

  if (!user) {
    return (
      <div className="min-h-screen bg-app text-app p-4 sm:p-6 md:p-10">
        <div className="card-app rounded-xl shadow-md p-6">
          <p className="opacity-70">No user selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app text-app p-4 sm:p-6 md:p-10">

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          {user.username}
        </h2>
        <p className="text-sm opacity-70 mt-1">
          User Profile Details
        </p>
      </div>

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6">

        <h3 className="text-lg font-bold mb-4">
          Information
        </h3>

        <div className="space-y-4">

          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm opacity-70">Username</p>
            <p className="font-medium">{user.username}</p>
          </div>

          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm opacity-70">Email</p>
            <p className="font-medium break-all">{user.email}</p>
          </div>

          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm opacity-70">Role</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;