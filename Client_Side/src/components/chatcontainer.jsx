import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import assets, { messagesDummyData, userDummyData } from "../assets/assets";
import { formatMessageTime } from "../library/util";

const ChatContainer = ({ selectedUser, setSelectedUser, senderProfileImage }) => {
  const [messages, setMessages] = useState(messagesDummyData);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Current logged-in user (mock: first from userDummyData)
  const currentUser = userDummyData[0];

  // Scroll when messages update
  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Scroll after image loads
  useEffect(() => {
    const images = document.querySelectorAll(".chat-message img");
    images.forEach((img) => {
      img.onload = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() || imagePreview) {
      const newMessage = {
        _id: Date.now().toString(),
        senderId: currentUser._id,
        receiverId: selectedUser._id,
        text: message || null,
        image: imagePreview || null,
        seen: false,
        createdAt: new Date().toISOString(),
      };

      setMessages([...messages, newMessage]);
      setMessage("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return selectedUser ? (
    <div className="h-full flex flex-col relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>

      {/* Chat Area */}
      <div
        className="flex-1 overflow-y-auto p-4 
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-gray-800 
        [&::-webkit-scrollbar-thumb]:bg-violet-500 
        [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {messages
          .filter(
            (msg) =>
              (msg.senderId === currentUser._id &&
                msg.receiverId === selectedUser._id) ||
              (msg.senderId === selectedUser._id &&
                msg.receiverId === currentUser._id)
          )
          .map((msg) => {
            const isSender = msg.senderId === currentUser._id;
            const senderUser = userDummyData.find(
              (u) => u._id === msg.senderId
            );
            const profilePic = isSender
              ? senderProfileImage || currentUser.profilePic
              : senderUser?.profilePic || assets.avatar_icon;

            return (
              <div
                key={msg._id}
                className={`flex mb-4 ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-end gap-2 max-w-[80%] ${
                    isSender ? "flex-row-reverse" : ""
                  }`}
                >
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className={`${isSender ? "text-right" : ""}`}>
                    {msg.image ? (
                      <img
                        src={msg.image}
                        alt="Uploaded"
                        className={`chat-message max-w-[200px] max-h-[200px] rounded-lg border ${
                          isSender
                            ? "border-violet-500/30"
                            : "border-gray-700"
                        }`}
                      />
                    ) : (
                      <p
                        className={`chat-message p-2 text-sm text-white 
                        ${
                          isSender
                            ? "bg-violet-500/30 rounded-l-lg rounded-tr-lg"
                            : "bg-gray-700/30 rounded-r-lg rounded-tl-lg"
                        }`}
                      >
                        {msg.text}
                      </p>
                    )}
                    <span className="text-xs text-gray-400 block mt-1">
                      {formatMessageTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-700/50 bg-gray-900/50">
        <div className="relative">
          {imagePreview && (
            <div className="absolute bottom-16 left-2 rounded-lg border border-violet-500/30 overflow-hidden w-24 h-24 z-10">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-1 right-1 bg-gray-800/80 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              hidden
            />
            <label
              htmlFor="image"
              className="p-2 rounded-full hover:bg-white/10 cursor-pointer"
            >
              <img src={assets.gallery_icon} alt="Attach" className="w-5" />
            </label>

            <div className="flex-1 rounded-full overflow-hidden bg-gray-800 border border-gray-700">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full bg-transparent p-2 text-sm text-white outline-none px-4"
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!message.trim() && !imagePreview}
              className="p-2 rounded-full bg-violet-500/30 hover:bg-violet-500/40 disabled:opacity-50 transition-colors"
            >
              <img src={assets.send_button} alt="Send" className="w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full">
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-lg font-medium text-white">
        Chat any time and anywhere
      </p>
    </div>
  );
};

export default ChatContainer;
