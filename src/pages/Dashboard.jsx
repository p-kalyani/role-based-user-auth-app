import React from "react";
import UserTableData from "./UserTableData";
import { getUsers, getUser } from "../utils/storage";

const Dashboard = () => {
  const loggedInUser = getUser();

  const usersObj = getUsers();
  const users = Object.values(usersObj);

  const filteredUsers = users.filter((user) => {
    if (loggedInUser.role === "admin") {
      return true;
    }
    if (loggedInUser.role === "hr") {
      return ["hr", "employee", "mgr"].includes(user.role);
    }
    if (loggedInUser.role === "mgr") {
      return ["mgr", "employee"].includes(user.role);
    }
    if (loggedInUser.role === "employee") {
      return user.email === loggedInUser.email;
    }
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome,{loggedInUser.username}</h2>
      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <UserTableData users={filteredUsers} />
      )}
    </div>
  );
};

export default Dashboard;