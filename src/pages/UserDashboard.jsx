import React from "react";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("viewUser"));

  if (!user) {
    return <div>No user selected</div>;
  }

  return (

    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        welcome, {user.username}
      </h2>

      <table className="w-full card-app shadow-md rounded-lg overflow-hidden">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="p-3 w-1/3">Username</th>
            <th className="p-3 w-1/3">Email</th>
            <th className="p-3 w-1/3">Role</th>
          </tr>
        </thead>

        <tbody>
          <tr className="text-center border-b">
            <td className="p-2">{user.username}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2 capitalize">{user.role}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;