const { v4: uuidv4 } = require('uuid');
const { readJsonFile, writeJsonFile } = require('../utils/fileHandler');
const path = require('path');
const bcrypt = require('bcrypt');

const file = path.join(__dirname, '../data/users.json');

exports.registerUser = async ({ username, password }) => {
  const users = await readJsonFile(file);
  if (users.find(u => u.username === username)) return { error: 'User already exists' };

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, password: hashedPassword };
  users.push(newUser);
  await writeJsonFile(file, users);
  return newUser;
};

exports.loginUser = async ({ username, password }) => {
  const users = await readJsonFile(file);
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: 'Invalid credentials' };
  }
  return user;
};
