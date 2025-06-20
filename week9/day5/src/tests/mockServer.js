import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/login', (req, res, ctx) => {
    const { email, password } = req.body;
    if (email === 'test@example.com' && password === 'password') {
      return res(ctx.status(200), ctx.json({ token: 'test-token' }));
    }
    return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
  }),
];

export const server = setupServer(...handlers);
