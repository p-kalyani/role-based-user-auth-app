import React, { useState } from "react";
import { getUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";

const UserTableData = ({ users = [] }) => {
  const loggedInUser = getUser() || {};
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 5;

  const filtered = users.filter((user) =>
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="w-full">

      <div className="mb-3 flex justify-end">
  <input
    type="text"
    placeholder="Search user..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    className="w-full sm:w-64 px-3 py-1.5 text-sm border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
</div>

      <div className="hidden sm:block overflow-x-auto">
        <div className="card-app rounded-xl shadow-md overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>

                {loggedInUser?.role !== "employee" && (
                  <th className="p-3 text-left">Action</th>
                )}
              </tr>
            </thead>

            <tbody>
              {paginated.map((user) => (
                <tr
                  key={user.email}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-300 dark:hover:text-black transition"
                >
                  <td className="p-3">{user.username}</td>
                  <td className="p-3 break-all">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>

                  {loggedInUser?.role !== "employee" && (
                    <td className="p-3">
                      <button
                        onClick={() =>
                          navigate("/user-dashboard", { state: user })
                        }
                        className="bg-purple-600 text-white px-3 py-1 cursor-pointer rounded hover:bg-purple-700"
                      >
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between p-3 border-t">
            <button
              onClick={goPrev}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              ◀ Prev
            </button>

            <span className="text-sm">
              Page {page} of {totalPages || 1}
            </span>

            <button
              onClick={goNext}
              disabled={page === totalPages || totalPages === 0}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>

        </div>
      </div>

      <div className="sm:hidden space-y-3">
        {paginated.map((user) => (
          <div key={user.email} className="card-app rounded-xl shadow p-4">
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm opacity-70 break-all">{user.email}</p>
            <p className="text-sm mt-1 capitalize">Role: {user.role}</p>

            {loggedInUser?.role !== "employee" && (
              <button
                onClick={() => setSelectedUser(user)}
                className="mt-3 bg-purple-600 text-white px-3 py-1 rounded w-full"
              >
                View
              </button>
            )}
          </div>
        ))}

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={goPrev}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ◀
          </button>

          <span className="text-sm">
            {page}/{totalPages || 1}
          </span>

          <button
            onClick={goNext}
            disabled={page === totalPages || totalPages === 0}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ▶
          </button>
        </div>
      </div>

      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] px-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="card-app rounded-xl shadow-xl p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">User Details</h2>

            <div className="space-y-2">
              <p>
                <span className="opacity-70">Name:</span>{" "}
                {selectedUser.username}
              </p>
              <p>
                <span className="opacity-70">Email:</span>{" "}
                {selectedUser.email}
              </p>
              <p>
                <span className="opacity-70">Role:</span>{" "}
                {selectedUser.role}
              </p>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-5 bg-red-500 text-white px-4 py-2 rounded w-full"
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