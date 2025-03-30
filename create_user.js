import db from './Database-conf.js';
import setstatus from "./setuserstatus.js";
const user1 = {
    "name":"i am a tired",
    "password":"54321",
    "role":"member",
}
async function createUser(user) {
    try{
        const result = await db.collection('users').add(user);
        console.log('User added with ID: ', result.id);
        setstatus(result.id, 'Online')
            .then(result => console.log('Status update result:', result))
            .catch(err => console.error('Status update error:', err));
        return result.id;

    }catch(error){
        console.error('Error adding document: ', error);
    }
}
createUser(user1);
export default createUser;