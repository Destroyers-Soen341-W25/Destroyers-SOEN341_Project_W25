
import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useChat } from "../Context/ChatContext";

const ChatHistory = () => {
  const { setUsers, users, setSelectedChat, setMessages } = useChat();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser ? currentUser.id : null;
  console.log("CURRENT USER ID IS: ", currentUserId);

  useEffect(() => {
    const fetchUsersAndMessages = async () => {
      try {
        // Получаем список всех пользователей
        const usersResponse = await fetch("/all-users");
        const usersData = await usersResponse.json();
        setUsers(usersData.users);

        if (currentUserId) {
          // Получаем историю сообщений для текущего пользователя
          const messagesResponse = await fetch("/get-dms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: currentUserId }),
          });
          const messagesData = await messagesResponse.json();

          if (messagesData.dms) {
            // Определяем, с кем есть переписка
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
  }, [currentUserId]); // Только currentUserId в зависимостях

  const handleUserClick = async (userId) => {
    // Устанавливаем выбранный чат через контекст
    setSelectedChat(userId);
    try {
      const response = await fetch("/get-dms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });
      const data = await response.json();
      // Фильтруем сообщения для выбранного пользователя
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
              <Text fontSize="md">{user.name}</Text>
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
