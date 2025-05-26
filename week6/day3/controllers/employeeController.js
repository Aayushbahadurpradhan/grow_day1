const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEmployeesWithDepartments = async (req, res) => {
  try {
    const employees = await Employee.find().populate('departmentId', 'name');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
