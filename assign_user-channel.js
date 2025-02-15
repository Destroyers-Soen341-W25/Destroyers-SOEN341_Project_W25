// assign_user-channel.js
import db from './Database-conf.js';
import fetchchannel from './getchannel.js';
import getUser from './getuser.js';

/**
 * Assign a user (by user doc ID) to a channel (by channel doc ID).
 * Also update the user's doc so that they know about this channel.
 */
export async function assignUserToChannel(userId, channelId) {
  try {
    // 1) Fetch the channel doc
    const channel = await fetchchannel(channelId); 
    if (!channel) {
      throw new Error("Channel not found in fetchchannel()");
    }

    // 2) If not already in channel.userIds, add userId
    if (!channel.userIds) {
      channel.userIds = [];
    }
    if (!channel.userIds.includes(userId)) {
      channel.userIds.push(userId);
      await db.collection('channels').doc(channelId).update({ userIds: channel.userIds });
    }

    // 3) Fetch the user doc so we can update its channels array
    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      throw new Error("User doc not found for ID=" + userId);
    }

    const userData = userSnap.data();
    if (!userData.channels) {
      userData.channels = [];
    }

    // For maximum clarity, store the channel doc ID or the channel's name
    // If your channel doc has { channelname: "haha" }, you can store that:
    if (!userData.channels.includes(channel.channelname)) {
      userData.channels.push(channel.channelname);
      await userRef.update({ channels: userData.channels });
    }

    // Return the updated channel or something else as needed
    return { ...channel, userIds: channel.userIds };
  } catch (error) {
    console.error("Error assigning user:", error);
    throw error;
  }
}
