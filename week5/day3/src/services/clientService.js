const { readData, writeData } = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');
const DB_FILE = '../clients.json'
exports.getAllClients = async (nameFilter) => {
  const clients = await readData(DB_FILE);
  if (nameFilter) {
    return clients.filter(client =>
      client.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
  return clients;
};
exports.getClientById = async (id) => {
  const clients = await readData(DB_FILE);
  return clients.find(client => client.id === id);
};
exports.createClient = async (data) => {
  const clients = await readData(DB_FILE);
  const newClient = { id: uuidv4(), ...data };
  clients.push(newClient);
  await writeData(DB_FILE, clients);
  return newClient;
};
exports.updateClient = async (id, newData) => {
  const clients = await readData(DB_FILE);
  const index = clients.findIndex(c => c.id === id);
  if (index === -1) return null;
  clients[index] = { id, ...newData };
  await writeData(DB_FILE, clients);
  return clients[index];
};
exports.deleteClient = async (id) => {
  let clients = await readData(DB_FILE);
  const exists = clients.some(c => c.id === id);
  if (!exists) return false;
  clients = clients.filter(c => c.id !== id);
  await writeData(DB_FILE, clients);
  return true;
};
