import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const configPath = process.env.FIREBASE_CONFIG_PATH || './firebase-config.json';

if (!fs.existsSync(configPath)) {
    console.error("❌ ERROR: Firebase configuration file not found.");
    process.exit(1);
}

const rawConfig = fs.readFileSync(configPath, 'utf8');
let firebaseConfig;

try {
    firebaseConfig = JSON.parse(rawConfig);
} catch (error) {
    console.error("❌ ERROR: Failed to parse Firebase JSON.");
    console.error(error.message);
    process.exit(1);
}

// 🔥 FIX: Ensure `private_key` has no extra spaces and has correct newlines
firebaseConfig.private_key = firebaseConfig.private_key.trim().replace(/\\n/g, '\n');

// Debugging: Print private key and its length
console.log("✅ Private Key (First 50 chars):", firebaseConfig.private_key.substring(0, 50));
console.log("✅ Private Key (Last 50 chars):", firebaseConfig.private_key.substring(firebaseConfig.private_key.length - 50));
console.log("✅ Private Key Length:", firebaseConfig.private_key.length);

// 🔥 If private key is too short, stop the server
if (firebaseConfig.private_key.length < 800) {
    console.error("❌ ERROR: Private Key is too short! Check `firebase-config.json` formatting.");
    process.exit(1);
}

// Initialize Firebase
initializeApp({
    credential: cert(firebaseConfig),
});

const db = getFirestore();
export default db;
