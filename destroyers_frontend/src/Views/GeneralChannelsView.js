
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

  // Запрашиваем все каналы и фильтруем только general
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const res = await axios.get("/all-channels");
        // Оставляем только каналы, у которых channeltype равен "general"
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

  // При клике по каналу ищем объект канала и сохраняем его в selectedChat
  const handleChannelClick = async (channelId) => {
    const channel = channels.find((ch) => ch.id === channelId);
    setSelectedChat(channel); // сохраняем объект канала целиком
    try {
      const response = await axios.post("/get-messages", { channelId });
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages for channel", error);
    }
  };

  // Если нужно, можно автоматически выбрать созданный канал после его создания.
  const handleCreateChannel = async () => {
    if (!newChannelName.trim()) return;
    try {
      await axios.post("/create-channel", {
        channelName: newChannelName,
        channelType: "general",
      });
      setCreatingChannel(false);
      setNewChannelName("");
      // Обновляем список каналов после создания
      const response = await axios.get("/all-channels");
      const general = response.data.channels.filter(
        (ch) => ch.channelType?.toLowerCase() === "general"
      );
      setChannels(general);
      // Если канал с таким именем найден, автоматически его выбираем
      const createdChannel = general.find(ch => ch.channelname === newChannelName);
      if (createdChannel) {
        setSelectedChat(createdChannel);
      }
    } catch (error) {
      console.error("Error creating channel", error);
    }
  };

  if (loading) {
    return <Text>Loading channels...</Text>;
  }

  return (
    <Box>
      {/* Рендерим NavigationBar и передаём туда setActiveView */}
      <NavigationBar setActiveView={setActiveView} />
      {/* Основной контейнер со смещением вправо от NavigationBar */}
      <Box ml="8vw">
        <HStack spacing={0} h="100vh">
          {/* Левая панель со списком каналов */}
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
              {/* Возможность создания канала для админа */}
              {userRole === "admin" && (
                <>
                  {creatingChannel ? (
                    <Box>
                      <Input
                        placeholder="Channel name"
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                      />
                      <Button onClick={handleCreateChannel} mt={2}>
                        Create
                      </Button>
                      <Button variant="outline" onClick={() => setCreatingChannel(false)} mt={2}>
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Button onClick={() => setCreatingChannel(true)}>
                      Create Channel
                    </Button>
                  )}
                </>
              )}
            </VStack>
          </Box>
          {/* Правая панель – окно чата */}
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
