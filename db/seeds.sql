-- Insert departments
INSERT INTO departments (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Human Resources');

-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES
  ('Salesperson', 50000, 1),
  ('Sales Manager', 80000, 1),
  ('Software Engineer', 75000, 2),
  ('Senior Software Engineer', 95000, 2),
  ('Accountant', 60000, 3),
  ('Financial Analyst', 80000, 3),
  ('HR Coordinator', 45000, 4),
  ('HR Manager', 70000, 4);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, 2),
  ('Emily', 'Williams', 4, 2),
  ('David', 'Brown', 5, 3),
  ('Sarah', 'Davis', 6, 3),
  ('Alex', 'Wilson', 7, 4),
  ('Jessica', 'Taylor', 8, 4);