import React from 'react';
import {Box, Button, Input, MenuButton, Text, useDisclosure, HStack, createToaster, Spinner} from "@chakra-ui/react";
import {Tooltip} from "../components/ui/tooltip";
import {MenuRoot} from "../components/ui/menu";
import { FaRegBell } from "react-icons/fa";
import {ChatState} from "../Context/ChatProvider";
import {useNavigate} from "react-router-dom";
import axios from "axios";

// import {menu} from "../components/ui/menu";

const SearchBar = () => {
    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [loadingChat, setLoadingChat] = React.useState(false);
    const toaster = createToaster();

    const {user}= ChatState();
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        if (!search) {
            toaster.create({title: "Please enter something in the search",
                            status: "warning",
                            duration: 5000,
                            isClosable: true,
                            position: "top-left"
            });
            return;
        }
        try{
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            const {data} = await axios.get(`/api/user?search=${search}=${user?.token}`, config);
            setLoading(false);
            setSearchResults(data);
        }catch (error){
            toaster.create({title: "Please enter something in the search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left"
            });
        }
    };

    const accessChat=(user)


    return (
        // <Box>
            <HStack spacing={2}>
                <Input placeholder="Search..." onChange={(e) => setSearch(e.target.value)} value={search}/>
                <Button onClick={handleSearch}>Go</Button>
                {loading ? <Spinner /> : null}
            </HStack>
        // </Box>



    //     <Box display="flex"
    //          justifyContent="space-between"
    //          alignItems="center"
    //     bg="white"
    //     width="100%"
    //     padding="5px 10px 5px 10px"
    //     borderWidth="5px">
    //         <Tooltip label = "Search User" hasArrow placement="bottom-end">
    //             <Button variant={""}>
    //                 <i className="fa-solid fa-magnifying-glass"></i>
    //                 <Text textStyle="md"
    //                 display="flex"
    //                 padding="4px">
    //                     Search User
    //                 </Text>
    //             </Button>
    //         </Tooltip>
    //         <Text fontSize="lg"
    //               fontWeight="bold"
    //               padding="4px">
    //             Destroyers
    //         </Text>
    //         <div>
    //             <MenuRoot>
    //                 <FaRegBell fontSize="3x1" />
    //             </MenuRoot>
    //         </div>
    //     </Box>
     );
};

export default SearchBar;