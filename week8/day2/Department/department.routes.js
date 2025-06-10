const express = require('express');
const router = express.Router();

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  getDepartmentEmployeeStats
} = require('./department.controller');

const { authenticate } = require('../middlewares/auth.middleware');
const rbac = require('../middlewares/rbac.middleware');

router.use(authenticate, rbac(['admin']));

router.post('/', createDepartment);
router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);
router.get('/:id/stats', getDepartmentEmployeeStats);

module.exports = router;
