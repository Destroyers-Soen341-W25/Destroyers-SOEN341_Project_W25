import React from 'react';
import SearchBar from "./SearchBar";
import {Box, VStack} from "@chakra-ui/react";
import ChatHistory from "./ChatHistory";

const SideBar = () => {

return(
        <Box borderColor="black" borderWidth={1} ml={"105px"} w={"18vw"} h={"90vh"} alignItems={"center"} justifyContent={"center"} >
            <VStack spacing={2} width="100%">
                <SearchBar/>
                <ChatHistory/>
            </VStack>
        </Box>
)

};

export default SideBar;