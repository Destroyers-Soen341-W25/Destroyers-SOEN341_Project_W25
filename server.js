
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import createUser from './create_user.js';
import getUser from './getuser.js';
import db from './Database-conf.js';
import removeChannel from './removechannel.js';
import {assignUserToChannel} from './assign_user-channel.js';
import {changeroles} from './changeroles.js';
import createchannel from './createchannel.js'
import getAllChannels from './getAllChannels.js';
import getAllUsers from './getAllUsers.js';
import getchannel from './getchannel.js';
import {removefromChannel} from './remove-user-from-channel.js';
import getuserschannel from './getAllUserChannel.js';
import Sendmessage from './messages.js';
import getmessages from './getmessages.js';
import SendDM from "./sendDM.js";
import getchat from './getchat.js';
import getstatus from './getuserstatus.js';
import setstatus from './setuserstatus.js';


const app = express();
app.use(bodyParser.json());

// OR allow all origins (not recommended for production)
app.use(cors({origin: "http://localhost:3001",credentials: true}));



// User Registration
app.post('/register', async (req, res) => {
    const { name, password, role } = req.body;
    if (!name || !password || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        await createUser({ name, password, role });
        console.log("Successul")
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ message: 'Missing credentials' });
    }
    try {
        const user = await getUser(name);
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user.name === 'superadmin' && user.password === 'superadmin'){
            res.status(200).json({ message: 'founder', user });
        }
        else
        {
            res.status(200).json({ message: 'Login successful', user });
        }
        console.log("Logged");
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});
//Get all users
app.get('/all-users', async (req, res) => {
    try {
        console.log("trying to fetch all users");
        const users = await getAllUsers();
        console.log("Users are: ", users);
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});


//Get user
app.post('/get-user', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await getUser(username);
        console.log("Name is", username);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

//createchannel
app.post('/create-channel', async (req, res) => {
    const { channelName } = req.body;
    if (!channelName) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        console.log("Creating a channel...");
        const channel = await createchannel(channelName);
        res.status(201).json({ message: 'Channel created successfully', channel });
    } catch (error) {
        res.status(500).json({ message: 'Error creating channel', error });
    }
});


//Remove channel
app.post('/remove-channel',async (req,res) => {
    const {channelId}=req.body;
    try {
        await removeChannel(channelId);
        res.status(200).json({ message: 'Channel removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing channel', error });
    }
});
//Get channel
app.post('/get-channel', async (req, res) => {
    const { channelId } = req.body;
    try {
        const channel = await getchannel(channelId);
        res.status(200).json({ channel });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching channel', error });
    }
});


app.post('/get-user-channels', async(req, res)=>{

    const {current_user_id} = req.body;
    try {
        const channels = await getuserschannel(current_user_id);
        res.status(200).json({channels});
    }
    catch (error){
        res.status(500).json({message: 'Error fetching channels for user'});

    }
})

//Get all channels
app.get('/all-channels', async (req, res) => {
    try {
        console.log("TRYING ALL CHANELS");
        const channels = await getAllChannels();
        res.status(200).json({ channels });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching channels', error });
    }
});

//Change roles
app.post('/change-role', async (req, res) => {
    const {role, userId } = req.body;
    try {
        const updatedUser = await changeroles(role,userId);
        res.status(200).json({ message: 'User role updated', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error });
    }
});


//Assign user to channel
app.post('/assign-user',async(req,res)=>{
    const{userId,channelId}=req.body;
    try{
        const updatedChannel= await assignUserToChannel(userId,channelId);
        res.status(200).json({ message: 'User assigned to channel', updatedChannel });
    }catch (error){
        res.status(500).json({message:'Error assigning to channel',error});
    }

});


//Remove user from channel
app.post('/deassign-user', async (req, res) => {
    const {channelId,  userId} = req.body;

    console.log(req.body);

    console.log("Received userId:", userId);
    console.log("Received channelId:", channelId);

    try {
        const updatedChannel = await removefromChannel(userId, channelId);
        res.status(200).json({ message: 'User removed from channel', updatedChannel });
    } catch (error) {
        res.status(500).json({ message: 'Error removing user', error });
    }
});

//Send message
app.post('/send-message', async (req, res) => {
    const {channelId, message, userId} = req.body;
    try {
        await Sendmessage(userId, channelId, message);
        res.status(201).json();
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
});

//Get messages
app.post('/get-messages', async (req, res) => {
    const { channelId } = req.body;
    try {
        const messages = await getmessages(channelId);
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});

//remove messages from channel
app.post('/remove-messages', async (req, res) => {
    const { channelId, messageIds } = req.body;
    try {
        await removeMessages(channelId, messageIds);
        res.status(200).json({ message: 'Messages removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing messages', error });
    }
});
//send a DM
app.post('/send-dm', async (req, res) => {
    const { recipientId, senderId, message } = req.body;
    try {
        await SendDM(senderId, message,recipientId);
        res.status(201).json();
    } catch (error) {
        res.status(500).json({ message: 'Error sending DM', error });
    }
});
//get all DM
app.post('/get-dms', async (req, res) => {
    const { userId } = req.body;
    try {
        const dms = await getchat(userId);
        res.status(200).json({ dms });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching DMs', error });
    }
});

//get user status
app.post('/get-user-status', async(req,res)=>{

    console.log("Recieved request");
    const { userId } = req.body;
    try{
    const userdata = await getstatus(userId);

    res.status(200).json({userdata});
    }
    catch(error){
    res.status(500).json({message:'Error fetching status for the user'})};
    });

    app.post('/set-user-status', async(req,res)=>{
    const {userId, status} = req.body;
    try{
        await setstatus(userId, status);
        res.status(200).json({message: 'status was successfully updated'});
    } catch(error){
        res.status(500).json({ message: 'Error setting user status', error});
    }
    });



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// app.use(cors());


// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import createUser from './create_user.js';
// import getUser from './getuser.js';
// import db from './Database-conf.js';
// import removeChannel from './removechannel.js';
// import {assignUserToChannel} from './assign_user-channel.js';
// import {changeroles} from './changeroles.js';
// import createchannel from './createchannel.js'
// import getAllChannels from './getAllChannels.js';
// import getAllUsers from './getAllUsers.js';
// import getchannel from './getchannel.js';
// import {removefromChannel} from './remove-user-from-channel.js';
// import getuserschannel from './getAllUserChannel.js';
//
//
//
// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
//
// // User Registration
// app.post('/register', async (req, res) => {
//     const { name, password, role } = req.body;
//     if (!name || !password || !role) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }
//     try {
//         await createUser({ name, password, role });
//         console.log("Successul")
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// });
//
// // User Login
// app.post('/login', async (req, res) => {
//     const { name, password } = req.body;
//     if (!name || !password) {
//         return res.status(400).json({ message: 'Missing credentials' });
//     }
//     try {
//         const user = await getUser(name);
//         if (!user || user.password !== password) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         if (user.name == 'superadmin' && user.password == 'superadmin'){
//             res.status(200).json({ message: 'founder', user });
//         }
//         else
//         {
//             res.status(200).json({ message: 'Login successful', user });
//         }
//         console.log("Logged");
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in', error });
//     }
// });
// //Get all users
// app.get('/all-users', async (req, res) => {
//     try {
//         console.log("trying to fetch all users");
//         const users = await getAllUsers();
//         res.status(200).json({ users });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching users', error });
//     }
// });
//
//
// //Get user
// app.post('/get-user', async (req, res) => {
//     const { username } = req.body;
//     try {
//         const user = await getUser(username);
//         console.log("Name is", username);
//         res.status(200).json({ user });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user', error });
//     }
// });
//
// //createchannel
// app.post('/create-channel', async (req, res) => {
//     const { channelName } = req.body;
//     if (!channelName) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }
//     try {
//         console.log("Creating a channel...");
//         const channel = await createchannel(channelName);
//         res.status(201).json({ message: 'Channel created successfully', channel });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating channel', error });
//     }
// });
//
//
// //Remove channel
// app.post('/remove-channel',async (req,res) => {
//     const {channelId}=req.body;
//     try {
//
//
//
//         await removeChannel(channelId);
//         res.status(200).json({ message: 'Channel removed successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error removing channel', error });
//     }
// });
// //Get channel
// app.post('/get-channel', async (req, res) => {
//     const { channelId } = req.body;
//     try {
//         const channel = await getchannel(channelId);
//         res.status(200).json({ channel });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching channel', error });
//     }
// });
//
//
// app.post('/get-user-channels', async(req, res)=>{
//
//     const {current_user_id} = req.body;
//     try {
//         const channels = await getuserschannel(current_user_id);
//         res.status(200).json({channels});
//     }
//     catch (error){
//         res.status(500).json({message: 'Error fetching channels for user'});
//
//     }
// })
//
// //Get all channels
// app.get('/all-channels', async (req, res) => {
//     try {
//         console.log("TRYING ALL CHANELS");
//         const channels = await getAllChannels('gWk9GzaIsxy0ng9ULzf0');
//         res.status(200).json({ channels });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching channels', error });
//     }
// });
//
// //Change roles
// app.post('/change-role', async (req, res) => {
//     const {role, userId } = req.body;
//     try {
//         const updatedUser = await changeroles(role,userId);
//         res.status(200).json({ message: 'User role updated', updatedUser });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating role', error });
//     }
// });
//
//
// //Assign user to channel
// app.post('/assign-user',async(req,res)=>{
//     const{userId,channelId}=req.body;
//     try{
//         const updatedChannel= await assignUserToChannel(userId,channelId);
//         res.status(200).json({ message: 'User assigned to channel', updatedChannel });
//     }catch (error){
//         res.status(500).json({message:'Error assigning to channel',error});
//     }
//
// });
//
//
// //Remove user from channel
// app.post('/deassign-user', async (req, res) => {
//     const {channelId,  userId} = req.body;
//
//     console.log(req.body);
//
//     console.log("Received userId:", userId);
//     console.log("Received channelId:", channelId);
//
//     try {
//         const updatedChannel = await removefromChannel(userId, channelId);
//         res.status(200).json({ message: 'User removed from channel', updatedChannel });
//     } catch (error) {
//         res.status(500).json({ message: 'Error removing user', error });
//     }
// });
//
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
//
// app.use(cors());