import db from './Database-conf.js';

async function getmessages(channelId) {
    try {
        const messages = await db.collection('channels').doc(channelId).collection('messages').get();

        if (!messages.empty) {
            return messages.docs.map(doc => {
                const messageData = doc.data();
                if (messageData.timestamp) {
                    messageData.timestamp = messageData.timestamp.toDate(); 
                }
                return { id: doc.id, ...messageData };
            });
        } else {
            console.log("No messages found");
            return [];
        }
    } catch (error) {
        console.error("Error retrieving messages:", error);
        return [];
    }
}

export default getmessages;

console.log(await getmessages('8DNT3M9LdTWEIgn2oqRm'));
