
import React, { useState } from 'react';
import { Box, Flex } from "@chakra-ui/react";
import NavigationBar from "../Section/NavigationBar";
import DMView from "../Views/DMView";
import GeneralChannelsView from "../Views/GeneralChannelsView";
import PrivateChannelsView from "../Views/PrivateChannelsView";
import UserInfo from "../Section/UserInfo";
import { ChatProvider } from "../Context/ChatContext";

const ChatPage = ({ userRole }) => {
  const [activeView, setActiveView] = useState('dm'); // Default view is DM view

  const renderActiveView = () => {
    switch (activeView) {
      case 'dm':
        return <DMView />;
      case 'general':
        // Передаем setActiveView в GeneralChannelsView
        return <GeneralChannelsView userRole={userRole} setActiveView={setActiveView} />;
      case 'private':
        return <PrivateChannelsView userRole={userRole} />;
      default:
        return null;
    }
  };

  return (
    <ChatProvider>
      <Box w="100vw" h="100vh" overflow="hidden" borderWidth={1}>
        <Flex h="100vh">
          <NavigationBar setActiveView={setActiveView} />
          {renderActiveView()}
          <UserInfo />
        </Flex>
      </Box>
    </ChatProvider>
  );
};

export default ChatPage;
