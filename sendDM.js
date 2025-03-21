import db from './Database-conf.js';

async function SendDM(userId, messageContent, receiverId) {
    try {

        const messageData = {
            senderId: userId,
            receiverId: receiverId,
            content: messageContent,
            timestamp: new Date(),
        };

        const senderMessageRef = await db.collection('users').doc(userId).collection('messages').add(messageData);

        await db.collection('users').doc(receiverId).collection('messages').doc(senderMessageRef.id).set(messageData);

        console.log('Message sent with ID:', senderMessageRef.id);
        return { messageId: senderMessageRef.id };

    } catch (error) {
        console.error('Error sending message:', error);
        return { error: error.message };
    }
}

export default SendDM;


console.log(await SendDM('84Jk1xiJIBRMeEf7A92D', 'Heyyy!!', 'Bgj4JLm6AfQmiuDqqdyc'));
