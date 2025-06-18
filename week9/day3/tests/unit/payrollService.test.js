const mongoose = require('mongoose');
const Payroll = require('../../Payroll/payroll.model');
const Employee = require('../../Employee/employee.model');
const { handlePayrollTransaction } = require('../../Payroll/payrollService');

jest.setTimeout(20000); 

describe('handlePayrollTransaction', () => {
  let employee;

  beforeAll(async () => {
    employee = await Employee.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test@payroll.com',
      phone: '1234567890',
      password: 'password123', 
      baseSalary: 50000
    });
  });

  afterEach(async () => {
    await Payroll.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create payroll with correct fields', async () => {
    const Salary = 50000;
    const bonus = 5000;
    const deductions = 1000;

    const payroll = await handlePayrollTransaction(employee._id, Salary, bonus, deductions);

    expect(payroll).toBeDefined();
    expect(payroll.employeeId.toString()).toBe(employee._id.toString());
    expect(payroll.Salary).toBe(Salary);
    expect(payroll.bonus).toBe(bonus);
    expect(payroll.deductions).toBe(deductions);

    const fromDb = await Payroll.findOne({ _id: payroll._id });
    expect(fromDb).not.toBeNull();
  });

  it('should rollback if error occurs', async () => {
    const Salary = 50000;

    await expect(
      handlePayrollTransaction(null, Salary)
    ).rejects.toThrow();

    const records = await Payroll.find({});
    expect(records.length).toBe(0);
  });
});
