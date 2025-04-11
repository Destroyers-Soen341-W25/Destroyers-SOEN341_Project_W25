
import React, { useEffect } from 'react';
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useChat } from "../Context/ChatContext";
import axios from 'axios';

const ChatHeader = () => {
  const { selectedChat, setSelectedChat, setMessages, users, userStatuses } = useChat();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Debug logging for the selectedChat object
  useEffect(() => {
    if (selectedChat && typeof selectedChat === 'object') {
      console.log("Selected Channel Data:", selectedChat);
      console.log("Channel Members Structure:", {
        members: selectedChat.members,
        memberIds: selectedChat.memberIds,
        users: selectedChat.users,
        userIds: selectedChat.userIds
      });
    }
  }, [selectedChat]);

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

  // Calculate member count for channel with detailed logging
  const getMemberCount = () => {
    if (!selectedChat || typeof selectedChat !== 'object') {
      return 0;
    }

    // Check all possible member arrays
    const memberArrays = [
      { name: 'members', value: selectedChat.members },
      { name: 'memberIds', value: selectedChat.memberIds },
      { name: 'users', value: selectedChat.users },
      { name: 'userIds', value: selectedChat.userIds },
      { name: 'assignedUsers', value: selectedChat.assignedUsers }
    ];

    // Log all potential member fields for debugging
    console.log("Potential member fields:", memberArrays.map(arr => ({
      name: arr.name,
      isArray: Array.isArray(arr.value),
      length: Array.isArray(arr.value) ? arr.value.length : 0,
      value: arr.value
    })));

    // Find the first valid member array
    for (const arr of memberArrays) {
      if (Array.isArray(arr.value) && arr.value.length > 0) {
        console.log(`Using ${arr.name} for member count: ${arr.value.length}`);
        return arr.value.length;
      }
    }

    // If we have a users object with IDs as keys
    if (selectedChat.users && typeof selectedChat.users === 'object' && !Array.isArray(selectedChat.users)) {
      const count = Object.keys(selectedChat.users).length;
      console.log(`Using users object keys for member count: ${count}`);
      return count;
    }

    console.log("No valid member array found, returning 0");
    return 0;
  };

  // Get array of member IDs for online count
  const getMemberIds = () => {
    if (!selectedChat || typeof selectedChat !== 'object') {
      return [];
    }

    // Check all possible member ID arrays
    if (Array.isArray(selectedChat.members)) {
      if (typeof selectedChat.members[0] === 'string') {
        return selectedChat.members;
      } else if (selectedChat.members[0] && typeof selectedChat.members[0] === 'object' && selectedChat.members[0].id) {
        return selectedChat.members.map(member => member.id);
      }
    }

    if (Array.isArray(selectedChat.memberIds)) {
      return selectedChat.memberIds;
    }

    if (Array.isArray(selectedChat.users)) {
      if (typeof selectedChat.users[0] === 'string') {
        return selectedChat.users;
      } else if (selectedChat.users[0] && typeof selectedChat.users[0] === 'object' && selectedChat.users[0].id) {
        return selectedChat.users.map(user => user.id);
      }
    }

    if (Array.isArray(selectedChat.userIds)) {
      return selectedChat.userIds;
    }

    if (Array.isArray(selectedChat.assignedUsers)) {
      if (typeof selectedChat.assignedUsers[0] === 'string') {
        return selectedChat.assignedUsers;
      } else if (selectedChat.assignedUsers[0] && typeof selectedChat.assignedUsers[0] === 'object' && selectedChat.assignedUsers[0].id) {
        return selectedChat.assignedUsers.map(user => user.id);
      }
    }

    // If users is an object with IDs as keys
    if (selectedChat.users && typeof selectedChat.users === 'object' && !Array.isArray(selectedChat.users)) {
      return Object.keys(selectedChat.users);
    }

    return [];
  };

  // Count online users
  const getOnlineCount = (memberIds) => {
    if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
      return 0;
    }

    console.log("Checking online status for members:", memberIds);
    console.log("Available user statuses:", userStatuses);

    // Count members with 'Online' status
    const onlineCount = memberIds.filter(id =>
        userStatuses[id] && userStatuses[id].status === 'Online'
    ).length;

    console.log("Online count result:", onlineCount);
    return onlineCount;
  };

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

  // Get the member count and member IDs
  const memberCount = selectedChat?.channelname ? getMemberCount() : 0;
  const memberIds = selectedChat?.channelname ? getMemberIds() : [];
  const onlineCount = selectedChat?.channelname ? getOnlineCount(memberIds) : 0;

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
                    bg={userStatus.status === 'Online' ? "green.400" : "gray.400"}
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
                {memberCount} members • {onlineCount} online
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