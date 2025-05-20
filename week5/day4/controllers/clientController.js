const {
  readClients,
  writeClients,
  findClientByEmail,
  findClientById,
} = require("../services/clientService");
const { AppError } = require("../utils/errors");
const { v4: uuidv4 } = require("uuid");

const getAllClients = async (req, res, next) => {
  try {
    const clients = await readClients();
    res.status(200).json(clients);
  } catch (err) {
    next(err);
  }
};
const addClient = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      throw new AppError("Missing client data", 400);
    }
    const clients = await readClients();
    if (findClientByEmail(clients, email)) {
      throw new AppError("Duplicate email", 400);
    }
    const newClient = { id: uuidv4(), name, email };
    clients.push(newClient);
    await writeClients(clients);
    res.status(201).json(newClient);
  } catch (err) {
    next(err);
  }
};

const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clients = await readClients();
    const client = findClientById(clients, id);
    if (!client) {
      throw new AppError("Client not found", 404);
    }
    res.status(200).json(client);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllClients,
  addClient,
  getClientById,
};
