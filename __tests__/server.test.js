import request from 'supertest';
import app from '../server.js'; 
import { jest } from '@jest/globals';
import * as assignUserToChannelModule from '../assign_user-channel.js';


describe('API Unit Tests', () => {
    // Register User Tests
    // User created successfully
    test('Register User - Success', async () => {
        const res = await request(app).post('/register').send({
            name: 'chandler123',
            password: 'password123',
            role: 'user'
        });
        expect(res.status).toBe(201);
    });
    //Missing required fields
    test('Register User - Bad Request', async () => {
      const res = await request(app).post('/register').send({});
      expect(res.status).toBe(400);
  });
    
    // Login User Tests
    // User logged in successfully
    test('Login User - Success', async () => {
      // Ensure the user is created first
      await request(app).post('/register').send({
          name: 'chandler123',
          password: 'password123',
          role: 'user'
      });
    
      // Then log in
      const res = await request(app).post('/login').send({
          name: 'chandler123',
          password: 'password123'
      });
    
      expect(res.status).toBe(200);
    });

    // Invalid credentials tests
    test('Login User - Unauthorized', async () => {
      const res = await request(app).post('/login').send({
          name: 'chandler123',
          password: 'wrongpassword'
      });
      expect(res.status).toBe(401);
  });

    //Get All Users Tests
    // Returns list of all users
    test('Get All Users', async () => {
      const res = await request(app).get('/all-users');
      expect(res.status).toBe(200);
  });

    // get user by name
    // returns user details
    test('Get User by Name', async () => {
      const res = await request(app).post('/get-user').send({ username: 'testuser' });
      expect(res.status).toBe(200);
  });

    // create channel tests
    // channel created successfully
    test('Create Channel - Success', async () => {
      const res = await request(app).post('/remove-channel').send({ channelId: '12345' });
      expect(res.status).toBe(200);
    });

    // Remove Channel Tests
    test('Remove Channel - Success', async () => {
      const res = await request(app).post('/remove-channel').send({ channelId: '12345' });
      expect(res.status).toBe(200);
  });

    // get all channels
  test('Get All Channels', async () => {
    const res = await request(app).get('/all-channels');
    expect(res.status).toBe(200);
});

  // assign user to channel tests
  test('Assign User to Channel - Success', async () => {
  const userId = 'Chandler123';  
  const channelId = '8DNT3M9LdTWEIgn2oqRm'; 

  const res = await request(app)
    .post('/assign-user')
    .send({ userId, channelId });

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('User assigned to channel');
});

  // remove user from channel tests
  test('Remove User from Channel - Success', async () => {
    const userId = 'user123';  
    const channelId = 'channel123'; 

    // Send the request to remove user from the channel
    const res = await request(app)
      .post('/deassign-user')
      .send({ userId, channelId });

    // Check if the response status is 200 (OK)
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User removed from channel');
  });

    // Messaging Tests
    test('Send Message in Channel', async () => {
     const res = await request(app).post('/send-message').send({
      userId: 'user1',
      channelId: 'channel1',
      message: 'Hello world'
  });
    expect(res.status).toBe(201);
});

    // Get Messages from Channel Tests
    test('Get Messages from Channel', async () => {
      const res = await request(app).post('/get-messages').send({ channelId: 'channel1' });
      expect(res.status).toBe(200);
  });

    // remove messages from channel tests
    test('Remove Messages from Channel - Success', async () => {
      const channelId = 'k6VQipJ3Ryia3vd87v37';  
      const messageId = '4VaTUrvZxSLAZc44YzqI';  
    
      const res = await request(app)
        .post('/remove-messages')
        .send({ channelId, messageId });  
    
      console.log("Test Response:", res.body);  
    
      expect(res.status).toBe(201);
      expect(res.body.result.success).toBe(true);  
      expect(res.body.result.message).toBe('Message removed successfully'); 
    });
    

    // Direct Messaging Tests
    test('Send DM', async () => {
      const res = await request(app).post('/send-dm').send({
          recipientId: 'user2',
          senderId: 'user1',
          message: 'Private message'
      });
      expect(res.status).toBe(201);
  });

        // Get DMs Tests
        test('Get DMs', async () => {
          const res = await request(app).post('/get-dms').send({ userId: 'user1' });
          expect(res.status).toBe(200);
      });

});

// Set User Status
test('Set User Status - Success', async () => {
  const res = await request(app)
    .post('/set-user-status')
    .send({ userId: 'user123', status: 'Online' });
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('status was successfully updated');
});

// Get User Status
test('Get User Status - Success', async () => {
  const res = await request(app)
    .post('/get-user-status')
    .send({ userId: 'user123' });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('userdata');
});

test('Post Join Request - Success', async () => {
  const res = await request(app)
    .post('/join-request')
    .send({ channelId: 'channelABC', userId: 'userXYZ' });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('message');
});

test('Accept Join Request - Success', async () => {
  const res = await request(app)
    .post('/accept-request')
    .send({ channelId: 'channelABC', userId: 'userXYZ' });
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Join request accepted');
});

test('Reject Join Request - Success', async () => {
  const res = await request(app)
    .post('/reject-request')
    .send({ channelId: 'channelABC', userId: 'userXYZ' });
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Join request rejected');
});

test('Send Invite - Success', async () => {
  const res = await request(app)
    .post('/send-invite')
    .send({ channelId: 'channelABC', inviteeId: 'user2', inviterId: 'user1' });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('message');
});

test('Accept Invite - Success', async () => {
  const res = await request(app)
    .post('/accept-invite')
    .send({ channelId: 'channelABC', userId: 'user2' });
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Invite accepted');
});

test('Reject Invite - Success', async () => {
  const res = await request(app)
    .post('/reject-invite')
    .send({ channelId: 'channelABC', userId: 'user2' });
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Invite rejected');
});

test('Get Join Requests - Success', async () => {
  const res = await request(app)
    .get('/get-join-requests')
    .query({ channelId: 'channelABC' });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('requests');
});

test('Get My Invites - Success', async () => {
  const res = await request(app)
    .get('/get-my-invites')
    .query({ userId: 'user2' });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('invites');
});
