import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import './App.css';
import Admin from './pages/Admin';
import HR from './pages/HR';
import Employee from './pages/Employee';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import UserDashboard from './pages/UserDashboard'
import Layout from './components/Layout'
import Manager from "./pages/Manager";
import EmployeeTasks from "./pages/EmployeeTasks";
import Managers from "./pages/Managers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen bg-app text-app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout></ProtectedRoute>} />

          <Route path='/user-dashboard' element={
            <ProtectedRoute><Layout><UserDashboard /></Layout></ProtectedRoute>
          } />
          <Route path='/admin' element={
            <ProtectedRoute role={["admin"]}><Layout><Admin /></Layout></ProtectedRoute>
          } />

          <Route path='/hr' element={
            <ProtectedRoute role={['admin', 'hr']}><Layout><HR /></Layout></ProtectedRoute>
          } />

          <Route path='/employee' element={
            <ProtectedRoute role={['admin', 'hr', 'employee', 'mgr']}><Layout><Employee /></Layout></ProtectedRoute>
          } />

          <Route path='/profile' element={
            <ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>
          } />

          <Route path='/settings' element={
            <ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>
          } />
          <Route path="/managers"
            element={
              <ProtectedRoute role={["admin", "hr"]}>
                <Layout><Managers /></Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/manager"
            element={
              <ProtectedRoute role={["mgr"]}>
                <Layout><Manager /></Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/tasks"
            element={
              <ProtectedRoute role={["employee"]}>
                <Layout><EmployeeTasks /></Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastClassName="!w-auto !max-w-[90%] sm:!max-w-md !mx-auto !text-sm" />
    </div>
  )
}

export default App
