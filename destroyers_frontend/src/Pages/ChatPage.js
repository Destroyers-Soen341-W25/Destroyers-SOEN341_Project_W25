import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  useColorMode,
  IconButton,
  useColorModeValue,
  Avatar,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { ChatProvider } from "../Context/ChatContext";
import NavigationBar from "../Section/NavigationBar";
import DMView from "../Views/DMView";
import GeneralChannelsView from "../Views/GeneralChannelsView";
import PrivateChannelsView from "../Views/PrivateChannelsView";
import CreateChannelView from "../Views/CreateChannelView";
import DestroyersJrWelcome from '../DestroyersJr/DestroyersJrWelcome'; // Adjust if needed

const ChatPage = ({ userRole }) => {
  const [activeView, setActiveView] = useState('dm');
  const [showWelcome, setShowWelcome] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const alreadyWelcomed = sessionStorage.getItem('welcomed');
    if (!alreadyWelcomed) {
      setShowWelcome(true);
      sessionStorage.setItem('welcomed', 'true');
    }
  }, []);

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

  const bgGradient = useColorModeValue(
    'linear(to-r, gray.50, white)',
    'linear(to-br, gray.800, gray.900)'
  );

  return (
    <>
      {showWelcome && <DestroyersJrWelcome onClose={() => setShowWelcome(false)} />}
      <ChatProvider>
        <Box w="100vw" h="100vh" bgGradient={bgGradient} overflow="hidden">
          <Flex h="100vh" boxShadow="xl" borderRadius="xl" m={4} overflow="hidden">
            {/* Left Navigation */}
            <Box w="80px" bg={useColorModeValue("white", "gray.800")} borderRight="1px solid" borderColor="gray.200" py={4}>
              <Flex direction="column" align="center" gap={4}>
                <Tooltip label="Toggle Theme" placement="right">
                  <IconButton
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    variant="ghost"
                    size="sm"
                    aria-label="Toggle theme"
                  />
                </Tooltip>
                <NavigationBar setActiveView={setActiveView} />
              </Flex>
            </Box>

            {/* Main Content */}
            <Box flex="1" bg={useColorModeValue("gray.50", "gray.700")} p={4}>
              {renderActiveView()}
            </Box>

            {/* User Info Panel */}
            <Box w="250px" bg={useColorModeValue("white", "gray.800")} p={4} borderLeft="1px solid" borderColor="gray.200">
              <Flex align="center">
                <Avatar name="Username" size="sm" mr={3} />
                <Box>
                  <Text fontWeight="medium">Username</Text>
                  <Text fontSize="xs" color="gray.500">Online</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </ChatProvider>
    </>
  );
};

export default ChatPage;
