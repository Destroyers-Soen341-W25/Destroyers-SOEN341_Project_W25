import React, {useState} from 'react';
import {ChatState} from "../Context/ChatProvider";
import {Box, Button, createToaster, Stack, Text} from "@chakra-ui/react";
import ChatLoading from "../Divers/ChatLoading";


const ChatHistory = () => {
    const [loggedUser, setLoggedUser] = useState();
    const {selectedChat, setSelectedChat, user, chats, setChats} = ChatState();

    // const toaster = createToaster();
    //
    // toaster.create({title: "Please enter something in the search",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top-left"
    // });

    //api fetching chat function a get request

   return( <Box display={{base:selectedChat?"none":"flex", md:"flex"}}
         flexDir="column"
         alignItems={"center"}
         padding={3}
         bg={"white"}
         width={{base:"100%", md:"31%"}}
         borderWidth={"1px"}
         borderRadius={"lg"}>
        <Box paddingBottom={3}
             paddingX={3}
             fontSize={{base:"28px", md:"30px"}}
             display={"flex"}
             width={"100%"}
             justifyContent={"space-between"}
             alignItems={"center"}>
            Chat History
       <Button display={"flex"}
               fontSize={{base:"17px", md:"10px", lg:"17px"}}
               bg={"#F8F8F8"}
               rightIcon={<i className="fa-solid fa-plus"></i>} >

           New Group Chat </Button>
        </Box>
       <Box display={"flex"}
           flexDirection={"column"} padding={3} bg={"#F8F8F8"} width={"100%"} height={"100%"} borderRadius={"lg"} overflow={"hidden"}>
           {chats?(
               <Stack overflow={"scroll"}>
                   //mapping of chats
                   {chats.map((chat )=> (
                       <Box
                           onClick={()=>setSelectedChat(chat)}
                           cursor={"pointer"}
                           bg={selectedChat === chat ? "#38B2AC" : "E8E8E8"}
                           color={selectedChat === chat ? "#white" : "black"}
                           px={3}
                           py={3}
                           borderRadius={"lg"}
                           key={chat.id}>
                           <Text>
                               {/*{!chat.isGroupChat?getSender(loggedUser, chat.users):(chat.chatName)}*/}
                           </Text>
                       </Box>
                   ))}
               </Stack>

           ): (
               <ChatLoading/>
           )}
       </Box>
    </Box>
   );
};

export default ChatHistory;