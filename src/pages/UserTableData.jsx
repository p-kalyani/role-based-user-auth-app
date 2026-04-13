import React from "react";
import { getUser } from "../utils/storage";

const UserTableData = ({ users }) => {

  const loggedInUser = getUser() || {};

  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleView = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 overflow-x-auto">

      <table className="w-full card-app shadow-md rounded-lg overflow-hidden">

        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="p-2">Username</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>

            {loggedInUser.role !== "employee" && (
              <th className="p-2">View</th>
            )}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.email}
              className="text-center border-b hover:bg-gray-300"
            >
              <td className="p-2">{user.username}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 capitalize">{user.role}</td>

              {loggedInUser.role !== "employee" && (
                <td className="p-2">
                  <button
                    onClick={() => handleView(user)}
                    className="bg-purple-600 cursor-pointer text-white px-2 py-1 rounded hover:bg-purple-700"
                  >
                    View
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>

      </table>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="card-app p-6 rounded-lg shadow-lg w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">User Details</h2>

            <p><strong>Name:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default UserTableData;