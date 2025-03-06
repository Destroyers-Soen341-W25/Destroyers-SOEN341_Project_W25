import db from './Database-conf.js';



export default async function getuserschannel(userId){
    try{
        const channelsSnapshot = await db.collection('channels').get();
        const channels = channelsSnapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        console.log(userId);
        
        //const userchannels = channels.filter(channel => channel.userIds.includes(userId));
        const userchannels = channels.filter(channel => channel.userIds.map(String).includes(String(userId)));
        console.log(userchannels);
        return userchannels;
    }catch(error){
        console.error("Error fetching channels:", error);
        throw error; 
    }
}

