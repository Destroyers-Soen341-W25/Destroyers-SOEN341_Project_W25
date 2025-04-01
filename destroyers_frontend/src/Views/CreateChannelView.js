

import React, { useState, useEffect } from 'react'; 
import { Box, Input, Button, VStack, Text, HStack } from "@chakra-ui/react"; 
import axios from 'axios'; 
import { useChat } from "../Context/ChatContext"; 
import { Checkbox, CheckboxGroup } from "@chakra-ui/checkbox";

const CreateChannelView = ({ setActiveView }) => { const { users } = useChat();


const [channelName, setChannelName] = useState(""); 
const [channelType, setChannelType] = useState("public");
const [selectedUsers, setSelectedUsers] = useState([]);


const [allChannels, setAllChannels] = useState([]); 
const [selectedManagedChannelId, setSelectedManagedChannelId] = useState(""); 
const [selectedInviteUser, setSelectedInviteUser] = useState(""); 
const [pendingJoinRequests, setPendingJoinRequests] = useState([]); 
const [pendingInvites, setPendingInvites] = useState([]);


const [myInvites, setMyInvites] = useState([]);

const storedUser = JSON.parse(localStorage.getItem("user")); 
const currentUserId = storedUser?.id; 
const userRole = storedUser?.role;


useEffect(() => { 
  const fetchAllChannels = async () => { 
    try { 
      const res = await axios.get("/all-channels"); 
      setAllChannels(res.data.channels); 
    } catch (error) { 
      console.error("Error getting channels", error);
    } 
  }; 
  
  fetchAllChannels(); }, []

);


const managedChannels = allChannels.filter(ch => ch.createdby === currentUserId); 
const managedChannel = allChannels.find(ch => ch.id === selectedManagedChannelId);


const joinableChannels = allChannels.filter( 
  ch => ch.channelType && ch.channelType.toLowerCase() === "private" 
       && !(ch.userIds && ch.userIds.includes(currentUserId)) );


useEffect(() => { 
  const fetchJoinRequests = async () => { 
    if (managedChannel) { 
      try { 
        const res = await axios.get("/get-join-requests", { params: { channelId: managedChannel.id } }); 
        setPendingJoinRequests(res.data.requests); 
      } catch (error) { 
        console.error("Error getting join-requests", error); 
      } 
    } 
  }; 
  fetchJoinRequests(); }, [managedChannel]
);


useEffect(() => { 
  const fetchInvites = async () => { 
    if (managedChannel) { 
      try { 
        const res = await axios.get("/get-invites", { params: { channelId: managedChannel.id } }); 
        setPendingInvites(res.data.invites); 
      } catch (error) { 
        console.error("Error getting invites", error); 
      } 
    } 
  }; 
  fetchInvites(); }, [managedChannel]
);


useEffect(() => { 
  const fetchMyInvites = async () => { 
    if (currentUserId) { 
      try { 
        const res = await axios.get("/get-my-invites", { params: { userId: currentUserId } }); 
        setMyInvites(res.data.invites); 
        console.log("INVITES ARE: ",res)
      } catch (error) { 
        console.error("Error getting my invites", error); 
      } 
    } 
  }; 
  fetchMyInvites(); }, [currentUserId]
);

const getUserName = (userId) => {    const user = users.find(u => u.id === userId);    return user ? user.name : userId;   };

// Создание канала 
const handleCreateChannel = async () => { 
  if (!channelName.trim()) { 
    alert("Enter channel name"); 
    return; 
  }


if (userRole === "admin" && channelType === "public") {
  try {
    await axios.post("/create-channel", {
      channelName,
      channelType: "general",
      creatorId: currentUserId
    });
    alert("Public channel created successfully");
    setActiveView("general");
    // Обновляем список каналов
    const resAll = await axios.get("/all-channels");
    setAllChannels(resAll.data.channels);
  } catch (error) {
    console.error("Error creating channel", error);
  }
} else {
  if (selectedUsers.length === 0) {
    alert("Choose at least one user");
    return;
  }
  try {
    const response = await axios.post("/create-channel", {
      channelName,
      channelType: "private",
      creatorId: currentUserId
    });
    const newChannel = response.data.channel;
    for (const userId of selectedUsers) {
      await axios.post("/assign-user", {
        userId,
        channelId: newChannel.id,
      });
    }
    alert("Private channel created successfully");
    setActiveView("private");
    const resAll = await axios.get("/all-channels");
    setAllChannels(resAll.data.channels);
  } catch (error) {
    console.error("Error creating private channel", error);
  }
}

};


const handleSendInvite = async () => { 
  if (!selectedInviteUser) { 
    alert("Choose user to invite"); 
    return; 
  } 
  try { 
    await axios.post("/send-invite", { channelId: managedChannel.id, inviteeId: selectedInviteUser, inviterId: currentUserId }); 
    alert("Invite sent");
    
   
    const res = await axios.get("/get-invites", { params: { channelId: managedChannel.id } }); 
    
    setPendingInvites(res.data.invites);
   } catch (error) {
     console.error("Error sending invite", error); 
    } 
  };


const handleJoinRequest = async (channelId) => { 
  try { 
    await axios.post("/join-request", { channelId, userId: currentUserId }); 
    alert("Request to join was sent"); 
  } catch (error) { 
    console.error("Error sending request to join", error); 
  } 
};


const handleAcceptRequest = async (userId) => { 
  try { 
    await axios.post("/accept-request", { channelId: managedChannel.id, userId }); 
    alert("Join request accepted"); 
    setPendingJoinRequests(pendingJoinRequests.filter(req => req.userId !== userId)); 
  } catch (error) { 
    console.error("Error accepting request", error); 
  } 
};

const handleRejectRequest = async (userId) => { 
  try { 
    await axios.post("/reject-request", { channelId: managedChannel.id, userId }); 
    alert("Request to join declined"); 
    setPendingJoinRequests(pendingJoinRequests.filter(req => req.userId !== userId)); 
  } catch (error) { 
    console.error("Error declining join request", error);
  } 
};


const handleAcceptInvite = async (channelId) => { 
  try {
    await axios.post("/accept-invite", { channelId, userId: currentUserId }); 
    alert("Invite accepted"); 
    
  const res = await axios.get("/get-my-invites", { params: { userId: currentUserId } }); 
  setMyInvites(res.data.invites); 
  } catch (error) { 
    console.error("Error accepting invite", error); 
  } 
};

const handleRejectInvite = async (channelId) => { 
  try { 
    await axios.post("/reject-invite", { channelId, userId: currentUserId }); 
    alert("Invite declined"); 
    // Обновляем список моих инвайтов 
  const res = await axios.get("/get-my-invites", { params: { userId: currentUserId } }); 
  setMyInvites(res.data.invites); 
  } catch (error) { 
    console.error("Error declining invite", error); 
  } 
  };

return ( 
<Box p={4} ml="8vw"> 
  <VStack spacing={8} align="start"> 
    
    <Box w="100%" borderWidth={1} p={4}> 
      <Text fontSize="2xl">Create Channel</Text> 
      <Input placeholder="Channel name" value={channelName} onChange={(e) => 
        setChannelName(e.target.value)} /> 
        {userRole === 'admin' && ( <Box as="select" value={channelType} onChange={(e) => 
          setChannelType(e.target.value)} 
          p={2} border="1px solid" borderColor="gray.200" borderRadius="md" > 
          <option value="public">Public</option> 
          <option value="private">Private</option> 
          </Box> )} 
          {(channelType === 'private' || userRole === 'member') && ( <> 
          <Text>Select users to assign to channel:</Text> 
          <CheckboxGroup value={selectedUsers} onChange={setSelectedUsers}> 
            <Box maxH="200px" overflowY="auto" w="100%"> 
              <VStack align="start"> {users.map(user => ( 
                <Checkbox key={user.id} value={user.id.toString()}> {user.name} </Checkbox> ))} 
                </VStack> 
                </Box> 
                </CheckboxGroup> </> )} 
                <Button onClick={handleCreateChannel}>Create channel</Button> 
                </Box>

    
    <Box w="100%" borderWidth={1} p={4}>
      <Text fontSize="2xl">Channel management</Text>
      {managedChannels.length > 0 && (
        <Box mt={4}>
          <Text>My channels (created):</Text>
          <select
            style={{ marginTop: '8px', padding: '8px' }}
            value={selectedManagedChannelId}
            onChange={(e) => setSelectedManagedChannelId(e.target.value)}
          >
            <option value="">Choose channel to manage</option>
            {managedChannels.map(ch => (
              <option key={ch.id} value={ch.id}>{ch.channelname}</option>
            ))}
          </select>
          {managedChannel && (
            <Box mt={4} borderWidth={1} p={3}>
              <Text fontSize="lg" fontWeight="bold">Managing channel: {managedChannel.channelname}</Text>
              <Box mt={2}>
                <Text>Sending invitation:</Text>
                <select
                  style={{ marginTop: '8px', padding: '8px' }}
                  value={selectedInviteUser}
                  onChange={(e) => setSelectedInviteUser(e.target.value)}
                >
                  <option value="">Choose user</option>
                  {users
                    .filter(u => !(managedChannel.userIds && managedChannel.userIds.includes(u.id)))
                    .map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))
                  }
                </select>
                <Button mt={2} onClick={handleSendInvite}>Send invitation</Button>
              </Box>
              <Box mt={4}>
                <Text>Pending requests:</Text>
                {pendingJoinRequests.length > 0 ? (
                  pendingJoinRequests.map(req => (
                    <HStack key={req.userId} mt={2}>
                      <Text>{getUserName(req.userId)}</Text>
                      <Button size="sm" onClick={() => handleAcceptRequest(req.userId)}>Accept</Button>
                      <Button size="sm" onClick={() => handleRejectRequest(req.userId)}>Reject</Button>
                    </HStack>
                  ))
                ) : (
                  <Text mt={2}>No requests</Text>
                )}
              </Box>
              <Box mt={4}>
                <Text>Pending invites:</Text>
                {pendingInvites.length > 0 ? (
                  pendingInvites.map(invite => (
                    <HStack key={invite.id} mt={2}>
                      <Text>Invitation from {getUserName(invite.inviterId)} for {getUserName(invite.inviteeId)}</Text>
                     
                    </HStack>
                  ))
                ) : (
                  <Text mt={2}>No invites found</Text>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}

     
      {joinableChannels.length > 0 && (
        <Box mt={4}>
          <Text>Channels you can request to join:</Text>
          {joinableChannels.map(ch => (
            <HStack key={ch.id} mt={2}>
              <Text>{ch.channelname}</Text>
              <Button size="sm" onClick={() => handleJoinRequest(ch.id)}>Send request</Button>
            </HStack>
          ))}
        </Box>
      )}

     
      <Box mt={4}>
        <Text>My invites:</Text>
        {myInvites.length > 0 ? (
          myInvites.map(invite => (
            <HStack key={invite.id} mt={2}>
              <Text>Invite into channel {invite.channelName || invite.channelId} from {getUserName(invite.inviterId)}</Text>
              <Button size="sm" onClick={() => handleAcceptInvite(invite.channelId)}>Accept</Button>
              <Button size="sm" onClick={() => handleRejectInvite(invite.channelId)}>Reject</Button>
            </HStack>
          ))
        ) : (
          <Text mt={2}>No invites found</Text>
        )}
      </Box>
    </Box>
  </VStack>
</Box>
); };

export default CreateChannelView;