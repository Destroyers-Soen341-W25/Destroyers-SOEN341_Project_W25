
import React from 'react';
import {Box} from "@chakra-ui/react";
import SearchBar from "../Section/SearchBar";
import ChatHistory from "../Section/ChatHistory";
import Chat from "../Section/Chat";

const ChatPage = () => {
    return (
        <div style={{width:'100%'}}>
            {<SearchBar/>}
            <Box
            display="flex"
            justifyContent={"space-between"}
            width={'100%'}
            height={'91.5vh'}
            padding={'10px'}
            style={{width:'100%'}}>
                { <ChatHistory/>}
                { <Chat/>}
            </Box>
        </div>
    );
};

export default ChatPage;

// import React from 'react';
// import {ChatState} from "../Context/ChatProvider";
// import {Box} from "@chakra-ui/react";
// import SearchBar from "../Section/SearchBar";
// import ChatHistory from "../Section/ChatHistory";
// import Chat from "../Section/Chat";
//
// const ChatPage = () => {
//     const {user}=ChatState();
//     return (
//         <div style={{width:'100%'}}>
//             {user && <SearchBar/>}
//             <Box style={{width:'100%'}}>
//                 {user && <ChatHistory/>}
//                 {user && <Chat/>}
//             </Box>
//         </div>
//     );
// };
//
// export default ChatPage;
