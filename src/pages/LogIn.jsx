import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getUsers } from "../utils/storage"

const LogIn = () => {
  const [form, setForm] = useState({
    email: "",
    pwd: ""
  })

  const [showPwd, setShowpwd] = useState(false);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (!form.email || !form.pwd) {
      setErrors("All fields are required");
      return;
    }

    let users = getUsers();

    if (users[form.email] && users[form.email].pwd === form.pwd) {
      localStorage.setItem("IsLogIn", "true");
      localStorage.setItem("loggedInUser", JSON.stringify(users[form.email]));
      navigate('/dashboard');
    } else {
      setErrors("No user Found with this mail or password....");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
    px-4 sm:px-6 md:px-8 
    bg-gradient-to-r from-blue-400 to-purple-500">

      <form
        onSubmit={handleLogin}
        className="backdrop-blur-lg bg-white/20 
        p-6 sm:p-8 md:p-10 
        rounded-2xl shadow-lg 
        w-full max-w-sm sm:max-w-md 
        border border-white/30 transition-all duration-300"
      >

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-6">
          LogIn
        </h2>

        {errors && (
          <p className="text-red-200 text-xs sm:text-sm text-center mb-4">
            {errors}
          </p>
        )}

        {/* Email */}
        <div className="relative mb-5 sm:mb-6">
          <FaEnvelope className="absolute left-3 top-3 text-white pointer-events-none" />

          <input
            className="peer w-full p-3 pl-10 bg-transparent border-b border-white text-white focus:outline-none text-sm sm:text-base"
            type='email'
            placeholder=" "
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label className="absolute left-10 top-3 text-white text-xs sm:text-sm transition-all duration-200 
            peer-focus:-top-3 peer-focus:text-xs
            peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-5 sm:mb-6">
          <FaLock className="absolute left-3 top-3 text-white pointer-events-none" />

          <input
            className="peer w-full p-3 pl-10 pr-10 bg-transparent border-b border-white text-white focus:outline-none text-sm sm:text-base"
            type={showPwd ? "text" : "password"}
            placeholder=" "
            value={form.pwd}
            onChange={(e) => setForm({ ...form, pwd: e.target.value })}
          />

          <span
            className="absolute right-3 top-3 text-white cursor-pointer"
            onClick={() => setShowpwd(!showPwd)}
          >
            {showPwd ? <FaEye /> : <FaEyeSlash />}
          </span>

          <label className="absolute left-10 top-3 text-white text-xs sm:text-sm transition-all duration-200
            peer-focus:-top-3 peer-focus:text-xs
            peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
            Password
          </label>
        </div>

        {/* Button */}
        <button
          className="w-full bg-white text-purple-600 
          p-3 rounded-lg font-semibold 
          hover:bg-gray-200 active:scale-95 
          transition text-sm sm:text-base"
          type='submit'
        >
          LogIn
        </button>

        {/* Signup link */}
        <p className="text-xs sm:text-sm text-center mt-4 text-white/80">
          Don't have an account?
          <Link className="ml-1 text-white font-semibold underline" to="/signup">
            SignUp
          </Link>
        </p>

      </form>
    </div>
  )
}

export default LogIn