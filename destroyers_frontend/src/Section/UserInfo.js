import React, {useState, useEffect} from 'react';
import {Avatar, Box} from "@chakra-ui/react";
import { Text } from '@chakra-ui/react';

const UserInfo = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    

    return (
            <Box position={"fixed"} bottom={"0"} left={"0"} borderColor="black" borderWidth={1} w={"26vw"} h={"10vh"} padding={2} alignItems="center" justifyContent="center">
                <Avatar.Root size={"lg"} >
                    <Avatar.Fallback name ="User"/>
                </Avatar.Root>
                <Text ml={3}>{user ? `${user.name} (${user.role})` : "User Info"}</Text>
            </Box>
    );
};

export default UserInfo;