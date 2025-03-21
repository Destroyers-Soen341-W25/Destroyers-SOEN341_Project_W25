import React from 'react';
import {Avatar, Box, Image, VStack} from "@chakra-ui/react";

const NavigationBar = () => {
    return (
        <div>
            <Box width={100}>
                <VStack>
                    <Image src="/destroyers_logo.png" rounded={"md"}  fit={"contain"}/>
                    <hr style={{border: "1px solid black", margin: "10px", width: "80%"}}/>
                    <Avatar.Root size={"lg"} >
                        <Avatar.Fallback name ="Direct Message"/>
                    </Avatar.Root>
                    <Avatar.Root size={"lg"} >
                        <Avatar.Fallback name ="All-General Channels"/>
                    </Avatar.Root>
                    <Avatar.Root size={"lg"} >
                        <Avatar.Fallback name ="Private Channels"/>
                    </Avatar.Root>
                </VStack>
            </Box>
        </div>
    );
};

export default NavigationBar;