
import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('role'); // user или admin
  const [selectedView, setSelectedView] = useState('dm');
  const [chats, setChats] = useState([]); // список dms и каналов
  const [messages, setMessages] = useState([]); // сообщения активного чата
  const [selectedChat, setSelectedChat] = useState(null); // выбранный чат
  const [status, setStatus] = useState(null); // статус пользователей
  const [users, setUsers] = useState([]); // список всех пользователей

  return (
    <ChatContext.Provider
      value={{
        userRole,
        setUserRole,
        selectedView,
        setSelectedView,
        chats,
        setChats,
        messages,
        setMessages,
        selectedChat,
        setSelectedChat,
        status,
        setStatus,
        users,
        setUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);