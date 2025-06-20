module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
