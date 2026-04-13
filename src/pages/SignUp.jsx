import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getUsers } from "../utils/storage";

const SignUp = () => {
  const[form,setForm] = useState({
    username:"",
    email:"",
    pwd:"",
    role:""
  })

  const [showPwd, setShowpwd] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  function handleSignup(e){
    e.preventDefault();
    let newErrors = {};
  if(!form.username) {
    newErrors.username = "Username is required";
  }
  if(!form.email) {
    newErrors.email = "Email is required";
  }
  else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Email is invalid";
  }
  if(!form.pwd) {
    newErrors.pwd = "Password is required";
  }
  else if (form.pwd.length < 6) {
    newErrors.pwd = "Password must be at least 6 characters";
  }
  if(!form.role){
    newErrors.role = "please select a role";
  }
  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  
  let users = getUsers();
  
  if(users[form.email]){
    setErrors({ email: "User already exists with this mailId" });
    return;
  }
  users[form.email]=form;
    localStorage.setItem("userinfo",JSON.stringify(users));
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <form onSubmit={handleSignup}
      className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/30">

        <h2 className="text-2xl font-bold text-center text-white">SignUp</h2>

         <div className="relative mb-6">
          <FaUser className="absolute left-3 top-3 text-white pointer-events-none" />
        <input className="peer w-full p-3 pl-10 bg-transparent border-b border-white text-white focus:outline-none" 
        type='text' placeholder=" " value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})}/>
        <label className="absolute left-10 top-3 text-white text-sm pointer-events-none transition-all peer-focus:-top-3 peer-focus:text-xs 
        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
            Username
          </label>
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div className="relative mb-6">
          <FaEnvelope className="absolute left-3 top-3 text-white pointer-events-none" />
        <input className="peer w-full p-3 pl-10 bg-transparent border-b border-white text-white focus:outline-none"
         type='email' placeholder=" " value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
         <label className="absolute left-10 top-3 text-white text-sm pointer-events-none transition-all peer-focus:-top-3 peer-focus:text-xs 
        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
            Email
          </label>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-3 text-white pointer-events-none" />
        <input  className="peer w-full p-3 pl-10 pr-10 bg-transparent border-b border-white text-white focus:outline-none"
        type={showPwd ? "text" : "password"} placeholder=" " value={form.pwd} onChange={(e)=>setForm({...form,pwd:e.target.value})}/>
        <span className="absolute right-3 top-3 text-white cursor-pointer" onClick={()=>setShowpwd(!showPwd)}>
          {showPwd ? <FaEye/> : <FaEyeSlash/>}
        </span>
        <label className="absolute left-10 top-3 text-white text-sm pointer-events-none transition-all peer-focus:-top-3 peer-focus:text-xs 
        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
          Password
        </label>

        {errors.pwd && <p className="text-red-500 text-sm">{errors.pwd}</p>}
        </div>
        <div className="relative mb-6">
          <FaUser className="absolute left-3 top-3 text-white pointer-events-none" />
          <select className = "w-full p-3 pl-10 pr-10 bg-transparent border-b border-white text-white text-sm focus:outline-none"
          value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="" disabled className='text-gray-500'>Select Role</option>
            <option value="admin" className='text-black'>Admin</option>
            <option value="hr" className='text-black'>HR</option>
            <option value="employee" className='text-black'>Employee</option>
            <option value="mgr" className='text-black'>Manager</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <button className="w-full bg-white text-purple-600 p-3 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer"
        type='submit'>SignUp</button>
        <p className="text-sm text-center mt-4 text-white/80">Already have an account? 
          <Link className="ml-1 text-white font-semibold underline cursor-pointer" to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
