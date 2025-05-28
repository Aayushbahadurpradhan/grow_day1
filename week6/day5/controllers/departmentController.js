const Department = require('../models/Department');

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