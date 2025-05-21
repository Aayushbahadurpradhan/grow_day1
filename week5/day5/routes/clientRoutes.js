const express = require('express');
const router = express.Router();
const {
  getAllClients,
  getClient,
  addClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

router.get('/', getAllClients);
router.get('/:id', getClient);
router.post('/', addClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
