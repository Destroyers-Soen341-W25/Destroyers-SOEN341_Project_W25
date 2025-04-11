// import React from 'react';
// import { Box, Text, Button } from "@chakra-ui/react";
// import { useChat } from "../Context/ChatContext";
// import axios from 'axios';
//
// const ChatHeader = () => {
//   const { selectedChat, setSelectedChat, setMessages, users, userStatuses } = useChat();
//   const currentUser = JSON.parse(localStorage.getItem("user"));
//
//
//   const getChatTitle = () => {
//     if (!selectedChat) return "Chat Header";
//     // Если selectedChat – объект с channelname, это канал
//     if (typeof selectedChat === "object" && selectedChat.channelname) {
//       return selectedChat.channelname;
//     }
//     // Иначе считаем, что это DM и ищем пользователя по id
//     const chatUser = users.find(user => user.id === selectedChat);
//     return chatUser ? chatUser.name : "Unknown User";
//   };
//
//   const handleLeaveChannel = async () => {
//     if (!selectedChat || !selectedChat.id) return;
//     try {
//       await axios.post("/deassign-user", {
//         channelId: selectedChat.id,
//         userId: currentUser.id,
//       });
//       // После успешного запроса удаляем канал из выбранного чата
//       setSelectedChat(null);
//       setMessages([]);
//     } catch (error) {
//       console.error("Error leaving channel", error);
//     }
//   };
//
//   function getOnlineCount(memberIds) {
//     return memberIds?.filter(id => userStatuses[id]?.status === 'online').length || 0;
//   }
//
//
//   return (
//     // <Box
//     //   borderColor="black"
//     //   w="74vw"
//     //   h="8vh"
//     //   padding={2}
//     //   borderWidth={1}
//     //   display="flex"
//     //   alignItems="center"
//     //   justifyContent="space-between"
//     // >
//     //   <Text fontSize="lg">{getChatTitle()}</Text>
//     //   {/* Показываем кнопку только если это канал (есть поле channelname) */}
//     //   {selectedChat && typeof selectedChat === "object" && selectedChat.channelname && (
//     //     <Button size="sm" colorScheme="red" onClick={handleLeaveChannel}>
//     //       Leave Channel
//     //     </Button>
//     //   )}
//     // </Box>
//
//
//       // <Box
//       //     borderColor="black"
//       //     w="74vw"
//       //     h="8vh"
//       //     padding={2}
//       //     borderWidth={1}
//       //     display="flex"
//       //     alignItems="center"
//       //     justifyContent="space-between"
//       // >
//       //   <Box>
//       //     <Text fontSize="lg">{getChatTitle()}</Text>
//       //
//       //     {selectedChat && typeof selectedChat === "object" && !selectedChat.channelname ? (
//       //         // DM View
//       //         <>
//       //           {userStatuses[selectedChat._id] && (
//       //               <Text fontSize="sm" color={userStatuses[selectedChat._id].status === "online" ? "green" : "gray"}>
//       //                 {userStatuses[selectedChat._id].status === "online"
//       //                     ? "Online"
//       //                     : `Offline • Last seen ${new Date(userStatuses[selectedChat._id].lastseen).toLocaleString()}`}
//       //               </Text>
//       //           )}
//       //         </>
//       //     ) : (
//       //         // Channel View (General or Private)
//       //         <>
//       //           {selectedChat.members && (
//       //               <Text fontSize="sm" color="gray.600">
//       //                 {selectedChat.members.length} members • {selectedChat.members.filter(id => userStatuses[id]?.status === "online").length} online
//       //               </Text>
//       //           )}
//       //         </>
//       //     )}
//       //   </Box>
//       //
//       //   {selectedChat && typeof selectedChat === "object" && selectedChat.channelname && (
//       //       <Button size="sm" colorScheme="red" onClick={handleLeaveChannel}>
//       //         Leave Channel
//       //       </Button>
//       //   )}
//       //</Box>
//
//       <Box
//           borderColor="black"
//           w="74vw"
//           h="8vh"
//           padding={2}
//           borderWidth={1}
//           display="flex"
//           alignItems="center"
//           justifyContent="space-between"
//       >
//         <Box>
//           <Text fontSize="lg">{getChatTitle()}</Text>
//
//           {/* DM View: Show status */}
//           {selectedChat?.isDM && userStatuses[selectedChat.userId] && (
//               <Text fontSize="sm" color="gray.600">
//                 {userStatuses[selectedChat.userId].status === 'online'
//                     ? 'Online'
//                     : `Offline • Last seen ${new Date(userStatuses[selectedChat.userId].lastseen).toLocaleString()}`}
//               </Text>
//           )}
//
//           {/* Channel Views: Show member count and online count */}
//           {selectedChat?.channelname && (
//               <Text fontSize="sm" color="gray.600">
//                 {selectedChat.members?.length || 0} members • {getOnlineCount(selectedChat.members)} online
//               </Text>
//           )}
//         </Box>
//
//         {selectedChat?.channelname && (
//             <Button size="sm" colorScheme="red" onClick={handleLeaveChannel}>
//               Leave Channel
//             </Button>
//         )}
//       </Box>
//
//
//   );
// };
//
// export default ChatHeader;

