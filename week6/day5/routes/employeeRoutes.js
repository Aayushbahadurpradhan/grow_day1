const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  bulkInsertEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeStatistics,
  getSalaryRangeByDepartment,
  getCountDemo
} = require('../controllers/employeeController');

router.get('/', getAllEmployees);
router.post('/', createEmployee);
router.post('/bulk', bulkInsertEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/stats/salary-range', getSalaryRangeByDepartment);
router.get('/stats/overview', getEmployeeStatistics);
router.get('/stats/count', getCountDemo);

module.exports = router;
