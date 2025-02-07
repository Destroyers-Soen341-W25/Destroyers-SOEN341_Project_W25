import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const configPath = process.env.FIREBASE_CONFIG_PATH || './firebase-config.json';

if (!fs.existsSync(configPath)) {
    process.exit(1);
}

const rawConfig = fs.readFileSync(configPath, 'utf8');
let firebaseConfig;

try {
    firebaseConfig = JSON.parse(rawConfig);
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

firebaseConfig.private_key = firebaseConfig.private_key.trim().replace(/\\n/g, '\n');

// Initialize Firebase
initializeApp({
    credential: cert(firebaseConfig),
});

const db = getFirestore();
export default db;
