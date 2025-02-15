// getchannel.js
import db from './Database-conf.js';

/**
 * If you truly store channels by doc ID,
 * then fetching it is as simple as:
 */
async function getchannel(channelId) {
  try {
    const docRef = db.collection('channels').doc(channelId);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      return null;
    }
    return docSnap.data();  // e.g. { channelname: "haha", userIds: [...] }
  } catch (error) {
    console.error("Error in getchannel:", error);
    return null;
  }
}

export default getchannel;
