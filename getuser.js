import db from './Database-conf.js';




async function getUser(name) {
    try {
        const insertedUser = await db.collection('users').where('name', '==', name).get();
        
        if (insertedUser.empty) {
           
            console.log(`No user found with name: ${name}`);
            return null;
        }

        const u = insertedUser.docs[0]; 
        const data = u.data();
        console.log(u.id); 
        
        return { id: u.id, name: data.name, password: data.password, role: data.role };
    } catch (error) {
        console.error("Error getting user:", error);
    }
} 

export default getUser;
 
