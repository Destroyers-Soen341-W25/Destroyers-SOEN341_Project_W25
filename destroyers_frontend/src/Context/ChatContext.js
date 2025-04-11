
import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [users, setUsers] = useState([]);
  const [userStatuses, setUserStatuses] = useState({});
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Connecting to socket server
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected with socket id:", socket.id);
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        const currentUser = JSON.parse(storedUser);
        socket.emit('userConnected', currentUser.id);
      }
    });

    socket.on("newMessage", (message) => {
   
      setMessages(prevMessages => [...prevMessages, message]);
    });


    socket.on("userStatusUpdate", ({ userId, status, lastseen }) => {
      setUserStatuses(prev => ({ ...prev, [userId]: { status, lastseen } }));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <ChatContext.Provider value={{ messages, setMessages, selectedChat, setSelectedChat, users, setUsers, userStatuses, setUserStatuses, chats, setChats  }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);