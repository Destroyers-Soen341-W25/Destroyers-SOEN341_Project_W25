import request from 'supertest';
import app from '../server.js'; // Assuming this is your entry point

describe('Server Tests', () => {
    test('Server responds successfully', async () => {
        const response = await request(app).get('/all-users');
        expect(response.statusCode).toBe(200);
    });
});
