const Payroll = require('../models/Payroll');
const { handlePayrollTransaction } = require('../services/payrollService');

exports.createPayroll = async (req, res) => {
  const { employeeId, Salary, bonus, deductions } = req.body;
  try {
    const payroll = await handlePayrollTransaction(employeeId, Salary, bonus, deductions);
    res.status(201).json({ message: 'Payroll created successfully', payroll });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPayrollsByEmployee = async (req, res) => {
  try {
    const payrolls = await Payroll.find({ employeeId: req.params.id });
    res.status(200).json(payrolls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEmployeesSortedByNetPay = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * parseInt(limit);
    const result = await Payroll.aggregate([
      {
        $lookup: {
          from: 'employees',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'employee'
        }
      },
      { $unwind: '$employee' },
      { $sort: { netPay: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $project: {
          _id: 0,
          employeeId: 1,
          netPay: 1,
          name: {
            $concat: ['$employee.first_name', ' ', '$employee.last_name']
          },
          departmentId: '$employee.departmentId',
          Salary: '$employee.Salary'
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate('employeeId', 'first_name last_name');
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }
    res.status(200).json(payroll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePayroll = async (req, res) => {
  try {
    const deleted = await Payroll.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Payroll not found' });
    }
    res.status(200).json({ message: 'Payroll deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
