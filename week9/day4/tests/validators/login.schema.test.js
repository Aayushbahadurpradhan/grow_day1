const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

describe('Zod Login Schema', () => {
  it('should pass with valid input', () => {
    const input = { email: 'test@example.com', password: '123456' };
    expect(() => loginSchema.parse(input)).not.toThrow();
  });

  it('should fail with invalid email', () => {
    const input = { email: 'bademail', password: '123456' };
    expect(() => loginSchema.parse(input)).toThrow();
  });

  it('should fail with short password', () => {
    const input = { email: 'test@example.com', password: '123' };
    expect(() => loginSchema.parse(input)).toThrow();
  });
});
