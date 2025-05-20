const fs = require("fs").promises;
const path = require("path");

const clientFile = path.join(__dirname, "..", "clients.json");

const readClients = async () => {
  try {
    const data = await fs.readFile(clientFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeClients = async (clients) => {
  await fs.writeFile(clientFile, JSON.stringify(clients, null, 2));
};

const findClientByEmail = (clients, email) =>
  clients.find((c) => c.email === email);

const findClientById = (clients, id) => clients.find((c) => c.id === id);

module.exports = {
  readClients,
  writeClients,
  findClientByEmail,
  findClientById,
};
