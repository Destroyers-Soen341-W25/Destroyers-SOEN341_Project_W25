import React from 'react';
import { Box, Text, Button } from "@chakra-ui/react";
import { useChat } from "../Context/ChatContext";
import axios from 'axios';

const ChatHeader = () => {
  const { selectedChat, setSelectedChat, setMessages, users } = useChat();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const getChatTitle = () => {
    if (!selectedChat) return "Chat Header";
    // Если selectedChat – объект с channelname, это канал
    if (typeof selectedChat === "object" && selectedChat.channelname) {
      return selectedChat.channelname;
    }
    // Иначе считаем, что это DM и ищем пользователя по id
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
      // После успешного запроса удаляем канал из выбранного чата
      setSelectedChat(null);
      setMessages([]);
    } catch (error) {
      console.error("Error leaving channel", error);
    }
  };

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
      <Text fontSize="lg">{getChatTitle()}</Text>
      {/* Показываем кнопку только если это канал (есть поле channelname) */}
      {selectedChat && typeof selectedChat === "object" && selectedChat.channelname && (
        <Button size="sm" colorScheme="red" onClick={handleLeaveChannel}>
          Leave Channel
        </Button>
      )}
    </Box>
  );
};

export default ChatHeader;