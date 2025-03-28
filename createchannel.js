// import db from './Database-conf.js';


// async function createchannel(channelName, channelType) {

//     const channel={
//         channelname:channelName,
//         channeltype:channelType
//     }
    
//     try {
//         const result = await db.collection('channels').add(channel);
//         console.log('Channel created with ID: ', result.id);
//         // Возвращаем объект канала с идентификатором
//         return { id: result.id, ...channel };
//       } catch (error) {
//         console.error('Error creating channel ', error);
//         throw error; // пробрасываем ошибку для обработки на уровне API
//       }
// }
// //createUser(user1);
// export default createchannel;
// createchannel("Welcome Channel","Public");


// createchannel.js
import db from './Database-conf.js';

async function createchannel(channelName, channelType) {
  const channel = {
    channelname: channelName,
    channeltype: channelType
  };

  try {
    const result = await db.collection('channels').add(channel);
    console.log('Channel created with ID: ', result.id);
    // Возвращаем объект канала, включая его ID
    return { id: result.id, ...channel };
  } catch (error) {
    console.error('Error creating channel ', error);
    throw error;
  }
}

export default createchannel;

// Убедитесь, что здесь нет тестовых вызовов типа:
// createchannel("Welcome Channel", "Public");

