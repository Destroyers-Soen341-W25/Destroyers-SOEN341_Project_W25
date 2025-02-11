import db from './Database-conf.js';

async function getUser(name) {
    try{
    const insertedUser = await db.collection('users').where('name', '==', name).get();
    const exists = insertedUser.docs.length > 0;
    console.log(insertedUser.docs[0].id);
    if (exists) {
         const u = insertedUser.docs[0];
         const data = u.data();
         return {id: u.id , name: data.name, password: data.password, role: data.role};
    }
} catch (error) {
        console.error("Error adding user:", error);
}
}
export default getUser;
console.log(await getUser("test1")); 
