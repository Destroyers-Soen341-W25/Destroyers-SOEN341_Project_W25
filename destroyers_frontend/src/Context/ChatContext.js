import React, {createContext, useContext, useState} from 'react';

const ChatContext = createContext(undefined, undefined);

export const ChatProvider = ({children}) => {
    const [userRole, setUserRole] = useState('role');//For role being an user, admin or superadmin
    const [selectedView, setSelectedView] = useState('dm');//For the current view options with default view being dm
    const [chatsList, setChatsList] = useState([]);//For the list of channels' or dms' chats
    const [messages, setMessages] = useState([]);//For the active chat's messages in the message box
    const [selectedChat, setSelectedChat] = useState(null);//To keep track of the active chat being operated
    const [status, setStatus] = useState(null);//Users real-time status

    return (
        <ChatContext.Provider value={{
            userRole,
            setUserRole,
            selectedView,
            setSelectedView,
            chatsList,
            setChatsList,
            messages,
            setMessages,
            selectedChat,
            setSelectedChat,
            status,
            setStatus,
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = ()=> useContext(ChatContext);
