const reportService = require('../service/report.service');
const { sendError } = require('../utils/errorResponse');

exports.getUnverifiedUsers = async (req, res) => {
  try {
    const users = await reportService.notifyHRUnverifiedUsers();
    res.json({ count: users.length, users });
  } catch (err) {
    sendError(res, 500, 'Failed to fetch unverified users');
  }
};

exports.getStaleUsers = async (req, res) => {
  try {
    const users = await reportService.logStaleUsers();
    res.json({ count: users.length, users });
  } catch (err) {
    sendError(res, 500, 'Failed to fetch stale users');
  }
};

exports.getMonthlyPayrollReport = async (req, res) => {
  try {
    const report = await reportService.generateMonthlyPayroll();
    res.json({ count: report.length, report });
  } catch (err) {
    sendError(res, 500, 'Failed to generate payroll report');
  }
};
