import React from "react";
import UserTableData from "./UserTableData";
import { getUsers } from "../utils/storage";

const HR = () => {
  const users = Object.values(getUsers());
  const hrUsers = users.filter((u) => u.role === "hr");

  return (
    <div className="min-h-screen bg-app text-app p-4 sm:p-6 md:p-10">

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl font-bold">HR Users</h2>
        <p className="text-sm opacity-70">List of HR records</p>
      </div>

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
        {hrUsers.length === 0 ? (
          <p className="opacity-70">No HR users found</p>
        ) : (
          <UserTableData users={hrUsers} />
        )}
      </div>

    </div>
  );
};

export default HR;