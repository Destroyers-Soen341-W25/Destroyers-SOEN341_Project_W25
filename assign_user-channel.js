import db from './Database-conf.js';
import fetchchannel from './getchannel.js';
export default async function assignUserToChannel(userId,channelId){
    try{
        const channel= await fetchchannel(channelId);
 
        if(channel.userIds.includes(userId)){
            return channel;
        }
        channel.userIds.push(userId);
        await db.collection('channels').doc(channelId).update(channel);
        return channel;
        
    }
    catch(error){
        console.error("Error adding user:", error);
    }
}



