import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getUsers } from "../utils/storage";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    pwd: "",
    role: ""
  })

  const [showPwd, setShowpwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [openRole, setOpenRole] = useState(false);
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    let newErrors = {};

    if (!form.username) newErrors.username = "Username is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";

    if (!form.pwd) newErrors.pwd = "Password is required";
    else if (form.pwd.length < 6)
      newErrors.pwd = "Password must be at least 6 characters";

    if (!form.role) newErrors.role = "please select a role";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    let users = getUsers();

    if (users[form.email]) {
      setErrors({ email: "User already exists with this mailId" });
      return;
    }

    users[form.email] = form;
    localStorage.setItem("userinfo", JSON.stringify(users));
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
    px-4 sm:px-6 md:px-8 
    bg-gradient-to-r from-blue-400 to-purple-500">

      <form
        onSubmit={handleSignup}
        className="backdrop-blur-lg bg-white/20 
        p-6 sm:p-8 md:p-10 transition-all duration-300
        rounded-2xl shadow-lg 
        w-full max-w-sm sm:max-w-md md:max-w-lg 
        border border-white/30"
      >

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white">
          SignUp
        </h2>

        {/* Username */}
        <div className="relative mb-5 sm:mb-6">
          <FaUser className="absolute left-3 top-3 text-white pointer-events-none" />
          <input
            className="peer w-full p-3 pl-10 touch-manipulation bg-transparent border-b border-white text-white focus:outline-none text-sm sm:text-base"
            type='text' placeholder=" "
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <label className="absolute left-10 top-3 text-white text-xs sm:text-sm pointer-events-none transition-all 
          peer-focus:-top-3 peer-focus:text-xs 
          peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
            Username
          </label>
          {errors.username && <p className="text-red-500 text-xs sm:text-sm">{errors.username}</p>}
        </div>

        {/* Email */}
        <div className="relative mb-5 sm:mb-6">
          <FaEnvelope className="absolute left-3 top-3 text-white pointer-events-none" />
          <input
            className="peer w-full p-3 pl-10 bg-transparent touch-manipulation border-b border-white text-white focus:outline-none text-sm sm:text-base"
            type='email' placeholder=" "
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <label className="absolute left-10 top-3 text-white text-xs sm:text-sm pointer-events-none transition-all 
          peer-focus:-top-3 peer-focus:text-xs 
          peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
            Email
          </label>
          {errors.email && <p className="text-red-500 text-xs sm:text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="relative mb-5 sm:mb-6">
          <FaLock className="absolute left-3 top-3 text-white pointer-events-none" />
          <input
            className="peer w-full touch-manipulation p-3 pl-10 pr-10 bg-transparent border-b border-white text-white focus:outline-none text-sm sm:text-base"
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
          <label className="absolute left-10 top-3 text-white text-xs sm:text-sm pointer-events-none transition-all 
          peer-focus:-top-3 peer-focus:text-xs 
          peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
            Password
          </label>

          {errors.pwd && <p className="text-red-500 text-xs sm:text-sm">{errors.pwd}</p>}
        </div>

        {/* Role */}
        <div className="relative mb-5 sm:mb-6">

          <FaUser className="absolute left-3 top-3 text-white pointer-events-none" />

          <div
            onClick={() => setOpenRole(!openRole)}
            className="w-full p-3 pl-10 pr-10 bg-transparent border-b border-white text-white cursor-pointer text-sm sm:text-base select-none"
          >
            {form.role ? form.role.toUpperCase() : "Select Role"}
          </div>

          {openRole && (
            <div className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden max-h-48 overflow-y-auto">
              {["admin", "hr", "employee", "mgr"].map((role) => (
                <div
                  key={role}
                  onClick={() => {
                    setForm({ ...form, role });
                    setOpenRole(false);
                  }}
                  className="px-4 py-2 text-black hover:bg-purple-200 cursor-pointer transition"
                >
                  {role.toUpperCase()}
                </div>
              ))}

            </div>
          )}

          {errors.role && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {/* Button */}
        <button
          className="w-full bg-white text-purple-600 
          p-3 rounded-lg font-semibold active:scale-95
          hover:bg-gray-200 transition cursor-pointer 
          text-sm sm:text-base"
          type='submit'>
          SignUp
        </button>

        {/* Login link */}
        <p className="text-xs sm:text-sm text-center mt-4 text-white/80">
          Already have an account?
          <Link className="ml-1 text-white font-semibold underline cursor-pointer" to="/login">
            Login
          </Link>
        </p>

      </form>
    </div>
  )
}

export default SignUp