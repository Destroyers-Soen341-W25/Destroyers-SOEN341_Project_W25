import React, {useState} from 'react';
import {Avatar, Box} from "@chakra-ui/react";

const UserInfo = () => {
    const [user, setUser] = useState({});

    return (
            <Box position={"fixed"} bottom={"0"} left={"0"} borderColor="black" borderWidth={1} w={"26vw"} h={"10vh"} padding={2} alignItems="center" justifyContent="center">
                <Avatar.Root size={"lg"} >
                    <Avatar.Fallback name ="User"/>
                </Avatar.Root>
                User Info
            </Box>
    );
};

export default UserInfo;