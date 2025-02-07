import db from './Database-conf.js';

async function getUser(name) {
    try{
        console.log("Searching name:", name);
    const insertedUser = await db.collection('users').where('name', '==', name).get();
    console.log("inserted user is ", insertedUser);
    const exists = insertedUser.docs.length > 0;
    if (exists) {
         console.log(insertedUser.docs[0].data())
         return insertedUser.docs[0].data();
    }else{
        console.log("USER NOT FOUND");
        return 0;
    }
} catch (error) {
        console.error("Error adding user:", error);
}
}
export default getUser;