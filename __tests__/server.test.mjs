import request from 'supertest';
import app from '../server.js'; 
import { jest } from '@jest/globals';
import * as assignUserToChannelModule from '../assign_user-channel.js';  // Import the whole module to access the default export


describe('API Unit Tests', () => {
    // Register User Tests
    // User created successfully
    test('Register User - Success', async () => {
        const res = await request(app).post('/register').send({
            name: 'testuser',
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
          name: 'testuser',
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
  const userId = 'user123';  // Example user ID
  const channelId = 'channel123';  // Example channel ID

  // First, make sure the user and channel exist in the database
  // (You might need to create a user and a channel if they're not created yet)

  const res = await request(app)
    .post('/assign-user')
    .send({ userId, channelId });

  // Check if the response status is 200 (OK)
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('User assigned to channel');

  // Optionally check that the user is now part of the channel
  expect(res.body.updatedChannel.userIds).toContain(userId);
  expect(res.body.updatedChannel.channelId).toBe(channelId);
});

  // remove user from channel tests
  test('Remove User from Channel - Success', async () => {
    const userId = 'user123';  // Example user ID
    const channelId = 'channel123';  // Example channel ID

    // Send the request to remove user from the channel
    const res = await request(app)
      .post('/deassign-user')
      .send({ userId, channelId });

    // Check if the response status is 200 (OK)
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User removed from channel');

    // Optionally check that the user is no longer part of the channel
    expect(res.body.updatedChannel.userIds).not.toContain(userId);
    expect(res.body.updatedChannel.channelId).toBe(channelId);
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
      const channelId = 'channel123';  // Example channel ID
      const messageIds = ['message1', 'message2'];  // Example message IDs to remove
  
      // Send the request to remove messages from the channel
      const res = await request(app)
        .post('/remove-messages')
        .send({ channelId, messageIds });
  
      // Check if the response status is 200 (OK)
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Messages removed successfully');
  
      // Optionally, check if the messages are actually removed
      // (If the API returns the updated channel or messages list, you can add assertions here)
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
  
      // User Status Tests
      // Set User Status
    test('Set User Status', async () => {
      const res = await request(app).post('/set-user-status').send({
          userId: 'user1',
          status: 'online'
      });
      expect(res.status).toBe(200);
  });
    // Get User Status
    test('Get User Status', async () => {
      const res = await request(app).post('/get-user-status').send({ userId: 'user1' });
      expect(res.status).toBe(200);
  });

});
