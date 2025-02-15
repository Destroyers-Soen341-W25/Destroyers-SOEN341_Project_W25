// getuser.js (no major change needed, just verifying we do have channels)
import db from './Database-conf.js';

async function getUser(name) {
  try {
    const querySnapshot = await db.collection('users')
      .where('name', '==', name)
      .get();

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const data = userDoc.data();
      return {
        id: userDoc.id,
        name: data.name,
        password: data.password,
        role: data.role,
        channels: data.channels || []
      };
    }
    return null; 
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export default getUser;
