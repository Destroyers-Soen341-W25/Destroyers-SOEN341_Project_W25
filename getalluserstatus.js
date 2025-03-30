import db from './Database-conf.js';

async function getAllUserStatuses() {
    try {
        const usersSnapshot = await db.collection('users').get();

        console.log('All User Statuses:');
        const statusPromises = usersSnapshot.docs.map(async (userDoc) => {
            const userId = userDoc.id;
            const userName = userDoc.data().name;

            const statusSnapshot = await db.collection('users').doc(userId)
                .collection('status').doc('current status').get();

            if (statusSnapshot.exists) {
                const statusData = statusSnapshot.data();
                console.log(`User ${userName} (${userId}): Status = ${statusData.status}, Last seen = ${statusData.lastseen.toDate()}`);
            } else {
                console.log(`User ${userName} (${userId}): No status set`);
            }
        });

        await Promise.all(statusPromises);
    } catch (error) {
        console.error('Error fetching user statuses:', error);
    }
}

export default getAllUserStatuses;
getAllUserStatuses();