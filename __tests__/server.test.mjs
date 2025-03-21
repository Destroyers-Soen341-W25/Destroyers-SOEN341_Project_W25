import request from 'supertest';
import app from '../server.js';

let server;

beforeAll(() => {
  // Start a test server before running tests
  server = app.listen(4000);
});

afterAll(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});


describe('Server Tests', () => {
  it('should respond to GET /all-users', async () => {
    const response = await request(app).get('/all-users');
    expect(response.status).toBe(200);
  });
});

process.on('beforeExit', () => {
  console.log('Jest is waiting for something to finish...');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});
