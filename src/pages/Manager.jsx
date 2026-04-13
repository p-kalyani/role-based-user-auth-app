import React, { useState } from "react";
import { getUser, getUsers, getTasks } from "../utils/storage";
import { toast } from "react-toastify";

const Manager = () => {

  const manager = getUser();

  const usersObj = getUsers();
  const employees = Object.values(usersObj).filter(u => u.role === "employee");

  const [form, setForm] = useState({
    title: "",
    assignedTo: "",
    priority: "Medium"
  });

  const [errors, setErrors] = useState({});

  const [tasks, setTasks] = useState(getTasks());

  const myTasks = tasks.filter(
    task => manager && task.assignedBy === manager.email
  );

  const handleAssign = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.title) newErrors.title = "Task title required";
    if (!form.assignedTo) newErrors.assignedTo = "Select employee";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const newTask = {
      id: Date.now(),
      title: form.title,
      assignedTo: form.assignedTo,
      assignedBy: manager.email,
      priority: form.priority,
      status: "Pending"
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));

    setForm({ title: "", assignedTo: "", priority: "Medium" });
    toast.success("Task assigned successfully ✅");
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">Assign Task</h2>

      <form onSubmit={handleAssign} className="space-y-3">

        <input
          placeholder="Task Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        <select
          className="w-full p-2 border rounded"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.email} value={emp.email}>
              {emp.username} ({emp.email})
            </option>
          ))}
        </select>
        {errors.assignedTo && <p className="text-red-500 text-sm">{errors.assignedTo}</p>}

        <select
          className="w-full p-2 border rounded"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Assign Task
        </button>

      </form>

      <h3 className="mt-8 text-xl font-bold">My Tasks</h3>

      {myTasks.length === 0 ? (
        <p className="mt-2 text-gray-500">No tasks assigned yet</p>
      ) : (
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm card-app shadow-md rounded-lg overflow-hidden">

            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Employee</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {myTasks.map(t => (
                <tr key={t.id} className="text-center border-b hover:bg-gray-100 dark:hover:bg-gray-700">

                  <td className="p-2">{t.title}</td>

                  <td className="p-2">{t.assignedTo}</td>

                  <td className={`p-2 ${t.priority === "High"
                      ? "text-red-500"
                      : t.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}>
                    {t.priority}
                  </td>

                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${t.status === "Done"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                      }`}>
                      {t.status}
                    </span>
                  </td>

                  <td className="p-2">
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
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

export default Manager;