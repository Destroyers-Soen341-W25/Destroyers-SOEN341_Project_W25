import db from './Database-conf.js';

async function getUser(name) {
    try{
    const insertedUser = await db.collection('users').where('name', '==', name).get();
    const exists = insertedUser.docs.length > 0;
    if (exists) {
         return insertedUser.docs[0].data();
    }
} catch (error) {
        console.error("Error adding user:", error);
}
}
export default getUser;