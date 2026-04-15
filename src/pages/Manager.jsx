import React, { useState } from "react";
import { getUser, getUsers, getTasks } from "../utils/storage";
import { toast } from "react-toastify";

const Manager = () => {
  const manager = getUser() || {};

  const employees = Object.values(getUsers()).filter(
    (u) => u.role === "employee"
  );

  const [form, setForm] = useState({
    title: "",
    assignedTo: "",
    priority: "Medium",
  });

  const [errors, setErrors] = useState({});
  const [tasks, setTasks] = useState(getTasks());

  const [openPriority, setOpenPriority] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openStatusId, setOpenStatusId] = useState(null);
  const [openEmpId, setOpenEmpId] = useState(null);

  const myTasks = tasks.filter((t) => t.assignedBy === manager.email);

  const updateStatus = (id, status) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    toast.success("Status updated");
  };

  const reassignEmployee = (id, email) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, assignedTo: email } : task
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    toast.success("Task reassigned");
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    toast.error("Task deleted");
  };

  const handleAssign = (e) => {
    e.preventDefault();

    let err = {};
    if (!form.title) err.title = "Task title required";
    if (!form.assignedTo) err.assignedTo = "Select employee";

    setErrors(err);
    if (Object.keys(err).length) return;

    const newTask = {
      id: Date.now(),
      ...form,
      assignedBy: manager.email,
      status: "Pending",
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));

    setForm({ title: "", assignedTo: "", priority: "Medium" });
    toast.success("Task assigned successfully ✅");
  };

  return (
    <div className="min-h-screen bg-app text-app py-8">

      <div className="max-w-5xl mx-auto px-4 space-y-6">

        <div className="card-app p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold">Manager Dashboard</h2>
          <p className="text-sm opacity-70 mt-1">
            Assign, manage and track tasks efficiently
          </p>
        </div>

        <div className="card-app p-6 rounded-2xl space-y-4">
          <div>
            <input
              className="w-full p-2.5 border border-app rounded-lg bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Task Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="relative">
            <div
              onClick={() => setOpenEmployee(!openEmployee)}
              className="w-full p-2.5 border border-app rounded-lg cursor-pointer flex justify-between items-center"
            >
              <span>
                {form.assignedTo
                  ? employees.find(e => e.email === form.assignedTo)?.username
                  : "Select Employee"}
              </span>
              <span className={`transition ${openEmployee ? "rotate-180" : ""}`}>
                ▾
              </span>
            </div>

            {openEmployee && (
              <div className="absolute w-full mt-2 max-h-40 overflow-y-auto card-app border border-app rounded-lg shadow z-50">
                {employees.map(emp => (
                  <div
                    key={emp.email}
                    onClick={() => {
                      setForm({ ...form, assignedTo: emp.email });
                      setOpenEmployee(false);
                    }}
                    className="px-3 py-2 cursor-pointer hover:bg-purple-500 hover:text-white"
                  >
                    {emp.username}
                  </div>
                ))}
              </div>
            )}

            {errors.assignedTo && (
              <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>
            )}
          </div>

          <div className="relative">
            <div
              onClick={() => setOpenPriority(!openPriority)}
              className="w-full p-2.5 border border-app rounded-lg cursor-pointer flex justify-between items-center"
            >
              <span>{form.priority}</span>
              <span className={`transition ${openPriority ? "rotate-180" : ""}`}>
                ▾
              </span>
            </div>

            {openPriority && (
              <div className="absolute w-full mt-2 card-app border border-app rounded-lg shadow z-50">
                {["High", "Medium", "Low"].map(p => (
                  <div
                    key={p}
                    onClick={() => {
                      setForm({ ...form, priority: p });
                      setOpenPriority(false);
                    }}
                    className="px-3 py-2 cursor-pointer hover:bg-purple-500 hover:text-white"
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleAssign}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full hover:bg-purple-700 transition"
          >
            Assign Task
          </button>
        </div>

        <div className="card-app p-6 rounded-2xl shadow-md">
          <h3 className="font-semibold mb-4">My Tasks</h3>

          {myTasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            <div className="space-y-3">

              {myTasks.map(t => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl border border-app flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-md transition"
                >

                  <div>
                    <p className="font-semibold">{t.title}</p>
                    <p className="text-sm opacity-70">{t.assignedTo}</p>
                  </div>

                  <div className="flex gap-2 flex-wrap items-center">
                    <div className="relative">
                      <div
                        onClick={() =>
                          setOpenStatusId(openStatusId === t.id ? null : t.id)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer
                        ${t.status === "Done"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                          }`}
                      >
                        {t.status}
                      </div>

                      {openStatusId === t.id && (
                        <div className="absolute mt-2 w-28 card-app border rounded shadow z-50">
                          {["Pending", "Done"].map(s => (
                            <div
                              key={s}
                              onClick={() => {
                                updateStatus(t.id, s);
                                setOpenStatusId(null);
                              }}
                              className="p-2 hover:bg-purple-500 hover:text-white cursor-pointer"
                            >
                              {s}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenEmpId(openEmpId === t.id ? null : t.id)
                        }
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Reassign
                      </button>

                      {openEmpId === t.id && (
                        <div className="absolute mt-2 w-40 card-app border rounded shadow z-50">
                          {employees.map(emp => (
                            <div
                              key={emp.email}
                              onClick={() => {
                                reassignEmployee(t.id, emp.email);
                                setOpenEmpId(null);
                              }}
                              className="p-2 hover:bg-purple-500 hover:text-white cursor-pointer"
                            >
                              {emp.username}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => deleteTask(t.id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Manager;