import db from './Database-conf.js';

async function getchannel(channelname) {
    try{
    const insertedUser = await db.collection('channels').where('channels', '==', channelname).get();
    const exists = insertedUser.docs.length > 0;
    if (exists) {
         return insertedUser.docs[0].data();
    }
} catch (error) {
        console.error("Error adding user:", error);
}
}
export default getchannel;