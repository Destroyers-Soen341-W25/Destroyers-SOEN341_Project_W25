import admin from 'firebase-admin'; // import the firebase SDK
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG))
}); // Initialize firebase admin SDK

const db = getFirestore();
export default db;
