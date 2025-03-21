import db from './Database-conf.js';

async function setstatus(userId,status) {
    try {
        const userstatus = {
            status: status,
            lastseen: new Date(),
        };

        await db.collection('users').doc(userId).collection('status').doc('current status').set(userstatus, { merge: true });
//        console.log('Current user status:', userstatus.id);
        return { statusId: userstatus.id };

    } catch (error) {
        console.error('Error setting the user status:', error);
        return { error: error.message };
    }
}

export default setstatus;
//console.log(await setstatus('84Jk1xiJIBRMeEf7A92D', 'Online'));
//console.log(await setstatus('84Jk1xiJIBRMeEf7A92D', 'Offline'));