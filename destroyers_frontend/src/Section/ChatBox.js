import React from 'react';
import {Box, VStack} from "@chakra-ui/react";
import ChatHeader from "./ChatHeader";
import MessageBox from "./MessageBox";
import TypingBox from "./TypingBox";

const ChatBox = () => {
    return (
           <Box borderColor="black" borderWidth={1} h={"100vh"} display={"flex"} flex="1" justifyContent={"center"} flexDirection="column" >
               <VStack>
                   <ChatHeader/>
                   <MessageBox/>
                   <TypingBox/>
               </VStack>
           </Box>
    );
};

export default ChatBox;