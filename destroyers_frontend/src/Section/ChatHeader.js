import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import { useChat } from "../Context/ChatContext";

const ChatHeader = () => {
  const { selectedChat, users } = useChat();

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

  return (
    <Box borderColor="black" w="74vw" h="8vh" padding={2} borderWidth={1}>
      <Text fontSize="lg">{getChatTitle()}</Text>
    </Box>
  );
};

export default ChatHeader;