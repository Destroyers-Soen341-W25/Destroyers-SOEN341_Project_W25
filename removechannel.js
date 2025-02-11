import db from './Database-conf.js';

async function removechannel(channelId) {
    try{
    const channel = await db.collection('channels').doc(channelId).delete();
} catch (error) {
        console.error("Error deleting channel", error);
}
}
export default removechannel;
//console.log(await removechannel("Ti0ywCQ7ZbINW2uvw4od"));