import React from 'react';
import {HStack, Skeleton} from "@chakra-ui/react";

const ChatLoading = () => {
    return (
        <HStack gap={"5"}>
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
        </HStack>
    );
};

export default ChatLoading;