import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from "../utils/storage";

const Profile = () => {
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    localStorage.removeItem("IsLogIn");
    localStorage.removeItem("loggedInUser");
    navigate('/login');
  }

  return (

    <div className="flex flex-col md:flex-row mt-6">
      <div className="w-full md:w-1/4 shadow-md rounded-lg p-6 mx-4 md:mx-6 mb-6 md:mb-0">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-purple-600 text-white flex items-center justify-center text-3xl font-bold rounded-full mb-4">
            {user.username[0].toUpperCase()}
          </div>
          <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
          <p className="text-white-600 mb-4">{user.role.toUpperCase()}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-purple-600 text-white font-bold py-2 cursor-pointer rounded-lg hover:bg-purple-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 shadow-md rounded-lg p-6 mx-4 md:mx-0">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Profile Details</h2>

        <div className="space-y-4 text-white-700">
          <div>
            <span className="font-semibold">Name:</span> {user.username}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Role:</span> {user.role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;