import db from './Database-conf.js';
import status from './setuserstatus.js';
/*const user1 = {
    "name":"i am a ghost",
    "password":"54321",
    "role":"member",
}*/
async function createUser(user) {
    try{
        const result = await db.collection('users').add(user);
        console.log('User added with ID: ', result.id);
        await status(result.id,'Online');
        console.log('User status set to Online');
        return result.id;

    }catch(error){
        console.error('Error adding document: ', error);
    }
}
//createUser(user1);
export default createUser;