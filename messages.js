
import db from './Database-conf.js';

// message
const message ={
    content: 'please work!!',
}

async function Sendmessage(userId,channelId, message, messageType = "text") {
    try{
        const messageRef = db.collection('channels').doc(channelId).collection('messages').doc();
        await messageRef.set({
            senderId: userId,
            content: message,
            timestamp: new Date(),
            type: messageType
        });
        console.log('Message sent with id: ', messageRef.id);
        return { messageId: messageRef.id };
    }catch(error){
        console.error('Error sending a message: ', error);
    }
}

export default Sendmessage;
console.log(await Sendmessage('gWk9GzaIsxy0ng9ULzfO','8DNT3M9LdTWEIgn2oqRm',message));
