import express from 'express'; // imports Express.js
import dotenv from 'dotenv'; // imports dotenv for loading environment var
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); //load the .env file
const app = express(); //an instance of express app
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
