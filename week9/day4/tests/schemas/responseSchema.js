const { z } = require('zod');

const loginResponseSchema = z.object({
  accessToken: z.string(),
  message: z.string().optional()
});

module.exports = { loginResponseSchema };
