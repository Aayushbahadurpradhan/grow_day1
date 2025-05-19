const clientService = require('../services/clientService');
const { validateClient } = require('../utils/validate');

exports.getAllClients = async (req, res) => {
  const { name } = req.query;
  const clients = await clientService.getAllClients(name);
  res.json(clients);
};
exports.getClientById = async (req, res) => {
  const client = await clientService.getClientById(req.params.id);
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
};
exports.createClient = async (req, res) => {
  const { error } = validateClient(req.body);
  if (error) return res.status(400).json({ error });

  const newClient = await clientService.createClient(req.body);
  res.status(201).json(newClient);
}
exports.updateClient = async (req, res) => {
  const { error } = validateClient(req.body);
  if (error) return res.status(400).json({ error });

  const updatedClient = await clientService.updateClient(req.params.id, req.body);
  if (!updatedClient) return res.status(404).json({ message: 'Client not found' });
  res.json(updatedClient);
};

exports.deleteClient = async (req, res) => {
  const deleted = await clientService.deleteClient(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Client not found' });
  res.json({ message: 'Client deleted' });
};
