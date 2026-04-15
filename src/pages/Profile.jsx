import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/storage";

const Profile = () => {
  const navigate = useNavigate();
  const user = getUser() || {};

  function handleLogout() {
    localStorage.removeItem("IsLogIn");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-app text-app px-4 sm:px-6 md:px-10 py-8">

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          My Profile
        </h1>
        <p className="opacity-70 text-sm sm:text-base">
          Manage your account information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="card-app rounded-xl shadow-md p-6 text-center">

          <div className="w-24 h-24 mx-auto bg-purple-600 text-white flex items-center justify-center text-3xl font-bold rounded-full mb-4 shadow">
            {(user?.username?.charAt(0) || "U").toUpperCase()}
          </div>

          <h3 className="text-lg font-semibold">
            {user.username || "Unknown User"}
          </h3>

          <p className="opacity-70 mb-6 capitalize">
            {user.role || "User"}
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2.5 rounded-lg font-medium
            hover:bg-red-600 active:scale-95 transition"
          >
            Logout
          </button>
        </div>

        <div className="md:col-span-2 card-app rounded-xl shadow-md p-6">

          <h2 className="text-xl font-semibold border-b border-app pb-3 mb-4">
            Profile Details
          </h2>

          <div className="space-y-4">

            <div className="p-3 rounded-lg bg-app border border-app">
              <p className="text-xs opacity-70">Name</p>
              <p className="font-medium">
                {user.username || "-"}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-app border border-app">
              <p className="text-xs opacity-70">Email</p>
              <p className="font-medium break-all">
                {user.email || "-"}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-app border border-app">
              <p className="text-xs opacity-70">Role</p>
              <p className="font-medium capitalize">
                {user.role || "-"}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;