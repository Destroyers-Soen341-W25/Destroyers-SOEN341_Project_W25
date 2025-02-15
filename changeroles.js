import db from './Database-conf.js';
import fetchuser from './getuser.js';
export default async function changeroles(role_new,userId){
    try{
 

        await db.collection('users').doc(userId).update({role: role_new });
    
        
    }
    catch(error){
        console.error("Error changing user role: ", error);
    }
}
