const request = require('supertest');
const app = require('../server.js');


describe('Server Tests', () => {
    test('Server responds successfully', async () => {
        const response = await request(app).get('/all-users');
        expect(response.statusCode).toBe(200);
    });
});
