import db from './Database-conf.js';



async function createchannel(channelName, channelType, creatorId) {

    console.log("creator "+ creatorId);
    const channel = {
        channelname: channelName,
        channelType: channelType,
        createdby: creatorId,
        userIds: []
    };

    try {
        const result = await db.collection('channels').add(channel);
        console.log('Channel created with ID: ', result.id);
        return { id: result.id, ...channel }; //returning created channel with its id
    } catch (error) {
        console.error('Error creating channel ', error);
        throw error;
    }
}
export default createchannel;