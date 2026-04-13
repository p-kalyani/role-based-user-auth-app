import React from "react";
import UserTableData from "./UserTableData";
import { getUsers } from "../utils/storage";

const HR = () => {
  const usersObj = getUsers();
  const users = Object.values(usersObj);

  const hrUsers = users.filter((user) => user.role === "hr");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">HR Users</h2>
      {hrUsers.length === 0 ?
        (<p>No HR users found!</p>) :
        <UserTableData users={hrUsers} />
      }
    </div>
  );
};

export default HR;