import React from 'react';
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useChat } from "../Context/ChatContext";
import axios from 'axios';

const ChatHeader = () => {
  const { selectedChat, setSelectedChat, setMessages, users, userStatuses } = useChat();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const getChatTitle = () => {
    if (!selectedChat) return "Chat Header";
    // If selectedChat is an object with channelname, it's a channel
    if (typeof selectedChat === "object" && selectedChat.channelname) {
      return selectedChat.channelname;
    }
    // Otherwise it's a DM, find user by id
    const chatUser = users.find(user => user.id === selectedChat);
    return chatUser ? chatUser.name : "Unknown User";
  };

  const handleLeaveChannel = async () => {
    if (!selectedChat || !selectedChat.id) return;
    try {
      await axios.post("/deassign-user", {
        channelId: selectedChat.id,
        userId: currentUser.id,
      });
      // After successful request, remove channel from selected chat
      setSelectedChat(null);
      setMessages([]);
    } catch (error) {
      console.error("Error leaving channel", error);
    }
  };

  function getOnlineCount(memberIds) {
    return memberIds?.filter(id => userStatuses[id]?.status === 'online').length || 0;
  }

  // Format last seen time in a user-friendly way
  const formatLastSeen = (timestamp) => {
    if (!timestamp) return 'Unknown';

    const lastSeenDate = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - lastSeenDate;

    // Less than a minute
    if (diffInMs < 60000) {
      return "just now";
    }

    // Less than an hour
    if (diffInMs < 3600000) {
      const minutes = Math.floor(diffInMs / 60000);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    // Less than a day
    if (diffInMs < 86400000) {
      const hours = Math.floor(diffInMs / 3600000);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }

    // Format as date if more than a day
    return lastSeenDate.toLocaleString();
  };

  // Get user status for DM chat
  const getDmUserStatus = () => {
    // For DM view
    if (typeof selectedChat === 'string') {
      const status = userStatuses[selectedChat];
      return status;
    }
    return null;
  };

  const userStatus = getDmUserStatus();

  return (
      <Box
          borderColor="black"
          w="74vw"
          h="8vh"
          padding={2}
          borderWidth={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold">{getChatTitle()}</Text>

          {/* DM View: Show status */}
          {typeof selectedChat === 'string' && userStatus && (
              <Flex alignItems="center">
                <Box
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    bg={userStatus.status === 'online' ? "green.400" : "red.400"}
                    mr={2}
                />
                <Text fontSize="sm" color="gray.600">
                  {userStatus.status === 'online'
                      ? 'Online'
                      : `Offline • Last seen ${formatLastSeen(userStatus.lastseen)}`}
                </Text>
              </Flex>
          )}

          {/* Channel Views: Show member count and online count */}
          {selectedChat?.channelname && (
              <Text fontSize="sm" color="gray.600">
                {/*{selectedChat.members?.length || 0} members • {getOnlineCount(selectedChat.members)} online*/}
              </Text>
          )}
        </Box>

        {selectedChat?.channelname && (
            <Button size="sm" colorScheme="red" onClick={handleLeaveChannel}>
              Leave Channel
            </Button>
        )}
      </Box>
  );
};

export default ChatHeader;