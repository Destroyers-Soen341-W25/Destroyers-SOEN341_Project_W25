import db from './Database-conf.js';

export default async function removemessages(channelId, messageId) {
    try {
        
        const messageDoc = await db.collection('channels').doc(channelId).collection('messages').doc(messageId).get();

        if (!messageDoc.exists) {
            throw new Error(`Message not found in channel ${channelId}`);
        }

        
        await db.collection('channels').doc(channelId).collection('messages').doc(messageId).delete();

        console.log(`Message with ID "${messageId}" removed successfully.`);

        return { success: true, message: "Message removed successfully" };

    } catch (error) {
        console.error("Error removing message:", error);
        return { success: false, error: error.message };
    }
}

    console.log(await removemessages('8DNT3M9LdTWEIgn2oqRm', 'lXuSvnPWVLvJ9VXONKMB'));
