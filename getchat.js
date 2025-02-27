import db from './Database-conf.js';

async function getchat(userId) {
    try {
        const messages = await db.collection('users').doc(userId).collection('messages').get();

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

export default getchat;

console.log(await getchat('84Jk1xiJIBRMeEf7A92D'));
