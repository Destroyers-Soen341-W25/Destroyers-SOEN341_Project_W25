import React, { useState } from 'react'; 
import { 
  Box, 
  Input, 
  Button, 
  VStack, 
  Text 
} from "@chakra-ui/react"; 
import axios from 'axios'; 
import { useChat } from "../Context/ChatContext";
import { Checkbox, CheckboxGroup } from "@chakra-ui/checkbox";

const CreateChannelView = ({ setActiveView }) => { 
  const { users } = useChat();
  const [channelName, setChannelName] = useState(""); 
  const [channelType, setChannelType] = useState("public");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = storedUser?.id;
  const userRole = storedUser?.role;

  const handleCreateChannel = async () => { 
    if (!channelName.trim()) { 
      alert("Enter channel name"); 
      return;
    }
    
    console.log("USER ROLE IS: " + userRole);
    if (userRole === "admin" && channelType === "public") {
      
      try {
        await axios.post("/create-channel", {
          channelName,
          channelType: "general",
          creatorId: currentUserId
        });
        alert("Public channel created successfully");
        setActiveView("general"); 
      } catch (error) {
        console.error("Error creating channel", error);
      }
    } else {
      if (selectedUsers.length === 0) {
        alert("Choose at least one user for the channel");
        return;
      }
      try {
        const response = await axios.post("/create-channel", {
          channelName,
          channelType: "private",
          creatorId: currentUserId
        });
        const newChannel = response.data.channel;
        console.log("CREATED CHANNEL ID IS: "+newChannel.id);
        for (const userId of selectedUsers) {
          await axios.post("/assign-user", {
            userId,
            channelId: newChannel.id,
          });
        }
        alert("Private channel created successfully");
        setActiveView("private"); 
      } catch (error) {
        console.error("Error creating private channel", error);
      }
    }
  };

  return (
    <Box p={4} ml="8vw">
      <VStack spacing={4} align="start">
        <Text fontSize="2xl">Create Channel</Text> 
        <Input 
          placeholder="Channel name" 
          value={channelName} 
          onChange={(e) => setChannelName(e.target.value)} 
        /> 
        {userRole === 'admin' && (
          <Box 
            as="select" 
            value={channelType} 
            onChange={(e) => setChannelType(e.target.value)}
            // можно добавить стили, если нужно
            p={2}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Box>
        )}
        {(channelType === 'private' || userRole === 'member') && (
        <>
            <Text>Select users to assign to channel:</Text>
            <CheckboxGroup value={selectedUsers} onChange={setSelectedUsers}>
            <Box maxH="200px" overflowY="auto" w="100%">
                <VStack align="start">
                {users.map(user => (
                    <Checkbox key={user.id} value={user.id.toString()}>
                    {user.name}
                    </Checkbox>
                ))}
                </VStack>
            </Box>
            </CheckboxGroup>
        </>
        )}
        <Button onClick={handleCreateChannel}>Create channel</Button>
      </VStack>
    </Box>
  );
};

export default CreateChannelView;


