const cron = require('node-cron');
const fs = require('fs-extra');
const path = require('path');
const Employee = require('../models/Employee');
const Payroll = require('../models/Payroll');
const { logToFile } = require('../utils/logger');

let lastStatus = {
    success: false,
    time: null,
    error: null
};
const getLogPath = (filename) => path.join(__dirname, '../logs', filename);
async function runDailySummary() {
    try {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const endOfDay = new Date(now.setHours(23, 59, 59, 999));
        const newEmployees = await Employee.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } });
        const terminatedEmployees = await Employee.find({
            isTerminated: true,
            updatedAt: { $gte: startOfDay }
        });
        const payrolls = await Payroll.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } });
        const totalPayroll = payrolls.reduce((sum, p) => sum + (p.netPay || 0), 0);

        const summary = {
            date: new Date().toISOString(),
            newEmployees: newEmployees.map((e) => e.name),
            terminatedEmployees: terminatedEmployees.map((e) => e.name),
            totalPayroll
        };
        await fs.outputJson(getLogPath('daily_summary.json'), summary, { spaces: 2 });
        const staleDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        const staleEmployees = await Employee.find({ updatedAt: { $lt: staleDate } });
        if (staleEmployees.length > 0) {
            for (const e of staleEmployees) {
                const message = `Stale employee: ${e.name} - Last updated: ${e.updatedAt.toISOString()}`;
                logToFile(getLogPath('stale_employees.log'), message);
            }
        }
        lastStatus = { success: true, time: new Date(), error: null };
        console.log('[CRON] Daily summary completed successfully');
    } catch (err) {
        const errorMessage = `[CRON ERROR] ${new Date().toISOString()} - ${err.message}`;
        logToFile(getLogPath('cron_errors.log'), errorMessage);
        lastStatus = { success: false, time: new Date(), error: err.message };
        console.error(errorMessage);
    }
}
cron.schedule('0 0 * * *', () => {
    console.log('[CRON] Running scheduled daily summary...');
    runDailySummary();
});

module.exports = {
    runDailySummary,
    getLastCronStatus: () => lastStatus
};
