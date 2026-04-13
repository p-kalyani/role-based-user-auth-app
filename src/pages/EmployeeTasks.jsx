import React, { useState } from "react";
import { getUser, getTasks } from "../utils/storage";

const EmployeeTasks = () => {
  const user = getUser();

  const [tasks, setTasks] = useState(
    getTasks()
  );

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
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

      {myTasks.length === 0 ? (
        <p>No tasks assigned</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full card-app shadow-md rounded-lg overflow-hidden">

            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {myTasks.map(task => (
                <tr key={task.id} className="text-center border-b dark:hover:bg-gray-300">

                  <td className="p-2">{task.title}</td>

                  <td className={`p-2 ${task.priority === "High"
                      ? "text-red-500"
                      : task.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}>
                    {task.priority}
                  </td>

                  <td className="p-2">
                    <select
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                      className={`border p-1 rounded text-sm font-semibold ${task.status === "Done"
                          ? "text-green-500"
                          : "text-red-500"
                        }`}
                    >
                      <option value="Pending">❌ Pending</option>
                      <option value="Done">✔ Done</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
};

export default EmployeeTasks;