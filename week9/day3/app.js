require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const adminRoutes = require('./Admin/admin.routes');
const payrollRoutes = require('./Payroll/payroll.routes');
const auditRoutes = require('./audit/auditTrial.routes');
const employeeRoutes = require('./Employee/employee.routes');
const { sendError } = require('./utils/errorResponse');
const requestLogger = require('./middlewares/requestLogger');

require('./config/db'); 

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(requestLogger); 

app.use('/api/admin', adminRoutes);
app.use('/api/payrolls', payrollRoutes);
app.use('/api/audit-trail', auditRoutes);
app.use('/api/employees', employeeRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err);
  sendError(res, err.statusCode || 500, err.message || 'Internal Server Error');
});

module.exports = app;
