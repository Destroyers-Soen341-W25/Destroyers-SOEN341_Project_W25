import React from 'react';
import axios from "axios";
import { Box, Flex} from "@chakra-ui/react"
import NavigationBar from "../Section/NavigationBar";
import DMView from "../Views/DMView";
import GeneralChannelsView from "../Views/GeneralChannelsView";
import PrivateChannelsView from "../Views/PrivateChannelsView";
import UserInfo from "../Section/UserInfo";
import {useChat} from "../Context/ChatContext";

const ChatPage = ({userRole}) => {
    const {selectedView, setSelectedView}=useChat();//Default view is DM view

    //Function to go to the view selected
    const renderActiveView = () => {
        switch (selectedView) {
            case 'dm':
                return <DMView/>;
            case 'general':
                    return <GeneralChannelsView userRole={userRole}/>;//For the admin
            case 'private':
                return <PrivateChannelsView userRole={userRole}/>;//For regular users
            default:
                return null;
        }
    }

    return (
        <Box w="100vw" h="100vh" overflow="hidden" borderWidth={1}>
            <Flex h="100vh">
                <NavigationBar setSelectedView={setSelectedView} />
                {renderActiveView()}
                <UserInfo />
            </Flex>
        </Box>
    );
};

export default ChatPage;