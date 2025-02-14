import db from './Database-conf.js';
import fetchuser from './getuser.js';
export async function changeroles(Role,username){
    try{
        const user= await fetchuser(username);
        //console.log(user);
        //console.log(user.role);
        user.role=Role;
        await db.collection('users').doc(user.id).update({name: user.name, password: user.password, role: user.role});
        return user;
        
    }
    catch(error){
        console.error("Error changing user role: ", error);
    }
}
//console.log(await changeroles("admin","test1"));