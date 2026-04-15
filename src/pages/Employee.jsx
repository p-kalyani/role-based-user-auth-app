import React from "react";
import UserTableData from "./UserTableData";
import { getUsers } from "../utils/storage";

const Employee = () => {
  const users = Object.values(getUsers());
  const empUsers = users.filter((u) => u.role === "employee");

  return (
    <div className="min-h-screen bg-app text-app p-4 sm:p-6 md:p-10">

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl font-bold">Employees</h2>
        <p className="text-sm opacity-70">All employee records</p>
      </div>

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
        {empUsers.length === 0 ? (
          <p className="opacity-70">No employees found</p>
        ) : (
          <UserTableData users={empUsers} />
        )}
      </div>

    </div>
  );
};

export default Employee;