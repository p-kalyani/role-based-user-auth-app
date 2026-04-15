import React from "react";
import UserTableData from "./UserTableData";
import { getUsers, getUser } from "../utils/storage";

const Dashboard = () => {
  const loggedInUser = getUser() || {};
  const users = Object.values(getUsers());

  const filteredUsers = users.filter((user) => {
    if (loggedInUser.role === "admin") return true;
    if (loggedInUser.role === "hr") return ["hr", "employee", "mgr"].includes(user.role);
    if (loggedInUser.role === "mgr") return ["mgr", "employee"].includes(user.role);
    if (loggedInUser.role === "employee") return user.email === loggedInUser.email;
    return false;
  });

  return (
    <div className="min-h-screen bg-app text-app p-4 sm:p-6 md:p-10">

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          Welcome,{" "}
          <span className="text-purple-500">
            {loggedInUser.username || "User"}
          </span>
        </h2>
      </div>

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
        {filteredUsers.length === 0 ? (
          <p className="opacity-70">No users found</p>
        ) : (
          <UserTableData users={filteredUsers} />
        )}
      </div>

    </div>
  );
};

export default Dashboard;