const request = require('supertest');
const app = require('../../app');

describe('Admin Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/admin/register')
      .send({ email: 'a@test.com', password: '123456', phone: '1234567890', role: 'admin' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Registered successfully');
  });

  it('should not register duplicate email', async () => {
    await request(app)
      .post('/api/admin/register')
      .send({ email: 'duplicate@test.com', password: 'pass', phone: '9876543210', role: 'admin' });

    const res = await request(app)
      .post('/api/admin/register')
      .send({ email: 'duplicate@test.com', password: 'pass', phone: '1112223333', role: 'admin' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Duplicate email');
  });

  it('should login successfully', async () => {
    await request(app)
      .post('/api/admin/register')
      .send({ email: 'login@test.com', password: '123456', phone: '7778889999', role: 'admin' });

    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'login@test.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.headers['set-cookie']).toBeDefined();
  });
});
