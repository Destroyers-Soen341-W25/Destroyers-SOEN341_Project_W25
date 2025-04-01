
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
  
    setNewMessage("");
  
    try {
      let response, serverMessage;
  
      if (typeof selectedChat === "object" && selectedChat.channelname) {
        response = await axios.post("/send-message", {
          channelId: selectedChat.id,
          message: newMessage,
          userId: senderId,
        });
        serverMessage = {
          id: response.data.messageId,
          senderId: response.data.senderId,
          content: response.data.content,
          timestamp: response.data.timestamp,
        };
      } else {
        response = await axios.post("/send-dm", {
          recipientId: selectedChat,
          senderId,
          message: newMessage,
        });
        serverMessage = response.data.message;
      }
  
      console.log("serverMessage is: ", serverMessage);
  
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
