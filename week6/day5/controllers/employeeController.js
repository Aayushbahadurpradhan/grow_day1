const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Payroll = require('../models/payroll');

exports.getAllEmployees = async (req, res) => {
  try {
    const { name, sort = 'createdAt', order = 'asc', page = 1, limit = 10 } = req.query;
    const query = {};
    if (name) {
      query.first_name = { $regex: name, $options: 'i' };
    }
    const skip = (page - 1) * parseInt(limit);
    const employees = await Employee.find(query)
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('departmentId', 'name');

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
      first_name, last_name, email, phone, password, role, departmentId, baseSalary
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
    await session.abortTransaction();
    res.status(500).json({ message: 'Transaction failed', error: err.message });
  } finally {
    session.endSession();
  }
};
exports.getEmployeeStatistics = async (req, res) => {
  try {
    const totalCount = await Employee.countDocuments();
    const groupByRole = await Employee.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    const avgSalary = await Employee.aggregate([
      { $group: { _id: null, averageSalary: { $avg: '$baseSalary' } } }
    ]);
    res.json({
      totalCount,
      groupByRole,
      averageSalary: avgSalary[0]?.averageSalary ?? 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getSalaryRangeByDepartment = async (req, res) => {
  try {
    const stats = await Employee.aggregate([
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department'
        }
      },
      { $unwind: '$department' },
      {
        $group: {
          _id: '$department.name',
          minSalary: { $min: '$baseSalary' },
          maxSalary: { $max: '$baseSalary' },
          avgSalary: { $avg: '$baseSalary' }
        }
      }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
