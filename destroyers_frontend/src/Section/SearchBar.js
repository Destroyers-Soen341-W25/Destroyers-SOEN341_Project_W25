
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Box, Input, VStack } from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";
import { useChat } from "../Context/ChatContext";

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [all, setAll] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Извлекаем функции и данные из контекста
  const { chats, setChats, setSelectedChat } = useChat();

  useEffect(() => {
    // Получаем пользователя из localStorage (или API)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
        };

        const usersResponse = await axios.get('/all-users', config);
        const channelsResponse = await axios.get('/all-channels', config);
        console.log("Fetched Users:", usersResponse.data.users);
        console.log("Fetched Channels:", channelsResponse.data.channels);

        const users = usersResponse.data.users.map(user => ({
          id: user.id,
          name: user.name,
          type: 'user'
        }));

        const channels = channelsResponse.data.channels.map(channel => ({
          id: channel.id,
          name: channel.channelname,
          type: 'channel'
        }));

        const combinedData = [...users, ...channels];
        console.log("Combined Data (Users + Channels):", combinedData);
        setAll(combinedData);
        setFilteredResults(combinedData);
      } catch (error) {
        console.error("Error fetching users and channels:", error);
        toaster.error({ title: "Failed to fetch users and channels" });
      }
    };

    if (user) {
      fetchAll();
    }
  }, [user]);

  useEffect(() => {
    if (!search) {
      setFilteredResults(all);
    } else {
      const filtered = all.filter((u) =>
        u?.name?.toLowerCase().includes(search.toLowerCase())
      );
      console.log("Filtered Users/Channels:", filtered);
      setFilteredResults(filtered);
    }
  }, [search, all]);

  useEffect(() => {
    console.log("All Combined Data:", all);
    console.log("Filtered Results:", filteredResults);
  }, [all, filteredResults]);

  const handleUserClick = (item) => {
    console.log("Clicked User/Channel:", item);
    // Если выбранный пользователь (или канал) ещё не в chat history, добавляем его
    const exists = chats.find(
      (chat) => chat.id === item.id && chat.type === item.type
    );
    if (!exists) {
      setChats(prevChats => [...prevChats, item]);
    }
    // Устанавливаем выбранный чат (для дальнейшей отрисовки окна чата)
    setSelectedChat(item.id);
    // Скрываем результаты поиска и очищаем поле ввода
    setSearch('');
    setIsFocused(false);
  };

  return (
    <Box borderStyle="solid" borderColor="black">
      <VStack spacing={2} width="100%">
        <Box rounded="md" width={230} position="fixed" top="10" border="2px solid" borderColor="black">
          <Input
            placeholder="Search users"
            width="100%"
            size="lg"
            padding={3}
            css={{ "--focus-color": "black" }}
            _placeholder={{ color: "gray.500" }}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            value={search}
          />

          {isFocused && search && (
            <Box
              position="absolute"
              top="50px"
              left={0}
              right={0}
              maxH="300px"
              overflowY="auto"
              bg="gray.50"
              rounded="md"
              boxShadow="md"
              zIndex={10}
            >
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <Box
                    key={item.id}
                    p={2}
                    bg="gray.100"
                    rounded="md"
                    mb={1}
                    _hover={{ bg: "gray.200" }}
                    onMouseDown={() => handleUserClick(item)}
                  >
                    {item.name} ({item.type})
                  </Box>
                ))
              ) : (
                <Box p={2} bg="gray.100" rounded="md">
                  No users found
                </Box>
              )}
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default SearchBar;
