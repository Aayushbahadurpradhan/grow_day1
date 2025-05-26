const express = require('express');
const router = express.Router();
const departmentCtrl = require('../controllers/departmentController');

router.post('/', departmentCtrl.createDepartment);

module.exports = router;
