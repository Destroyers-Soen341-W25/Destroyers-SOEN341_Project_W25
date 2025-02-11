import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import createUser from './create_user.js';
import getUser from './getuser.js';
import db from './Database-conf.js';
import removeChannel from './removechannel.js';
import {assignUserToChannel} from './assign_user-channel.js';
import {changeroles} from './changeroles.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
        if (user.name == 'superadmin' && user.password == 'superadmin'){
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
//Remove channel
app.delete('/remove-channel',async (req,res) => {
    const {channelId}=req.body;
    try {
        await removeChannel(channelId);
        res.status(200).json({ message: 'Channel removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing channel', error });
    }
});
//Change roles
app.put('/change-role', async (req, res) => {
    const { username, role } = req.body;
    try {
        const updatedUser = await changeroles(role, username);
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
app.post('/remove-user', async (req, res) => {
    const { userId, channelId } = req.body;
    try {
        const updatedChannel = await removeUserFromChannel(userId, channelId);
        res.status(200).json({ message: 'User removed from channel', updatedChannel });
    } catch (error) {
        res.status(500).json({ message: 'Error removing user', error });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(cors({ origin: "http://localhost:5500" }));
