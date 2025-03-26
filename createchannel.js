import db from './Database-conf.js';


async function createchannel(channelName, channelType) {

    const channel={
        channelname:channelName,
        channeltype:channelType
    }
    
    try{
    const result = await db.collection('channels').add(channel);
    console.log('Channel created with ID: ', result.id);
}catch(error){
    console.error('Error creating channel ', error);
}
}
//createUser(user1);
export default createchannel;
createchannel("Welcome Channel","Public");
