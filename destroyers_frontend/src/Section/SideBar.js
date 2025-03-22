import React, {useEffect, useState} from 'react';
import {Avatar, Box, VStack, Image, Input, Separator, HStack} from "@chakra-ui/react";
import {toaster} from "../components/ui/toaster";
import axios from "axios";

const SideBar = () => {

    const [search, setSearch] = useState('');//For the search input
    const [user, setUser] = useState(null);//Fetching/Retrieving the user for API actions
    const [chats, setChats] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);//For storing filtered results
    const [all, setAll] = useState([]);// For storing all users and channels
    const [isFocused, setIsFocused] = useState(false); // Track if the input box is focused

    useEffect(() => {
        // Fetch or retrieve the user from localStorage or an API
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

                const users = usersResponse.data.users.map(user => ({
                    id: user.id,
                    name: user.name,
                    type: 'user'
                }));

                const channels = channelsResponse.data.channels.map(channel => ({
                    id: channel.id,
                    name: channel.name,
                    type: 'channel'
                }));

                const combinedData = [...users, ...channels];
                setAll(combinedData);  // ✅ Set all users and channels
                setFilteredResults(combinedData);  // ✅ Show all by default
            } catch (error) {
                console.error("Error fetching users and channels:", error);
                toaster.error({ title: "Failed to fetch users and channels" });
            }
        };

        fetchAll();
    }, []);

    useEffect(() => {
        if (!search) {
            setFilteredResults(all);  // Show all if search is empty
        } else {
            const filtered = all.filter((u) =>
                u.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredResults(filtered);  // Update with filtered results
        }
    }, [search, all]);

    const handleUserClick = (user) => {
        console.log("Clicked User:", user);
    };

    return (
        <div>
            <Box rounded={"md"} width={250} position="relative" top="-55px" >
                <VStack spacing={2} width="100%">

                    <Input
                        placeholder="Search users"
                        width="100%"
                        size="lg"
                        padding={3}
                        css={{ "--focus-color": "black" }}
                        _placeholder={{ color: "gray.500" }}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 100)}  // Delay to allow click
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
                                        onMouseDown={() => handleUserClick(item)}  // Use onMouseDown to prevent hiding
                                    >
                                        {item.name}
                                    </Box>
                                ))
                            ) : (
                                <Box p={2} bg="gray.100" rounded="md">
                                    No users found
                                </Box>
                            )}
                        </Box>
                    )}
                </VStack>
            </Box>
        </div>
    );
};

export default SideBar;