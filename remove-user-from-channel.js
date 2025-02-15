import db from './Database-conf.js';
import fetchchannel from './getchannel.js';
export default async function removefromChannel(userId,channelId){
    try{
        
        const channelDoc = await db.collection('channels').doc(channelId).get();
        
    
        if (!channelDoc.exists) {
            throw new Error('Channel not found');
        }


        const channel = channelDoc.data();

     
        const updatedUserIds = channel.userIds.filter((id) => id !== userId);


        await db.collection('channels').doc(channelId).update({ userIds: updatedUserIds });

        console.log("Updated userIds:", updatedUserIds);

        return { ...channel, userIds: updatedUserIds };

        
        
    }
    catch(error){
        console.error("Error adding user:", error);
    }
}

