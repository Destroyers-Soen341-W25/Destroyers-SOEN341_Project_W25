import db from './Database-conf.js';

async function getAllUsers() {
    try {
        const channelsSnapshot = await db.collection('users').get();
        const channels = channelsSnapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));

        return channels;
    } catch (error) {
        console.error("Error fetching channels:", error);
        throw error; // Re-throw the error to handle it in the API route
    }
}
export default getAllUsers;
console.log( await getAllUsers());
