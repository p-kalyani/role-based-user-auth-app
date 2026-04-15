import React from "react";
import UserTableData from "./UserTableData";
import { getUsers } from "../utils/storage";

const Managers = () => {
  const usersObj = getUsers();
  const users = Object.values(usersObj);

  const mgrUsers = users.filter(user => user.role === "mgr");

  return (
    <div className="min-h-screen bg-app text-app p-4 sm:p-6 md:p-10">

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          Managers
        </h2>

        <p className="text-sm opacity-70 mt-1">
          All Managers records
        </p>
      </div>

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">

        {mgrUsers.length === 0 ? (
          <p className="opacity-70">No Managers found</p>
        ) : (
          <UserTableData users={mgrUsers} />
        )}

      </div>

    </div>
  );
};

export default Managers;