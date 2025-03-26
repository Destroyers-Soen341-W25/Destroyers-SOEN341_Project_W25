import React from 'react';
import SideBar from "../Section/SideBar";
import {Box, HStack} from "@chakra-ui/react";
import ChatBox from "../Section/ChatBox";

const DmView = () => {
    return (
          <HStack>
              <Box flex="1" display="flex">
                  <SideBar/>
                  <ChatBox/>
              </Box>
          </HStack>
    );
};

export default DmView;