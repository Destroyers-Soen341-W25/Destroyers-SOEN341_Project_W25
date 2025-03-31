import db from './Database-conf.js';
import fetchchannel from './getchannel.js';
export async function assignUserToChannel(userId,channelId){
    try{
        const channel= await fetchchannel(channelId);
        //console.log(channel);
        if (!channel.userIds) {
            channel.userIds = [];
          }
          
          if (channel.userIds.includes(userId)) {
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
//assignUserToChannel("jLe6i69vnjVvH2ZpOWxc","8N8FvtyC07CJzUsbwUNU");
//console.log( await assignUserToChannel("fO2aiPXfJGwJj1XUWCFi","8N8FvtyC07CJzUsbwUNU"));