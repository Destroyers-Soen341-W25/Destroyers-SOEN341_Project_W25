import request from 'supertest';
import app from '../server.js';

let server;

beforeAll(() => {
  // Start a test server before running tests
  server = app.listen(4000);
});

afterAll((done) => {
  // Close the server after all tests are done
  server.close(done);
});

describe('Server Tests', () => {
  it('should respond to GET /all-users', async () => {
    const response = await request(app).get('/all-users');
    expect(response.status).toBe(200);
  });
});
