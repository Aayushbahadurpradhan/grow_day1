const { faker } = require('@faker-js/faker');

function generateFakeUser(overrides = {}) {
  return {
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: faker.internet.password(10),
    role: 'admin',
    ...overrides
  };
}

module.exports = { generateFakeUser };
