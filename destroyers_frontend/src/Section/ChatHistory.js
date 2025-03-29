
import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import {response} from "express";


const ChatHistory = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const messagesResponse = await fetch("/get-dms", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: currentUserId }),
                });
                const data = await response.json();
                setUsers(data.users); // Store users in state
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);


    return (
        <Box mt={"40"} borderColor="black" borderWidth={1} w={"17vw"} h={"60vh"} overflowY="auto" p={2}>
        <VStack spacing={2} align="stretch">
            {users.length > 0 ? (
                users.map((user) => (
                    <Box key={user.id} p={2} borderBottom="1px solid black">
                        <Text fontSize="md">{user.name}</Text>
                    </Box>
                ))
            ) : (
                <Text>No users available</Text>
            )}
        </VStack>
    </Box>
    );
};

export default ChatHistory;