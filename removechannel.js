import db from './Database-conf.js';

async function removechannel(channelId) {

    if (!channelId || typeof channelId !== 'string') {
        console.error("Invalid channelId:", channelId);
        return;
    }

    try{

    const channel = await db.collection('channels').doc(channelId).delete();
} catch (error) {
        console.error("Error deleting channel", error);
}
}
export default removechannel;
