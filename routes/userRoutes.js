import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../database.js';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

// Middleware for Authentication
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ error: 'Access denied' });
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Get User by Name
router.get('/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const usersSnapshot = await db.collection('users').where('name', '==', name).get();
        if (usersSnapshot.empty) return res.status(404).json({ error: 'User not found' });
        res.json(usersSnapshot.docs[0].data());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User (Admin Only)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });

        const userToDelete = await db.collection('users').doc(req.params.id).get();
        if (!userToDelete.exists) return res.status(404).json({ error: 'User not found' });

        // Prevent admins from deleting themselves
        if (req.user.id === req.params.id) {
            return res.status(400).json({ error: 'You cannot delete your own account' });
        }

        await db.collection('users').doc(req.params.id).delete();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



export default router;
