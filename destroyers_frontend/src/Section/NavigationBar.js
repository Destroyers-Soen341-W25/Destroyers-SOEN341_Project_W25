import React from 'react';
import {Avatar, Box, Button, Flex, Image, VStack} from "@chakra-ui/react";

const NavigationBar = ({setActiveView}) => {
    return (
            <Box position="fixed" left="0" top="0" borderColor="black" borderWidth={1} w={"8vw"} h={"90vh"} display={"flex"} alignItems={"top"} justifyContent={"center"}>
                <VStack>
                    <Image src="/destroyers_logo.png"  boxSize={"100px"}/>
                    <hr style={{border: "1px solid black", margin: "10px", width: "80%"}}/>
                    <Flex gap={5} direction={"column"} alignItems={"center"}>
                        <Button variant="ghost" borderRadius="full" onClick={() => setActiveView('dm')}>
                            <Avatar.Root size={"lg"} >
                                <Avatar.Fallback name ="Direct Message"/>
                            </Avatar.Root>
                        </Button>
                        <Button variant="ghost" borderRadius="full" onClick={() => setActiveView('general')}>
                            <Avatar.Root size={"lg"} >
                                <Avatar.Fallback name ="All-General Channels"/>
                            </Avatar.Root>
                        </Button>
                        <Button variant="ghost" borderRadius="full" onClick={() => setActiveView('private')}>
                            <Avatar.Root size={"lg"} >
                                <Avatar.Fallback name ="Private Channels"/>
                            </Avatar.Root>
                        </Button>
                    </Flex>
                </VStack>
            </Box>
    );
};

export default NavigationBar;