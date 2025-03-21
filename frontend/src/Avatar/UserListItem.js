import React from 'react';
import {Box,Text} from "@chakra-ui/react";

const UserListItem = (user, handleFunction) => {
    // const{user}=ChatState();
    return (
        <Box onClick={handleFunction}
             cursor={"pointer"}
             bg="#E8E8E8"
             _hover={{background:"#38B2AC",color:"white"}}
             width={"100%"}
             display={"flex"}
             alignItems="center"
             color={"black"}
             px={3}
             py={2}
             mb={2}
             borderRadius={"lg"}>
        <Box>
            <Text>{user.name}</Text>
        </Box>
        </Box>
    );
};

export default UserListItem;