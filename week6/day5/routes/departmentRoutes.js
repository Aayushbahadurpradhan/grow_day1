const express = require('express');
const router = express.Router();
const { createDepartment,getAllDepartments } = require('../controllers/departmentController');

router.post('/', createDepartment);
router.get('/', getAllDepartments);

module.exports = router;
