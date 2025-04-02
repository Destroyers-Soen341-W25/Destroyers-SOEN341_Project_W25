
import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useChat } from "../Context/ChatContext";

const ChatHistory = () => {
  const { setUsers, users, setSelectedChat, setMessages, userStatuses, setUserStatuses   } = useChat();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser ? currentUser.id : null;
  console.log("CURRENT USER ID IS: ", currentUserId);

  useEffect(() => {
    const fetchUsersAndMessages = async () => {
      try {
        
        const usersResponse = await fetch("/all-users");
        const usersData = await usersResponse.json();
        setUsers(usersData.users);

        if (currentUserId) {
         
          const messagesResponse = await fetch("/get-dms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: currentUserId }),
          });
          const messagesData = await messagesResponse.json();

          if (messagesData.dms) {
         
            const usersWithMessages = messagesData.dms.map((dm) =>
              dm.senderId === currentUserId ? dm.receiverId : dm.senderId
            );
            const filtered = usersData.users.filter((user) =>
              usersWithMessages.includes(user.id)
            );
            setFilteredUsers(filtered);
          }
        } else {
          console.error("User ID is missing.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchUsersAndMessages();
    }
  }, [currentUserId]); 


  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = {};
      for (let user of users) {
        try {
          const response = await fetch("/get-user-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id }),
          });
          const data = await response.json();
          if (data.userdata) {
            statuses[user.id] = { 
              status: data.userdata.status, 
              lastseen: data.userdata.lastseen 
            };
          }
        } catch (err) {
          console.error(err);
        }
      }
      setUserStatuses(prev => ({ ...prev, ...statuses }));
    };
    if (users.length > 0) fetchStatuses();
  }, [users]);



  const handleUserClick = async (userId) => {
 
    setSelectedChat(userId);
    try {
      const response = await fetch("/get-dms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });
      const data = await response.json();
    
      const userMessages = data.dms.filter(
        (dm) => dm.senderId === userId || dm.receiverId === userId
      );
      setMessages(userMessages);
    } catch (error) {
      console.error("Error fetching user messages:", error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box mt="40" borderColor="black" borderWidth={1} w="17vw" h="60vh" overflowY="auto" p={2}>
      <VStack spacing={2} align="stretch">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Box
              key={user.id}
              p={2}
              borderBottom="1px solid black"
              onClick={() => handleUserClick(user.id)}
              cursor="pointer"
            >
              <Text fontSize="md"> {user.name} - {userStatuses[user.id] ? (userStatuses[user.id].status === "Online" ? "Online" : "last seen: " + userStatuses[user.id].lastseen) : "Offline"} </Text>
            </Box>
          ))
        ) : (
          <Text>No users with message history</Text>
        )}
      </VStack>
    </Box>
  );
};

export default ChatHistory;
