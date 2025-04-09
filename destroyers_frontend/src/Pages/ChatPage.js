import React, { useState, useEffect } from 'react';
import { Box, Flex } from "@chakra-ui/react";
import NavigationBar from "../Section/NavigationBar";
import DMView from "../Views/DMView";
import GeneralChannelsView from "../Views/GeneralChannelsView";
import PrivateChannelsView from "../Views/PrivateChannelsView";
import CreateChannelView from "../Views/CreateChannelView";
import UserInfo from "../Section/UserInfo";
import { ChatProvider } from "../Context/ChatContext";
import DestroyersJrWelcome from '../DestroyersJr/DestroyersJrWelcome'; // Adjust path if needed

const ChatPage = ({ userRole }) => {
  const [activeView, setActiveView] = useState('dm'); // Default view is DM
  const [showWelcome, setShowWelcome] = useState(false); // Show Destroyers Jr. state

  // Trigger welcome bot on first load (once per session)
  useEffect(() => {
    const alreadyWelcomed = sessionStorage.getItem('welcomed');
    if (!alreadyWelcomed) {
      setShowWelcome(true);
      sessionStorage.setItem('welcomed', 'true');
    }
  }, []);

  // Handle sidebar view switching
  const renderActiveView = () => {
    switch (activeView) {
      case 'dm':
        return <DMView />;
      case 'general':
        return <GeneralChannelsView userRole={userRole} setActiveView={setActiveView} />;
      case 'private':
        return <PrivateChannelsView userRole={userRole} setActiveView={setActiveView} />;
      case 'create':
        return <CreateChannelView userRole={userRole} setActiveView={setActiveView} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Show welcome slide-in if needed */}
      {showWelcome && <DestroyersJrWelcome onClose={() => setShowWelcome(false)} />}

      <ChatProvider>
        <Box w="100vw" h="100vh" overflow="hidden" borderWidth={1}>
          <Flex h="100vh">
            <NavigationBar setActiveView={setActiveView} />
            {renderActiveView()}
            <UserInfo />
          </Flex>
        </Box>
      </ChatProvider>
    </>
  );
};

export default ChatPage;




