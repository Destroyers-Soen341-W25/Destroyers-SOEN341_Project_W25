import db from './Database-conf.js';
/*const user1 = {
    "name":"monda",
    "password":"monda2025",
    "role":"admin",
}*/
async function createUser(user) {
try{
    const result = await db.collection('users').add(user);
    console.log('User added with ID: ', result.id);
    console.log(user);
}catch(error){
    console.error('Error adding document: ', error);
}
}
//createUser(user1);
export default createUser;
