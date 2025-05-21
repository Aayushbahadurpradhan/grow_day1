const { v4: uuidv4 } = require('uuid');
const { readJsonFile, writeJsonFile } = require('../utils/fileHandler');
const path = require('path');
const file = path.join(__dirname, '../data/clients.json');
exports.getClients = async () => await readJsonFile(file);
exports.getClientById = async (id) => {
  const clients = await readJsonFile(file);
  return clients.find(c => c.id === id);
};
exports.addClient = async (data) => {
  const clients = await readJsonFile(file);
  const newClient = { id: uuidv4(), ...data };
  clients.push(newClient);
  await writeJsonFile(file, clients);
  return newClient;
};
exports.updateClient = async (id, data) => {
  const clients = await readJsonFile(file);
  const index = clients.findIndex(c => c.id === id);
  if (index === -1) return null;
  clients[index] = { ...clients[index], ...data };
  await writeJsonFile(file, clients);
  return clients[index];
};
exports.deleteClient = async (id) => {
  const clients = await readJsonFile(file);
  const updated = clients.filter(c => c.id !== id);
  await writeJsonFile(file, updated);
  return true;
};
