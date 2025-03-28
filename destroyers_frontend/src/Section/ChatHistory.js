
import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";


const ChatHistory = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/get-dms"); // Fetch from API
                const data = await response.json();
                setUsers(data.users); // Store users in state
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);


    return (
        //    <Box mt={"40"} width={100} borderColor="black" borderWidth={1} w={"17vw"} h={"60vh"} display={"grid"} justifyContent={"center"}>
        //        Hello
        //    </Box>

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