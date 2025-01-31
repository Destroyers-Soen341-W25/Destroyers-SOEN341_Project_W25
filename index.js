//this is a test to connect to the database and add to it (to be reviewed)

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./database');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const { name, password} = req.body;
        const newUser = new User({ name, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
