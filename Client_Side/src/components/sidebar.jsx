import React from 'react'
import assets, { userDummyData } from '../assets/assets'
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
      <div className="bg-[#282142] rounded-full flex items-center gap-2 py-2 px-4 mb-6">
        <img src={assets.search_icon} alt="Search" className="w-4 opacity-70" />
        <input 
          type="text" 
          className="bg-transparent border-none outline-none text-white text-sm placeholder-[#c8c8c8] flex-1"
          placeholder="Search User..."
        />
      </div>

      {/* --- User List --- */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        {userDummyData.map((user, index) => (
          <div 
            key={index}
            onClick={() => setSelectedUser(user)}
            className={`relative flex items-center gap-2 pl-4 py-2 rounded-lg cursor-pointer transition-colors duration-200
              ${selectedUser?._id === user._id ? 'bg-[#282142]/70' : 'hover:bg-[#282142]/40'}`}
          >
            {/* Profile Pic */}
            <img 
              src={user?.profilePic || assets.avatar_icon} 
              alt="User" 
              className="w-[35px] h-[35px] rounded-full object-cover" 
            />

            {/* User Info */}
            <div className="flex flex-col leading-5">
              <p className="text-white text-sm">{user.fullName}</p>
              {index < 3 ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>

            {/* Notification Badge */}
            {index < 2 && (
              <p className="absolute top-3 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/70 text-white">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
