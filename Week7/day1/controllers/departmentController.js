const mongoose = require('mongoose');
const Department = require('../models/Department');
const Employee = require('../models/Employee');

exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Department name is required' });

    const existing = await Department.findOne({ name });
    if (existing) return res.status(409).json({ message: 'Department already exists' });

    const department = await Department.create({ name });
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch departments', details: err.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const deleted = await Department.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDepartmentEmployeeStats = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const stats = await Employee.aggregate([
      { $match: { departmentId: new mongoose.Types.ObjectId(departmentId) } },
      {
        $group: {
          _id: '$departmentId',
          totalEmployees: { $sum: 1 },
          avgSalary: { $avg: '$baseSalary' }
        }
      }
    ]);
    res.json(stats[0] || { totalEmployees: 0, avgSalary: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
