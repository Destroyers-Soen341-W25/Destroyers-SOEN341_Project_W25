import React, {useEffect, useState} from 'react';
import axios from "axios";
import {HStack, Container, Box, Flex} from "@chakra-ui/react"
import NavigationBar from "../Section/NavigationBar";
import DMView from "../Views/DMView";
import GeneralChannelsView from "../Views/GeneralChannelsView";
import PrivateChannelsView from "../Views/PrivateChannelsView";
import UserInfo from "../Section/UserInfo";
import SideBar from "../Section/SideBar";
import ChatBox from "../Section/ChatBox";


const ChatPage = ({userRole}) => {
    const [activeView, setActiveView] = useState('dm');//Default view is DM view

    //Function to go to the view selected
    const renderActiveView = () => {
        switch (activeView) {
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
            // <Box w="100vw" h="100vh" overflow={"hidden"}>
            //     <HStack>
            //         <NavigationBar/>
            //         {renderActiveView()}
            //     </HStack>
            //     <UserInfo/>
            // </Box>
        <Box w="100vw" h="100vh" overflow="hidden" borderWidth={1}>
            {/* Main Layout */}
            <Flex h="100vh">
                <NavigationBar setActiveView={setActiveView} />
                {renderActiveView()}
                <UserInfo />
            </Flex>
        </Box>
    );


};

export default ChatPage;