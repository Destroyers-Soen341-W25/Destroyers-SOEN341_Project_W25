import React, {useEffect, useState} from 'react';
import {Avatar, Box, VStack, Image, Input, Separator, HStack} from "@chakra-ui/react";

const SideBar = () => {

    const [search, setSearch] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        try {

        }catch(e){

        }
    })

    return (
        <div>
            <Box rounded={"md"}  width={250}    >
                <VStack spacing={2} width="100%">
                    <Input
                        placeholder="Search"
                        width="100%"
                        size="lg"
                        padding={3}
                        css={{ "--focus-color": "black" }}
                        _placeholder={{ color: "black" }}
                    />
                </VStack>
            </Box>
            <Box>

            </Box>
        </div>
    );
};

export default SideBar;