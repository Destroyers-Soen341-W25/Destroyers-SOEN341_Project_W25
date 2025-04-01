import db from './Database-conf.js';
import { assignUserToChannel } from './assign_user-channel.js';

//create join request 
export async function createJoinRequest(channelId, userId) {
  try {
    const requestData = {
      userId,
      timestamp: new Date(),
    };
    console.log("request data is: ", channelId);
    
    const requestRef = await db
      .collection('channels')
      .doc(channelId)
      .collection('requests')
      .add(requestData);
    console.log('Join request created with id:', requestRef.id);
    return { requestId: requestRef.id, ...requestData };
  } catch (error) {
    console.error("Error creating join request:", error);
    throw error;
  }
}

// accept join request
export async function acceptJoinRequest(channelId, userId) {
    try {
      
      await assignUserToChannel(userId, channelId);
      
      const requestsSnapshot = await db
        .collection('channels')
        .doc(channelId)
        .collection('requests')
        .where('userId', '==', userId)
        .get();
  
      const batch = db.batch();
      requestsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log(`Join request(s) for user ${userId} in channel ${channelId} accepted and removed.`);
      return true;
    } catch (error) {
      console.error("Error accepting join request:", error);
      throw error;
    }
  }

  
//reject join request
  export async function rejectJoinRequest(channelId, userId) {
    try {
      const requestsSnapshot = await db
        .collection('channels')
        .doc(channelId)
        .collection('requests')
        .where('userId', '==', userId)
        .get();
  
      const batch = db.batch();
      requestsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log(`Join request(s) for user ${userId} in channel ${channelId} rejected and removed.`);
      return true;
    } catch (error) {
      console.error("Error rejecting join request:", error);
      throw error;
    }
  }



//create an invite 
export async function createInvite(channelId, inviteeId, inviterId) {
  try {
    const inviteData = {
      inviteeId,
      inviterId,
      timestamp: new Date(),
    };
    const inviteRef = await db
      .collection('channels')
      .doc(channelId)
      .collection('invites')
      .add(inviteData);
    console.log('Invite created with id:', inviteRef.id);
    return { inviteId: inviteRef.id, ...inviteData };
  } catch (error) {
    console.error("Error creating invite:", error);
    throw error;
  }
}



export async function getJoinRequests(channelId) {
   try { 
    const snapshot = await db 
    .collection('channels') 
    .doc(channelId) 
    .collection('requests') 
    .get(); 
    
    let requests = [];
     snapshot.forEach(doc => { requests.push({ id: doc.id, ...doc.data() }); });
      return requests; 
    } catch (error) {
       console.error("Error fetching join requests:", error);
        throw error;
       } 
      }


      export async function getInvites(channelId) { 
        try { 
          const snapshot = await db 
          .collection('channels') 
          .doc(channelId) 
          .collection('invites') 
          .get();
          
          let invites = []; 
          snapshot.forEach(doc => { invites.push({ id: doc.id, ...doc.data() }); });
          return invites; 
        } catch (error) {
           console.error("Error getting invites:", error);
            throw error; 
          } 
        }

        export async function getMyInvites(userId) {
           try {
             const channelsSnapshot = await db.collection('channels').get(); 
             let myInvites = []; const promises = []; 
             channelsSnapshot.forEach(channelDoc => { 
              const channelId = channelDoc.id; 
              const channelData = channelDoc.data(); 
              const p = db .collection('channels') .doc(channelId) .collection('invites') .where('inviteeId', '==', userId) 
              .get() 
              .then(inviteSnapshot => { 
                inviteSnapshot.forEach(inviteDoc => { myInvites.push({ id: inviteDoc.id, channelId, channelName: channelData.channelname, 
                 ...inviteDoc.data() }); }); }); promises.push(p); }); await Promise.all(promises); return myInvites; } 
                 catch (error) 
                 { 
                  console.error("Error getting my invites:", error); 
                  throw error; 
                } 
              }
