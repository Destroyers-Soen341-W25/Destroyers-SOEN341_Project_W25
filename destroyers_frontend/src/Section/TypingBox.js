
import React, { useState } from 'react';
import { Box, Input, Button, HStack } from "@chakra-ui/react";
import axios from 'axios';
import { useChat } from "../Context/ChatContext";

const TypingBox = () => {
  const [newMessage, setNewMessage] = useState("");
  const { selectedChat, messages, setMessages } = useChat();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const senderId = currentUser?.id;
  


  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    try {
      if (typeof selectedChat === "object" && selectedChat.channelname) {
        // Это сообщение для канала – используем endpoint /send-message
        console.log("SENDING A CHANNEL MESSAGE:"+ selectedChat.id+ " "+ newMessage+" "+senderId );
        await axios.post("/send-message", {
            channelId: selectedChat.id,
          message: newMessage,
          userId: senderId,
        });
      } else {
        // Это личное сообщение (DM) – используем endpoint /send-dm
        await axios.post("/send-dm", {
          recipientId: selectedChat, // здесь selectedChat это id получателя
          senderId,
          message: newMessage,
        });
      }
      // Оптимистичное обновление UI – добавляем новое сообщение в состояние
      const messageObj = {
        id: Date.now(), // временный уникальный id
        senderId,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, messageObj]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box borderColor="black" borderWidth={1} w="74vw" h="10vh" padding={2}>
      <HStack spacing={2} h="100%">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </HStack>
    </Box>
  );
};

export default TypingBox;
