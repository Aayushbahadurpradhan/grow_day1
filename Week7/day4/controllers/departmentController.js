const Department = require('../models/Department');

exports.getAllDepartments = async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
};

exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Department.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ message: 'Duplicate department name' });
    }
    const department = await Department.create({ name });
    res.status(201).json(department);
  } catch (err) {
    console.error('Create department error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateDepartment = async (req, res) => {
  const updated = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteDepartment = async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.json({ message: 'Department deleted' });
};
exports.getDepartmentById = async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (!department) return res.status(404).json({ message: 'Department not found' });
  res.json(department);
};