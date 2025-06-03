
CREATE DATABASE college_hr;
USE college_hr;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    department_id INT,
    role VARCHAR(100),
    salary DECIMAL(10,2),
    hire_date DATE,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    date DATE,
    status ENUM('Present', 'Absent', 'Leave') NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE salaries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    month INT,
    year INT,
    amount DECIMAL(10,2),
    paid_on DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE leave_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);




-- Departments
INSERT INTO departments (name) VALUES ('Computer Science'), ('Mathematics'), ('Physics');

-- Employees
INSERT INTO employees (first_name, last_name, email, department_id, role, salary, hire_date)
VALUES 
('Anna', 'Shrestha', 'anna@college.edu', 1, 'Lecturer', 50000, '2021-03-01'),
('Bob', 'Lal shrestha', 'bob@college.edu', 1, 'Assistant Professor', 60000, '2019-06-15'),
('Carol', 'Thapa', 'carol@college.edu', 2, 'Lecturer', 55000, '2022-01-10');

-- Attendance
INSERT INTO attendance (employee_id, date, status) VALUES
(1, '2025-05-01', 'Present'),
(1, '2025-05-02', 'Present'),
(2, '2025-05-01', 'Absent'),
(3, '2025-05-01', 'Present');

-- Salaries
INSERT INTO salaries (employee_id, month, year, amount, paid_on) VALUES
(1, 5, 2025, 50000, '2025-05-30'),
(2, 5, 2025, 60000, '2025-05-30');

-- Leave Requests
INSERT INTO leave_requests (employee_id, start_date, end_date, reason, status) VALUES
(1, '2025-06-01', '2025-06-05', 'Medical Leave', 'Pending'),
(3, '2025-06-10', '2025-06-15', 'Vacation', 'Approved');

-- listing all employess
SELECT * FROM employees;

-- filtering employees by department
SELECT * 
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.name = 'Computer Science';

-- Employees Hired After 2020
SELECT * 
FROM employees 
WHERE hire_date > '2020-01-01';

-- Count Total Employees
SELECT COUNT(*) AS total_employees 
FROM employees;

-- Sorting Employees by Salary (Descending)
SELECT first_name, last_name, salary 
FROM employees 
ORDER BY salary DESC;

-- Join Employees and Departments
SELECT e.first_name, e.last_name, d.name AS department 
FROM employees e
JOIN departments d ON e.department_id = d.id;

-- Monthly Salary Report 
SELECT e.first_name, e.last_name, s.amount, s.paid_on
FROM salaries s
JOIN employees e ON s.employee_id = e.id
WHERE s.month = 5 AND s.year = 2025;

-- Leave Request Status
SELECT e.first_name, e.last_name, l.start_date, l.end_date 
FROM leave_requests l
JOIN employees e ON l.employee_id = e.id
WHERE l.status = 'Pending';

-- Attendance Summary 
SELECT e.first_name, e.last_name, COUNT(*) AS days_present
FROM attendance a
JOIN employees e ON a.employee_id = e.id
WHERE a.status = 'Present'
  AND MONTH(a.date) = 5 AND YEAR(a.date) = 2025
GROUP BY e.id;

-- Department wise employee count
SELECT d.name AS department, COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id
GROUP BY d.id;

