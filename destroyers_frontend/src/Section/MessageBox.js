import React from 'react';
import { Box, Text, Button } from "@chakra-ui/react";
import axios from 'axios';
import { useChat } from "../Context/ChatContext";

const MessageBox = () => {
  const { messages, users, selectedChat, setMessages } = useChat();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isMessagesAvailable = Array.isArray(messages) && messages.length > 0;


  const getFileLink = (url) => {
    if (url.startsWith('http')) {
      return url;
    }
    return `${window.location.origin}${url}`;
  };


  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
  };

  const isPdf = (url) => {
    return /\.pdf$/i.test(url);
  };

  const parseTimestamp = (timestamp) => {
   // console.log("Timestamp is: ", timestamp);
    if (
      timestamp &&
      typeof timestamp === 'object' &&
      '_seconds' in timestamp &&
      '_nanoseconds' in timestamp
    ) {
      const ms = timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1000000);
      return new Date(ms);
    }
    if (timestamp && typeof timestamp === 'object' && typeof timestamp.toDate === 'function') {
      return timestamp.toDate();
    }
    if (typeof timestamp === 'string') {
      const date = new Date(timestamp);
      if (!isNaN(date.getTime())) return date;
    }
    return new Date(0);
  };

  const formatTimestamp = (timestamp) => {
    const date = parseTimestamp(timestamp);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  const sortedMessages = isMessagesAvailable
    ? [...messages].sort((a, b) => parseTimestamp(a.timestamp) - parseTimestamp(b.timestamp))
    : [];

  const getUsername = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : userId;
  };

  const handleDeleteMessage = async (messageId) => {
    if (!selectedChat || !selectedChat.id) {
      alert("No channel selected");
      return;
    }
    try {
      await axios.post("/remove-messages", {
        channelId: selectedChat.id,
        messageId: messageId,
      });
      setMessages(messages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error("Error deleting message", error);
    }
  };


  return (
    <Box borderColor="black" borderWidth={1} w="100%" h="80vh" padding={2}>
      <Text fontSize="xl" mb={2}>Messages</Text>
      <Box overflowY="auto" h="calc(100% - 50px)">
        {isMessagesAvailable ? (
          sortedMessages.map((message) => {
            const fileLink = getFileLink(message.content);
            return (
              <Box 
                key={message.id} 
                p={2} 
                borderBottom="1px solid black"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  {message.type === "file" ? (
                    isImage(fileLink) ? (
                      <div>
                        <Text fontSize="md">{getUsername(message.senderId)}: File attachment</Text>
                        <img 
                          src={fileLink} 
                          alt="Preview" 
                          style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "5px" }}
                        />
                      </div>
                    ) : isPdf(fileLink) ? (
                      <div>
                        <Text fontSize="md">{getUsername(message.senderId)}: PDF File</Text>
                        <iframe 
                          src={fileLink} 
                          title="PDF Preview"
                          style={{ width: "200px", height: "200px", marginTop: "5px", border: "1px solid #ccc" }}
                        >
                         Your browser does not support previews. 
                          <a href={fileLink} target="_blank" rel="noopener noreferrer">Download PDF</a>
                        </iframe>
                      </div>
                    ) : (
                      
                      <a 
                        href={fileLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: "blue", textDecoration: "underline" }}
                      >
                        {getUsername(message.senderId)}: File attachment
                      </a>
                    )
                  ) : (
                    <Text fontSize="md">
                      {getUsername(message.senderId)}: {message.content}
                    </Text>
                  )}
                  <Text fontSize="xs" color="gray.500">
                    {formatTimestamp(message.timestamp)}
                  </Text>
                </Box>
                {currentUser && selectedChat && selectedChat.channelname && 
                  (currentUser.role === "admin" || selectedChat.createdby === currentUser.id) && (
                    <Button 
                      size="sm" 
                      colorScheme="red" 
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      Delete
                    </Button>
                )}
              </Box>
            );
          })
        ) : (
          <Text>No messages</Text>
        )}
      </Box>
    </Box>
  );
};

export default MessageBox;