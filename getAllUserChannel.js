import db from './Database-conf.js';

/*const user={
    id: 'gWk9GzaIsxy0ng9ULzfO',
};*/

export default async function getuserschannel(userId){
    try{
        const channelsSnapshot = await db.collection('channels').get();
        const channels = channelsSnapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        const userchannels = channels.filter(channel => channel.userIds.includes(userId));
        return userchannels;
    }catch(error){
        console.error("Error fetching channels:", error);
        throw error; // Re-throw the error to handle it in the API route
    }
}

//console.log(await getuserschannel(user.id));