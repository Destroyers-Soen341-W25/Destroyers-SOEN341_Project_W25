import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toaster} from "../components/ui/toaster";
import {Box, HStack, Input, Spinner, Image, Separator} from "@chakra-ui/react"
import SideBar from "../Section/SideBar";
import NavigationBar from "../Views/NavigationBar";


const ChatPage = () => {
    // const [search, setSearch] = useState('');//Managing the search input
    // const [message, setMessage] = useState('');//Storing the live messages
    // const [selectedMessage, setSelectedMessage] = useState('');
    // const [chat, setChat] = useState([]);//Storing the list of chats from users or channels

    // useEffect(() => {
    //     const fetchChat = async () => {
    //         try {
    //             const usersResponse=await axios.get('/all-users');
    //             const channelsResponse=await axios.get('/all-channels');
    //             const userChats=usersResponse.data.users.map(user=>({ id: user.id, name: user.name, type: 'user'}));
    //             const channelChats = channelsResponse.data.channels.map(channel => ({ id: channel.id, name: channel.name, type: 'channel' }));
    //             setChats([...userChats, ...channelChats]);
    //         }catch (error) {
    //             toaster.create({
    //                 title: 'Error',
    //                 description: "Error fetching the chats",
    //                 type: "error",
    //             })
    //         }
    //     };fetchChat();
    // },[]);


    return (
            <Box>
                <HStack>
                    <NavigationBar/>
                    <Separator colorPalette={'purple'} variant="solid" orientation="vertical" height="10" />
                    <SideBar />
                </HStack>
            </Box>
    );
};

export default ChatPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const ChatPage = () => {
//     const [search, setSearch] = useState('');
//     const [selectedChat, setSelectedChat] = useState(null);
//     const [message, setMessage] = useState('');
//     const [chats, setChats] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//
//     // Fetch users and channels
//     useEffect(() => {
//         const fetchChats = async () => {
//             try {
//                 setLoading(true);
//                 const usersResponse = await axios.get('/all-users');
//                 const channelsResponse = await axios.get('/all-channels');
//                 const userChats = usersResponse.data.users.map(user => ({ id: user.id, name: user.name, type: 'user' }));
//                 const channelChats = channelsResponse.data.channels.map(channel => ({ id: channel.id, name: channel.name, type: 'channel' }));
//                 setChats([...userChats, ...channelChats]);
//             } catch (error) {
//                 console.error('Error fetching chats:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchChats();
//     }, []);
//
//     const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(search.toLowerCase()));
//
//     // Fetch messages for selected chat
//     const fetchMessages = async (chatId) => {
//         try {
//             const response = await axios.post('/get-messages', { channelId: chatId });
//             setMessages(response.data.messages);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };
//
//     // Handle chat selection
//     const handleChatSelect = (chat) => {
//         setSelectedChat(chat);
//         fetchMessages(chat.id);
//     };
//
//     // Send message
//     const handleSendMessage = async () => {
//         if (selectedChat && message.trim()) {
//             try {
//                 await axios.post('/send-message', { channelId: selectedChat.id, message, userId: 1 });
//                 setMessages([...messages, { content: message }]);
//                 setMessage('');
//             } catch (error) {
//                 console.error('Error sending message:', error);
//             }
//         }
//     };
//
//     return (
//         <div className="flex h-screen">
//             {/* Sidebar */}
//             <div className="w-1/3 bg-gray-800 text-white p-4 flex flex-col relative">
//                 <input
//                     type="text"
//                     placeholder="Search user or group"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="p-2 mb-2 rounded bg-gray-700 text-white"
//                 />
//                 {/* Dropdown for search results */}
//                 {search && (
//                     <div className="absolute w-full bg-white shadow-md rounded-md overflow-hidden z-10 max-h-60 overflow-y-auto">
//                         {loading ? (
//                             <div className="p-3 text-center">Loading...</div>
//                         ) : filteredChats.length > 0 ? (
//                             filteredChats.map((chat) => (
//                                 <div
//                                     key={chat.id}
//                                     onClick={() => handleChatSelect(chat)}
//                                     className="p-3 hover:bg-gray-100 cursor-pointer"
//                                 >
//                                     {chat.name}
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="p-3 text-center text-gray-500">No results found</div>
//                         )}
//                     </div>
//                 )}
//                 <div className="overflow-y-auto flex-1 space-y-2 mt-2">
//                     {filteredChats.map((chat) => (
//                         <div
//                             key={chat.id}
//                             onClick={() => handleChatSelect(chat)}
//                             className={`p-2 rounded cursor-pointer ${selectedChat?.id === chat.id ? 'bg-gray-600' : 'bg-gray-700'} hover:bg-gray-600 transition ease-in-out duration-150`}
//                             style={{ transition: 'background-color 0.2s' }}
//                         >
//                             {chat.name}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//
//             {/* Chat Area */}
//             <div className="flex-1 bg-gray-100 p-4 flex flex-col justify-between">
//                 {selectedChat ? (
//                     <div className="flex flex-col h-full">
//                         <div className="flex-1 overflow-y-auto mb-4">
//                             {messages.map((msg, index) => (
//                                 <div key={index} className="p-2 bg-blue-500 text-white rounded mb-1 max-w-xs">{msg.content}</div>
//                             ))}
//                         </div>
//                         <div className="flex items-center">
//                             <input
//                                 type="text"
//                                 placeholder="Type a message..."
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 className="flex-1 p-2 rounded bg-white shadow-md mr-2"
//                             />
//                             <button
//                                 onClick={handleSendMessage}
//                                 className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                             >
//                                 Send
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="text-gray-500 text-center">Select a chat to start messaging</div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default ChatPage;
