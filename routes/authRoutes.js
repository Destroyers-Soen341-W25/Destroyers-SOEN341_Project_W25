import express from 'express'; // import express
import bcrypt from 'bcrypt'; // for password hashing
import jwt from 'jsonwebtoken'; // for JWT tokens
import { body, validationResult } from 'express-validator';
import db from '../database.js';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

// register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hashedPassword, role: isAdmin ? 'admin' : 'user' };
        const userRef = await db.collection('users').add(newUser);
        res.status(201).json({ id: userRef.id, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usersSnapshot = await db.collection('users').where('email', '==', email).get();
        if (usersSnapshot.empty) return res.status(401).json({ error: 'Invalid email or password' });
        
        const user = usersSnapshot.docs[0].data();
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ error: 'Invalid email or password' });
        
        const token = jwt.sign({ id: usersSnapshot.docs[0].id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
