import React from "react";
import UserTableData from "./UserTableData";
import { getUsers } from "../utils/storage";

const Employee = () => {
  const usersObj = getUsers();
  const users = Object.values(usersObj);

  const empUsers = users.filter((user) => user.role === "employee");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      {empUsers.length === 0 ?
        <p>No employees found</p> :
        <UserTableData users={empUsers} />
      }
    </div>
  );
};

export default Employee;