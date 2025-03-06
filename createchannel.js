import db from './Database-conf.js';


async function createchannel(channel) {
try{
    const docRef = await db.collection('channels').add({
        channelname: channel, 
        userIds: [] 
    });
    console.log('Channel created with ID: ', docRef.id);
}catch(error){
    console.error('Error creating channel ', error);
}
}

export default createchannel;

