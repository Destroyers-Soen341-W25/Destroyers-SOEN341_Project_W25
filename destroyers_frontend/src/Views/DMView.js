import React from 'react';
import SideBar from "../Section/SideBar";
import { Box, HStack } from "@chakra-ui/react";
import ChatBox from "../Section/ChatBox";
import { useChat } from "../Context/ChatContext";

const DmView = () => {
  const { selectedChat } = useChat();
  console.log("DMView - chat selected: ", selectedChat);
  return (
    <HStack>
      <Box flex="1" display="flex">
        <SideBar />
        {selectedChat ? (
          <ChatBox />
        ) : (
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderWidth={1}
          >
            Please select a user to start chatting.
          </Box>
        )}
      </Box>
    </HStack>
  );
};

export default DmView;
