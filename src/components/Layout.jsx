import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-app text-app">
      <Navbar />
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  )
}

export default Layout