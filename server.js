import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import createUser from './create_user.js';
import getUser from './getuser.js';
import db from './Database-conf.js';

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
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Team Creation (Admin Only)
app.post('/teams', async (req, res) => {
    const { teamName, adminName } = req.body;
    if (!teamName || !adminName) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const admin = await getUser(adminName);
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can create teams' });
        }
        await db.collection('teams').add({ teamName, adminName, members: [] });
        res.status(201).json({ message: 'Team created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
});

// Assign User to Team (Admin Only)
app.post('/teams/:teamId/members', async (req, res) => {
    const { userName, adminName } = req.body;
    const { teamId } = req.params;
    if (!userName || !adminName) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const admin = await getUser(adminName);
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can assign users to teams' });
        }
        const teamRef = db.collection('teams').doc(teamId);
        const team = await teamRef.get();
        if (!team.exists) {
            return res.status(404).json({ message: 'Team not found' });
        }
        await teamRef.update({ members: [...team.data().members, userName] });
        res.status(200).json({ message: 'User added to team' });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning user to team', error });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(cors({ origin: "http://localhost:5500" }));