import db from './Database-conf.js';

async function createUser(user) {
try{
    const result = await db.collection('users').add(user);
    console.log('User added with ID: ', result.id);
}catch(error){
    console.error('Error adding document: ', error);
}
}

export default createUser;
