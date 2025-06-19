const { faker } = require('@faker-js/faker');

function generateFakeUser(overrides = {}) {
    return {
        email: faker.internet.email(),
        phone: '98' + faker.number.int({ min: 10000000, max: 99999999 }).toString(),
        password: 'TestPass123',
        role: 'admin',
        ...overrides
    };
}

module.exports = { generateFakeUser };
