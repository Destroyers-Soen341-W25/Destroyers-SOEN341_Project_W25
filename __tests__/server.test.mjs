import request from 'supertest';
import app from '../server.js'; // ✅ Import app (no need for index.js)

describe('Server Tests', () => {
  it('should respond to GET /all-users', async () => {
    const response = await request(app).get('/all-users');
    expect(response.status).toBe(200);
  });
});
