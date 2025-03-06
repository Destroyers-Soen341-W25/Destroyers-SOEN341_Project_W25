import db from './Database-conf.js';

async function getchannel(channelId) {
    try{
    const channel = await db.collection('channels').doc(channelId).get();

    if (channel) {
         return channel.data();
    }
} catch (error) {
        console.error("Error adding user:", error);
}
}
export default getchannel;
console.log(await getchannel());
