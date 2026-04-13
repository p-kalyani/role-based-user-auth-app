import React from "react";
import UserTableData from "./UserTableData";
import { getUsers } from "../utils/storage";

const Managers = () => {
  const usersObj = getUsers();
  const users = Object.values(usersObj);

  const mgrUsers = users.filter(user => user.role === "mgr");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Managers</h2>

      {mgrUsers.length === 0 ? (
        <p>No Managers found</p>
      ) : (
        <UserTableData users={mgrUsers} />
      )}
    </div>
  );
};

export default Managers;