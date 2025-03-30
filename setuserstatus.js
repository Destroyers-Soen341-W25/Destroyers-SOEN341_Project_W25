import db from './Database-conf.js';

async function setstatus(userId, status) {
    try {
        const userstatus = {
            status: status,
            lastseen: new Date(),
        };

        await db.collection('users').doc(userId).collection('status').doc('current status').set(userstatus, { merge: true });
        console.log(`User ${userId} status set to: ${status}`);
        return { success: true, userId, status };

    } catch (error) {
        console.error('Error setting the user status:', error);
        return { error: error.message };
    }
}

export default setstatus;