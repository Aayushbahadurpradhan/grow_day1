const Employee = require('../models/Employee');

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
      role = 'employee', departmentId, salary
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
      salary
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