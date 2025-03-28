import React from 'react';
import {Box, HStack} from "@chakra-ui/react";
import SideBar from "../Section/SideBar";
import ChatBox from "../Section/ChatBox";
import GroupInfo from "../Section/GroupInfo";

const PrivateChannelsView = () => {
    return (
        <HStack>
            <Box flex="1" display="flex">
                <SideBar/>
                <ChatBox/>
                <GroupInfo/>
            </Box>
        </HStack>
    );
};

export default PrivateChannelsView;