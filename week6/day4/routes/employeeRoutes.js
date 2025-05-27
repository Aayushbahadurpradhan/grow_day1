const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  bulkInsertEmployees
} = require('../controllers/employeeController');

router.get('/', getAllEmployees);
router.post('/', createEmployee);
router.post('/bulk', bulkInsertEmployees);

module.exports = router;
