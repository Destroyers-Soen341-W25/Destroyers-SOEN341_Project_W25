const request = require('supertest');
const app = require('../server.js');


describe('Channel Routes Tests', () => {
    test('Create a new channel', async () => {
        const response = await request(app)
            .post('/create-channel')
            .send({ channelName: "Test Channel" });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Channel created successfully');
    });

    test('Fetch all channels', async () => {
        const response = await request(app).get('/all-channels');
        expect(response.statusCode).toBe(200);
        expect(response.body.channels).toBeDefined();
    });
});
