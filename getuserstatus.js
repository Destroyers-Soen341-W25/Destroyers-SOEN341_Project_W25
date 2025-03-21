import db from './Database-conf.js';

async function getstatus(userId) {
    try {
        const userstatus = await db.collection('users').doc(userId).collection('status').doc('current status').get();

        if (userstatus.exists) {
            let userdata=userstatus.data();

            if (userdata.lastseen) {
                userdata.lastseen = new Date(userdata.lastseen.toMillis()).toString();
            }

            return userdata;

        } else {
            console.log("No status found");
            return [];
        }
    } catch (error) {
        console.error("Error loading status: ", error);
        return [];
    }
}

export default getstatus;

//console.log(await getstatus('84Jk1xiJIBRMeEf7A92D'));