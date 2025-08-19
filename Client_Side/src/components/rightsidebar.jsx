

import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({ selectedUser }) => {
  if (!selectedUser) return null

  return (
    <div className="bg-[#8185B2]/10 text-white w-full relative overflow-y-auto max-h-screen">
      {/* Profile Section */}
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon} // ✅ fixed key
          alt={selectedUser?.fullName || "User Avatar"}
          className="w-20 h-20 object-cover rounded-full border border-white/20 shadow-md"
        />
        <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          {selectedUser.fullName}
        </h1>
        <p className="px-10 mx-auto">{selectedUser.bio}</p>
      </div>

      <hr className="border-[#ffffff50] my-4" />

      {/* Media Section */}
      <div className="px-5 text-xs">
        <p className="mb-2">Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
          {imagesDummyData.map((url, index) => (
            <div
              className="cursor-pointer rounded"
              key={index}
              onClick={() => window.open(url, "_blank")}
            >
              <img
                src={url}
                alt="media"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stylish Logout Button */}
      <button
        className="absolute bottom-6 left-1/2 -translate-x-1/2 
                   w-[80%] py-3 px-6 
                   bg-gradient-to-r from-purple-400/40 via-violet-500/40 to-purple-700/40 
                   backdrop-blur-xl border border-white/20 
                   text-white text-lg font-medium tracking-wide 
                   rounded-2xl shadow-lg shadow-purple-900/40 
                   transition-all duration-300 ease-in-out 
                   hover:scale-105 hover:shadow-2xl hover:shadow-purple-800/50 
                   hover:from-purple-400 hover:via-violet-500 hover:to-purple-700"
      >
        Log Out
      </button>
    </div>
  )
}

export default RightSidebar
