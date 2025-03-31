
import React, { useEffect, useState } from 'react';
import { Box, HStack, VStack, Button, Text, Input } from "@chakra-ui/react";
import ChatBox from "../Section/ChatBox";
import NavigationBar from "../Section/NavigationBar";
import axios from "axios";
import { useChat } from "../Context/ChatContext";

const GeneralChannelsView = ({ setActiveView, userRole }) => {
  const { setSelectedChat, selectedChat, setMessages } = useChat();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingChannel, setCreatingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");


  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const res = await axios.get("/all-channels");

        const general = res.data.channels.filter(
          (ch) => ch.channelType?.toLowerCase() === "general"
        );
        setChannels(general);
      } catch (error) {
        console.error("Error fetching channels", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);


  const handleChannelClick = async (channelId) => {
    const channel = channels.find((ch) => ch.id === channelId);
    setSelectedChat(channel); 
    try {
      const response = await axios.post("/get-messages", { channelId });
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages for channel", error);
    }
  };


  if (loading) {
    return <Text>Loading channels...</Text>;
  }

  return (
    <Box>

      <NavigationBar setActiveView={setActiveView} />
 
      <Box ml="8vw">
        <HStack spacing={0} h="100vh">
 
          <Box borderColor="black" borderWidth={1} w="17vw" h="100vh" p={2}>
            <VStack spacing={2} align="stretch">
              <Text fontSize="xl" fontWeight="bold">General Channels</Text>
              {channels.map((channel) => (
                <Box
                  key={channel.id}
                  p={2}
                  borderBottom="1px solid gray"
                  cursor="pointer"
                  onClick={() => handleChannelClick(channel.id)}
                >
                  <Text fontSize="md">{channel.channelname}</Text>
                </Box>
              ))}
              {channels.length === 0 && (
                <Text>No general channels available</Text>
              )}
            </VStack>
          </Box>
      
          <Box flex="1" h="100vh">
            {selectedChat ? (
              <ChatBox />
            ) : (
              <Box h="100%" display="flex" alignItems="center" justifyContent="center">
                <Text>Select a channel to view messages</Text>
              </Box>
            )}
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default GeneralChannelsView;
