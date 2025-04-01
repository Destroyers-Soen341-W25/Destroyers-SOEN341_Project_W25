
import db from './Database-conf.js';

// message
const message ={
    content: 'please work!!',
}

async function Sendmessage(userId,channelId, message) {
    try{
        const messageRef = db.collection('channels').doc(channelId).collection('messages').doc();
        await messageRef.set({
            senderId: userId,
            content: message,
            timestamp: new Date(),
        });
        console.log('Message sent with id: ', messageRef.id);
        return { messageId: messageRef.id };
    }catch(error){
        console.error('Error sending a message: ', error);
    }
}

export default Sendmessage;
console.log(await Sendmessage('gWk9GzaIsxy0ng9ULzfO','8DNT3M9LdTWEIgn2oqRm',message));
// import db from './Database-conf.js';
//
//
// const message = {
//     content: 'hello!! 😊',
//     quotedMessageId: null,
// }
//
// async function Sendmessage(userId, channelId, message, quotedMessageId = null) {
//     try {
//         const messageRef = db.collection('channels').doc(channelId).collection('messages').doc();
//
//         await messageRef.set({
//             senderId: userId,
//             content: message.content,
//             timestamp: new Date(),
//         });
//
//         if (quotedMessageId) {
//             const quotedMessageRef = db.collection('channels').doc(channelId).collection('messages').doc(quotedMessageId);
//             const quotedMessageSnapshot = await quotedMessageRef.get();
//             if (quotedMessageSnapshot.exists) {
//                 const quotedMessage = quotedMessageSnapshot.data();
//                 await quotedMessageRef.update({
//                     quotedMessage: {
//                         id: messageRef.id,
//                         content: message.content
//                     }
//                 });
//                 console.log('Quoted message updated with ID:', messageRef.id);
//             } else {
//                 console.log('Quoted message not found.');
//             }
//         }
//         console.log('Message sent with id: ', messageRef.id);
//     } catch (error) {
//         console.error('Error sending a message: ', error);
//     }
// }
//
// export default Sendmessage;
//
// //console.log(await Sendmessage('gWk9GzaIsxy0ng9ULzfO', '8DNT3M9LdTWEIgn2oqRm', message));
// //console.log(await Sendmessage('gWk9GzaIsxy0ng9ULzfO', '8DNT3M9LdTWEIgn2oqRm', message, 'ynfjDmf1YMHH18QV74p7'));
//
// // import db from './Database-conf.js';
// //
// // // message
// // const message ={
// //     content: 'please work!!',
// // }
// //
// // async function Sendmessage(userId,channelId, message) {
// //     try{
// //         const messageRef = db.collection('channels').doc(channelId).collection('messages').doc();
// //         await messageRef.set({
// //             senderId: userId,
// //             content: message,
// //             timestamp: new Date(),
// //         });
// //         console.log('Message sent with id: ', messageRef.id);
// //     }catch(error){
// //         console.error('Error sending a message: ', error);
// //     }
// // }
// //
// // export default Sendmessage;
// // console.log(await Sendmessage('gWk9GzaIsxy0ng9ULzfO','8DNT3M9LdTWEIgn2oqRm',message));
