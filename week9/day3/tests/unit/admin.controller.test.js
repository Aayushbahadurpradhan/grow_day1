const httpMocks = require('node-mocks-http');
const controller = require('../../Admin/admin.controller');
const User = require('../../Admin/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../Admin/admin.model');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../utils/tokenUtils', () => ({
    generateAccessToken: jest.fn(() => 'access-token'),
    generateRefreshToken: jest.fn(() => 'refresh-token')
}));

describe('Admin Controller - Auth Functions', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    //////////////////////////////////////////////////////////////////////////////

    describe('register', () => {
        it('should register a new user', async () => {
            const req = httpMocks.createRequest({
                method: 'POST',
                body: { email: 'test@example.com', phone: '1234567890', password: 'password123', role: 'admin' }
            });
            const res = httpMocks.createResponse();
            User.findOne.mockResolvedValue(null);
            User.prototype.save = jest.fn();

            await controller.register(req, res);
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData().message).toBe('Registered successfully');
        });

        it('should return 400 for duplicate email', async () => {
            const req = httpMocks.createRequest({
                method: 'POST',
                body: { email: 'test@example.com', phone: '1234567890', password: 'password123' }
            });
            const res = httpMocks.createResponse();
            User.findOne.mockResolvedValue({ email: 'test@example.com' });

            await controller.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData().message).toBe('Duplicate email');
        });
    });

    //////////////////////////////////////////////////////////////////////////////

    describe('login', () => {
        it('should login successfully with valid credentials', async () => {
            const req = httpMocks.createRequest({
                method: 'POST',
                body: { email: 'test@example.com', password: 'password123' }
            });
            const res = httpMocks.createResponse();

            const user = {
                _id: '123',
                email: 'test@example.com',
                password: 'hashedPassword',
                save: jest.fn(),
                refreshToken: ''
            };

            User.findOne.mockReturnValue({
                select: jest.fn().mockResolvedValue(user)
            });

            bcrypt.compare.mockResolvedValue(true);

            await controller.login(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData().accessToken).toBe('access-token');
        });

        it('should return 401 for invalid credentials (user not found)', async () => {
            const req = httpMocks.createRequest({
                method: 'POST',
                body: { email: 'test@example.com', password: 'wrong' }
            });
            const res = httpMocks.createResponse();

            User.findOne.mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            });

            await controller.login(req, res);
            expect(res.statusCode).toBe(401);
            expect(res._getJSONData().message).toBe('Invalid credentials');
        });
    });

    //////////////////////////////////////////////////////////////////////////////

    describe('logout', () => {
        it('should logout successfully and clear cookie', async () => {
            const req = httpMocks.createRequest({
                method: 'POST',
                cookies: { refreshToken: 'valid-refresh-token' }
            });
            const res = httpMocks.createResponse();
            jwt.verify.mockReturnValue({ id: '123' });

            const user = { refreshToken: 'valid-refresh-token', save: jest.fn() };
            User.findById = jest.fn().mockResolvedValue(user);

            await controller.logout(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData().message).toBe('Logged out successfully');
        });
    });

    //////////////////////////////////////////////////////////////////////////////
    describe('changePassword', () => {
        it('should change password if current is correct', async () => {
            const req = httpMocks.createRequest({
                method: 'PUT',
                body: { currentPassword: 'old', newPassword: 'newpass' },
                user: { id: '123' }
            });
            const res = httpMocks.createResponse();

            const user = {
                password: 'hashedOld',
                save: jest.fn(),
                refreshToken: ''
            };

            User.findById.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(true);

            await controller.changePassword(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData().message).toBe('Password changed. Please login again.');
        });

        it('should return 400 if current password is wrong', async () => {
            const req = httpMocks.createRequest({
                method: 'PUT',
                body: { currentPassword: 'wrong', newPassword: 'newpass' },
                user: { id: '123' }
            });
            const res = httpMocks.createResponse();

            const user = {
                password: 'hashedOld',
                save: jest.fn()
            };

            User.findById.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(false);

            await controller.changePassword(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getJSONData().message).toBe('Current password incorrect');
        });
    });

});
