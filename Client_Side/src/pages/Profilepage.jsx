

import React, { useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Profilepage = () => {
  const [selectedImg, setSelectedImg] = useState(null)
  const [name, setName] = useState("Debang Kuswaha")
  const [bio, setBio] = useState("Hello World")
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        
        {/* Form Section */}
        <form className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg font-semibold'>Profile Details</h3>

          {/* Profile Image Upload */}
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input 
              type="file" 
              id="avatar" 
              accept=".jpeg, .jpg, .png" 
              hidden 
              onChange={(e) => setSelectedImg(e.target.files[0])} 
            />
            <img 
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
              alt="Profile Avatar"  
              className={`w-12 h-12 object-cover border ${selectedImg ? 'rounded-full' : ''}`} 
            />
            <span>Upload profile image</span>
          </label>

          {/* Name Field */}
          <div>
            <label className="block mb-1">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-2 rounded bg-transparent border border-gray-500 outline-none" 
            />
          </div>

          {/* Bio Field */}
          <div>
            <label className="block mb-1">Bio</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              className="w-full p-2 rounded bg-transparent border border-gray-500 outline-none resize-none" 
              rows={3}
            />
          </div>

          {/* Save Button */}
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="bg-violet-600 hover:bg-violet-700 transition-colors p-2 rounded-lg text-white"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profilepage
