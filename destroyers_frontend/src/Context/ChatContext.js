
import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Connecting to socket server
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected with socket id:", socket.id);
    });

    socket.on("newMessage", (message) => {
   
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <ChatContext.Provider value={{ messages, setMessages, selectedChat, setSelectedChat, users, setUsers }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);