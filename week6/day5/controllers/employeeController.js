const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Payroll = require('../models/payroll');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('departmentId', 'name');
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const {
      first_name, last_name, email, phone, password,
      role = 'employee', departmentId, baseSalary
    } = req.body;
    if (role === 'manager' && !departmentId) {
      return res.status(400).json({ message: 'Department is required for manager role' });
    }
    const existing = await Employee.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const employee = await Employee.create({
      first_name,
      last_name,
      email,
      phone,
      password,
      role,
      departmentId,
      baseSalary
    });

    res.status(201).json({
      message: 'Employee created',
      employee: {
        id: employee._id,
        name: `${employee.first_name} ${employee.last_name}`,
        email: employee.email,
        role: employee.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.bulkInsertEmployees = async (req, res) => {
  const employees = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    for (const pair of employees) {
      const { employee, payroll } = pair;
      const createdEmp = await Employee.create([employee], { session });
      payroll.employeeId = createdEmp[0]._id;
      if (payroll.basePay < 1000) {
        throw new Error('Manual failure simulation');
      }
      await Payroll.create([payroll], { session });
    }
    await session.commitTransaction();
    res.status(201).json({ message: 'Bulk insert successful' });
  } catch (err) {
    await session.abortTransaction();w
    res.status(500).json({ message: 'Transaction failed', error: err.message });
  } finally {
    session.endSession();
  }
};
