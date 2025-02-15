import db from './Database-conf.js';

async function getAllChannels() {
    try {
        const channelsSnapshot = await db.collection('channels').get();
        const channels = channelsSnapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));

        return channels;
    } catch (error) {
        console.error("Error fetching channels:", error);
        throw error; // Re-throw the error to handle it in the API route
    }
}
export default getAllChannels;
console.log( await getAllChannels());
