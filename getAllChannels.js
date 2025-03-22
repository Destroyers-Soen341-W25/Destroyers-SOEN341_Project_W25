import db from './Database-conf.js';

export default async function getuserschannel(userId){
    try{
        const channelsSnapshot = await db.collection('channels').get();
        const channels = channelsSnapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        const userchannels = channels.filter(channel => channel.userIds.includes(userId));
        return channels;
    }catch(error){
        console.error("Error fetching channels:", error);
        throw error;
    }
}
