const Payroll = require('../models/payroll');
const { handlePayrollTransaction } = require('../services/payrollService');

exports.createPayroll = async (req, res) => {
  const { employeeId, baseSalary, bonus, deductions } = req.body;

  try {
    const payroll = await handlePayrollTransaction(employeeId, baseSalary, bonus, deductions);
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
