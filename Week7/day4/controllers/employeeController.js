const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find().populate('department', 'name');
  res.json(employees);
};

exports.createEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
};

exports.updateEmployee = async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
};
exports.getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.id).populate('department', 'name');
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
};