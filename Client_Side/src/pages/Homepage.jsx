import React, { useState } from 'react';
import bgImage from '../assets/bgImage.svg';
import Sidebar from '../components/sidebar';
import ChatContainer from '../components/chatcontainer';
import RightSidebar from '../components/rightsidebar';

const Homepage = () => {
  const [selectedUser, setSelectedUser] = useState(false);

  return (
    <div
      className="border w-full h-screen sm:px-10 px-5 py-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative ${
          selectedUser
            ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
            : 'md:grid-cols-2'
        }`}
      >
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  );
};

export default Homepage;
