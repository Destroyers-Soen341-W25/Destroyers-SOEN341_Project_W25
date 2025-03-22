// import React from 'react';
//
// const SearchBar = () => {
//     return (
//         <div>
//             Search Bar
//         </div>
//     );
// };
//
// export default SearchBar;

import React, { useState, useEffect } from "react";
import { Button, Input, HStack, Box, Spinner } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { toast } from "sonner";
import ChatLoading from "../Divers/ChatLoading";
import {toaster} from "../components/ui/toaster";

const SearchBar = () => {
    const [search, setSearch] = useState('');//When searching the user
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);//Loading chats
    const [allUsers, setAllUsers] = useState([]);

    const { user, setSelectedChat, chats, setChats } = ChatState();
    const navigate = useNavigate();

    // Fetch all users on
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                    withCredentials: true
                };
                const { data } = await axios.get('/all-users', config);
                console.log("Fetched Users: ", data.users);
                setAllUsers(data.users);
            } catch (error) {
                toaster.error({title: "Failed to fetch users"});

            }
        };

        fetchUsers();
    }, [user]);

    // Filter users as the user types
    useEffect(() => {
        if (!search) {
            setSearchResults([]);
        } else {
            const filteredUsers = allUsers.filter((u) =>
                u.name.toLowerCase().includes(search.toLowerCase())
            );
            setSearchResults(filteredUsers);
        }
    }, [search, allUsers]);

    //Fetch chats
    const fetchChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            const { data } = await axios.post('/get-dms', { userId }, config);
            toaster.create({
                description:`${data}`,
                type: "info"
            });
            if (!userId) {
                console.error("Error: userID is missing");
                return;
            }
            if (!chats.find((c) => c.id === data.id)) setChats([data, ...chats]);//Adding chats that are not already there to not have duplicates

            setSelectedChat(data);
            setLoadingChat(false);
            // onClose();
        } catch (error) {
            toaster.error({title:"Failed to fetch the chat "+error});
            console.log("Failed the operation");
        }
    };

    return (
        <Box position="relative" width="400px">
            <HStack spacing={2} width="100%">
                <Input
                    placeholder="Search..."
                    width="100%"
                    size="md"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                {/*<Button size="md" variant="subtle" onClick={() => setSearch("")}>*/}
                {/*    Clear*/}
                {/*</Button>*/}
            </HStack>

            {/* Dropdown for search results */}
            {search && (
                <Box
                    position="absolute"
                    width="100%"
                    bg="white"
                    boxShadow="md"
                    borderRadius="md"
                    overflow="hidden"
                    zIndex="10"
                    maxHeight="30vh"
                    overflowY="auto"
                >
                    {loading ? (
                        <Box p={3} textAlign="center">
                            <Spinner size="sm" />
                        </Box>
                    ) : searchResults.length > 0 ? (
                        searchResults.map((user) => (
                            <Box
                                key={user.id}
                                p={3}
                                _hover={{ bg: "gray.100" }}
                                cursor="pointer"
                                onClick={() => fetchChat(user.id)}
                            >
                                {user.name}
                            </Box>
                        ))
                    ) : (
                        <Box p={3} textAlign="center" color="gray.500">
                            No results found
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default SearchBar;
//
//
// //loadingChat && <Spinner ml={"auto"} display={"flex"}/>}