require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auditRoutes = require('./Audit/audit.routes');
const adminRoutes = require('./Admin/admin.routes');
const employeeRoutes = require('./Employee/employee.routes');
const payrollRoutes = require('./Payroll/payroll.routes');
const departmentRoutes = require('./Department/department.routes');
const { sendError } = require('./utils/errorResponse');
const auditMiddleware = require('./middlewares/audit.middleware');

require('./config/db')();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));


app.use(auditMiddleware);

app.use('/api/audit', auditRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/payrolls', payrollRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  sendError(res, statusCode, message);
});

module.exports = app;
