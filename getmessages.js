import db from './Database-conf.js';

async function getmessages(channelId) {
    try {
        const messages = await db.collection('channels').doc(channelId).collection('messages').get();

        if (!messages.empty) {
            return messages.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
