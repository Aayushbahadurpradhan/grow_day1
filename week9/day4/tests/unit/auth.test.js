const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../Admin/admin.model');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { z } = require('zod');

jest.mock('../middlewares/auth.middleware.js', () => ({
    authenticate: (req, res, next) => {
        req.user = { id: 'mockUserId', role: 'admin' };
        next();
    },
}));

jest.mock('../middlewares/rateLimiter.js');

const validPhone = () => '98' + faker.number.int({ min: 10000000, max: 99999999 }).toString();

describe('Admin Testing Module', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    });

    test('Register user successfully', async () => {
        const fakeUser = {
            email: faker.internet.email(),
            password: 'password123',
            role: 'admin',
            phone: validPhone(),
        };

        const res = await request(app)
            .post('/api/admin/register')
            .send(fakeUser);

        expect(res.status).toBe(201);
        expect(z.object({ message: z.string() }).safeParse(res.body).success).toBe(true);
    });

    test('Login with correct credentials', async () => {
        const email = faker.internet.email();
        const password = 'password';
        const phone = validPhone();

        await request(app).post('/api/admin/register').send({ email, password, phone, role: 'admin' });

        const res = await request(app).post('/api/admin/login').send({ email, password });

        expect(res.status).toBe(200);
        expect(z.object({ accessToken: z.string() }).safeParse(res.body).success).toBe(true);
    });

    test('Login with wrong credentials fails', async () => {
        const res = await request(app).post('/api/admin/login').send({
            email: 'wrong@example.com',
            password: 'wrongpass',
        });

        expect(res.status).toBe(401);
        expect(res.body.message.toLowerCase()).toContain('invalid');
    });

    test('DB Timeout on register', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
            return new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 100)
            );
        });

        const res = await request(app).post('/api/admin/register').send({
            email: faker.internet.email(),
            password: 'test',
            phone: validPhone(),
            role: 'admin',
        });

        expect(res.status).toBe(500);
        consoleSpy.mockRestore();
    });

    test('Logout fails without token', async () => {
        const realApp = require('../app');
        const res = await request(realApp).post('/api/admin/logout');
        expect(res.status).toBe(401);
        expect(res.body.message.toLowerCase()).toContain('no refresh token provided');
    });

    test('Change-password fails without token', async () => {
        const res = await request(app)
            .post('/api/admin/change-password')
            .send({ oldPassword: 'password1', newPassword: 'newPassword123' });

        expect([400, 401]).toContain(res.status);
    });

    test('Register fails with invalid input (validation error)', async () => {
        const invalidUser = {
            email: 'invalid-email',
            password: '',
            role: 'admin',
        };

        const res = await request(app).post('/api/admin/register').send(invalidUser);
        expect(res.status).toBe(400);
        expect(res.body.message.toLowerCase()).toContain('validation');
    });

    test(
        'Expired token should fail on logout',
        async () => {
            jest.resetModules();
            const realApp = require('../app');

            const email = faker.internet.email();
            const password = 'password123';
            const phone = validPhone();

            await request(realApp)
                .post('/api/admin/register')
                .send({ email, password, phone, role: 'admin' });

            await new Promise((res) => setTimeout(res, 500));

            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found after registration');

            const token = jwt.sign(
                { id: user._id, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1s' }
            );

            await new Promise((res) => setTimeout(res, 2000)); 

            const res = await request(realApp)
                .post('/api/admin/logout')
                .set('Authorization', `Bearer ${token}`);

            expect([401, 403]).toContain(res.status);
            expect(res.body.message.toLowerCase()).toContain('expired');
        },
        15000
    );

    test('Refresh token fails with invalid token', async () => {
        const res = await request(app)
            .post('/api/admin/refresh-token')
            .send({ token: 'invalidtoken' });

        expect(res.status).toBe(401);
        expect(res.body.message.toLowerCase()).toMatch(/invalid|no refresh token/);
    });
});
