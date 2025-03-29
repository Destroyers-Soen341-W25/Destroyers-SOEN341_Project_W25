import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import { useChat } from "../Context/ChatContext";

const MessageBox = () => {
  const { messages, users } = useChat();
  console.log("Messages from context: ", messages);

  const isMessagesAvailable = Array.isArray(messages) && messages.length > 0;

  // Функция для парсинга timestamp независимо от его типа
  const parseTimestamp = (timestamp) => {
    if (typeof timestamp === 'string') {
      // Если строка содержит " at ", удаляем его
      if (timestamp.includes(' at ')) {
        return new Date(timestamp.replace(' at ', ' '));
      } else {
        return new Date(timestamp);
      }
    }
    // Если timestamp – число или уже Date, преобразуем его в Date
    return new Date(timestamp);
  };

  // Функция для форматирования timestamp в строку
  const formatTimestamp = (timestamp) => {
    const date = parseTimestamp(timestamp);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  // Сортировка сообщений по времени в хронологическом порядке
  const sortedMessages = isMessagesAvailable
    ? [...messages].sort((a, b) => parseTimestamp(a.timestamp) - parseTimestamp(b.timestamp))
    : [];

    console.log("Messages are: ", sortedMessages);

  // Функция для получения username по id
  const getUsername = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : userId;
  };

  return (
    <Box borderColor="black" borderWidth={1} w="100%" h="80vh" padding={2}>
      <Text fontSize="xl" mb={2}>Messages</Text>
      <Box overflowY="auto" h="calc(100% - 50px)">
        {isMessagesAvailable ? (
          sortedMessages.map((message) => (
            <Box key={message.id} p={2} borderBottom="1px solid black">
              <Text fontSize="md">
                {getUsername(message.senderId)}: {message.content}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {formatTimestamp(message.timestamp)}
              </Text>
            </Box>
          ))
        ) : (
          <Text>No messages</Text>
        )}
      </Box>
    </Box>
  );
};

export default MessageBox;