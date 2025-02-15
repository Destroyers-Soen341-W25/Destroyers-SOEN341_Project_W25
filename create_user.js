// create_user.js
import db from './Database-conf.js';

async function createUser(user) {
  try {
    // Force channels: [] if not provided
    if (!user.channels) {
      user.channels = [];
    }
    const result = await db.collection('users').add(user);
    console.log('User added with ID: ', result.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}
export default createUser;
