import db from './Database-conf.js';

async function SendDM(userId, messageContent, receiverId) {
    if (!receiverId) {
        throw new Error("Receiver ID is not provided");
    }
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
        throw error;
    }
}

export default SendDM;

