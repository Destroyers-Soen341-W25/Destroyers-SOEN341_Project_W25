
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
    if (!memberIds || !Array.isArray(memberIds)) return 0;

    // Count members with 'Online' status (capital 'O' to match your data)
    return memberIds.filter(id =>
        userStatuses[id] && userStatuses[id].status === 'Online'
    ).length;
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

  // Calculate member count for channel
  const getMemberCount = () => {
    if (selectedChat?.members && Array.isArray(selectedChat.members)) {
      return selectedChat.members.length;
    }

    // Also check for memberIds which might be an alternative property name
    if (selectedChat?.memberIds && Array.isArray(selectedChat.memberIds)) {
      return selectedChat.memberIds.length;
    }

    // Check if we have users assigned to the channel
    if (selectedChat?.users && Array.isArray(selectedChat.users)) {
      return selectedChat.users.length;
    }

    return 0;
  };

  // Get array of member IDs, checking different possible property names
  const getMemberIds = () => {
    if (selectedChat?.members && Array.isArray(selectedChat.members)) {
      return selectedChat.members;
    }

    if (selectedChat?.memberIds && Array.isArray(selectedChat.memberIds)) {
      return selectedChat.memberIds;
    }

    if (selectedChat?.users && Array.isArray(selectedChat.users)) {
      return selectedChat.users;
    }

    return [];
  };

  // Debug log to see status values
  console.log("DM User Status:", userStatus);

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
                    bg={userStatus.status === 'Online' ? "green.500" : "red.500"}
                    mr={2}
                />
                <Text fontSize="sm" color="gray.600">
                  {userStatus.status === 'Online'
                      ? 'Online'
                      : `Offline • Last seen ${formatLastSeen(userStatus.lastseen)}`}
                </Text>
              </Flex>
          )}

          {/* Channel Views: Show member count and online count */}
          {selectedChat?.channelname && (
              <Text fontSize="sm" color="gray.600">
                {getMemberCount()} members • {getOnlineCount(getMemberIds())} online
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