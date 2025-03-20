const request = require('supertest');
const app = require('../../server.js');



describe('User Routes Tests', () => {
    test('Register a new user', async () => {
        const response = await request(app)
            .post('/register')
            .send({ name: "testUser", password: "testPass", role: "member" });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    test('Login with valid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({ name: "testUser", password: "testPass" });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Login successful');
    });

    test('Login with invalid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({ name: "wrongUser", password: "wrongPass" });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });
});
