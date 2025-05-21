const ClientService = require('../services/clientService');

exports.getAllClients = async (req, res) => {
  const data = await ClientService.getClients();
  res.json(data);
};

exports.getClient = async (req, res) => {
  const client = await ClientService.getClientById(req.params.id);
  if (!client) return res.status(404).json({ error: 'Client not found' });
  res.json(client);
};

exports.addClient = async (req, res) => {
  const newClient = await ClientService.addClient(req.body);
  res.status(201).json(newClient);
};

exports.updateClient = async (req, res) => {
  const updated = await ClientService.updateClient(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Client not found' });
  res.json(updated);
};

exports.deleteClient = async (req, res) => {
  await ClientService.deleteClient(req.params.id);
  res.json({ message: 'Client deleted' });
};
