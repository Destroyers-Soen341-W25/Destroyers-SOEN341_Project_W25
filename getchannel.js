import db from './Database-conf.js';

async function getchannel(channelId) {
    try {
        if (!channelId || typeof channelId !== "string") {
            throw new Error("Invalid channel ID: must be a non-empty string");
        }

        const channel = await db.collection('channels').doc(channelId).get();

        if (!channel.exists) {
            throw new Error(`Channel with ID '${channelId}' not found.`);
        }

        return channel.data();
    } catch (error) {
        console.error("Error fetching channel:", error);
        return null; // Return null instead of crashing the program
    }
}

export default getchannel;
