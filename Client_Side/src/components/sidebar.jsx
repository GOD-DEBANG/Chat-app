import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate(); // used for navigation

  return (
    <div 
      className={`h-full backdrop-blur-xl bg-black/40 border-r-2 border-gray-600 p-5 flex flex-col ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* --- Top Menu Bar (Logo + Menu) --- */}
      <div className="flex justify-between items-center mb-6">
        {/* Logo */}
        <img src={assets.logo} alt="Logo" className="max-w-32" />

        {/* Menu with Dropdown */}
        <div className="relative py-2 group">
          {/* Menu Icon */}
          <img 
            src={assets.menu_icon} 
            alt="Menu" 
            className="max-h-5 cursor-pointer" 
          />

          {/* Dropdown Menu */}
          <div className="hidden absolute top-full right-0 mt-2 z-20 w-40 p-3 rounded-md bg-gray-800 text-white shadow-lg group-hover:block">
            <p 
              onClick={() => navigate('/profile')}  
              className="cursor-pointer text-sm hover:text-blue-400"
            >
              Edit Profile
            </p>
            <hr className="my-2 border-t border-gray-600"/>
            <p className="cursor-pointer text-sm hover:text-red-400">
              Log Out
            </p>
          </div>
        </div>
      </div>

      {/* --- Quick Chat Search --- */}
      <div className="bg-[#282142] rounded-full flex items-center gap-2 py-2 px-4">
        <img src={assets.search_icon} alt="Search" className="w-4 opacity-70" />
        <input 
          type="text" 
          className="bg-transparent border-none outline-none text-white text-sm placeholder-[#c8c8c8] flex-1"
          placeholder="Search User..."
        />
      </div>
    </div>
  )
}

export default Sidebar
