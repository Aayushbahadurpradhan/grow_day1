const { z } = require('zod');

const userSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
  role: z.enum(['admin', 'user'])
});

module.exports = {  userSchema };
