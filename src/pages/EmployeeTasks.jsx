import React, { useState } from "react";
import { getUser, getTasks } from "../utils/storage";

const EmployeeTasks = () => {
  const user = getUser() || {};

  const [tasks, setTasks] = useState(getTasks());
  const [openStatusId, setOpenStatusId] = useState(null);

  const myTasks = tasks.filter(
    (task) => task.assignedTo === user.email
  );

  const updateStatus = (id, status) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, status } : task
    );

    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-app text-app py-8">

      <div className="max-w-5xl mx-auto px-4 space-y-6">

        <div className="card-app p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold">My Tasks</h2>
          <p className="text-sm opacity-70">
            View and update your assigned tasks
          </p>
        </div>

        {myTasks.length === 0 ? (
          <p className="opacity-70">No tasks assigned</p>
        ) : (
          <div className="card-app p-6 rounded-2xl shadow-md">

            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">

                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Priority</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {myTasks.map(task => (
                    <tr
                      key={task.id}
                      className="text-center border-b hover:bg-gray-50 dark:hover:bg-gray-200 transition"
                    >
                      <td className="p-3">{task.title}</td>

                      <td className={`p-3 ${
                        task.priority === "High"
                          ? "text-red-500"
                          : task.priority === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}>
                        {task.priority}
                      </td>

                      <td className="p-3 relative">

                        <div
                          onClick={() =>
                            setOpenStatusId(
                              openStatusId === task.id ? null : task.id
                            )
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer inline-block
                            ${
                              task.status === "Done"
                                ? "bg-green-500 text-white"
                                : "bg-yellow-500 text-white"
                            }`}
                        >
                          {task.status}
                        </div>

                        {openStatusId === task.id && (
                          <div className="absolute right-0 mt-2 w-28 card-app border rounded shadow z-50">
                            {["Pending", "Done"].map(s => (
                              <div
                                key={s}
                                onClick={() => {
                                  updateStatus(task.id, s);
                                  setOpenStatusId(null);
                                }}
                                className="px-3 py-2 text-sm cursor-pointer hover:bg-purple-500 hover:text-white"
                              >
                                {s}
                              </div>
                            ))}
                          </div>
                        )}

                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            <div className="sm:hidden space-y-3">
              {myTasks.map(task => (
                <div
                  key={task.id}
                  className="p-4 rounded-xl border border-app shadow"
                >
                  <p className="font-semibold">{task.title}</p>

                  <div className="flex justify-between mt-2 text-sm items-center">

                    <span className={
                      task.priority === "High"
                        ? "text-red-500"
                        : task.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }>
                      {task.priority}
                    </span>
                    <div className="relative">
                      <div
                        onClick={() =>
                          setOpenStatusId(
                            openStatusId === task.id ? null : task.id
                          )
                        }
                        className={`px-3 py-1 rounded-full text-xs cursor-pointer
                          ${
                            task.status === "Done"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-white"
                          }`}
                      >
                        {task.status}
                      </div>

                      {openStatusId === task.id && (
                        <div className="absolute right-0 mt-2 w-28 card-app border rounded shadow z-50">
                          {["Pending", "Done"].map(s => (
                            <div
                              key={s}
                              onClick={() => {
                                updateStatus(task.id, s);
                                setOpenStatusId(null);
                              }}
                              className="px-3 py-2 text-sm cursor-pointer hover:bg-purple-500 hover:text-white"
                            >
                              {s}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTasks;