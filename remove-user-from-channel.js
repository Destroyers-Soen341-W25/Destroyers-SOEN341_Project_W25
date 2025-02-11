import db from './Database-conf.js';
import fetchchannel from './getchannel.js';
export async function assignUserToChannel(userId,channelId){
    try{
        const channel= await fetchchannel(channelId);
        const userIds = channel.userIds;
        channel.userIds = userIds.filter((id)=>id!==userId);
        console.log(channel.userIds);
        await db.collection('channels').doc(channelId).update(channel);
        return channel;
        
    }
    catch(error){
        console.error("Error adding user:", error);
    }
}
//assignUserToChannel("jLe6i69vnjVvH2ZpOWxc","8N8FvtyC07CJzUsbwUNU");
console.log( await assignUserToChannel("jLe6i69vnjVvH2ZpOWxc","8N8FvtyC07CJzUsbwUNU"));