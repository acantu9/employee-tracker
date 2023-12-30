const inquirer = require('inquirer');
const connection = require('C:/Users/ACantu/OneDrive/Desktop/challenges/week-12/employee-tracker/database');

// Define the questions
const questions = [
 {
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
 },
];

// Handle user input
function handleUserInput(answers) {
 switch (answers.menu) {
    case 'View All Departments':
      viewAllDepartments();
      break;
    case 'View All Roles':
      viewAllRoles();
      break;
    case 'View All Employees':
      viewAllEmployees();
      break;
    case 'Add A Department':
      addDepartment();
      break;
    case 'Add A Role':
      addRole();
      break;
    case 'Add An Employee':
      addEmployee();
      break;
    case 'Update An Employee Role':
      updateEmployeeRole();
      break;
 }
}

// Run the CLI application
function runCLI() {
 inquirer.prompt(questions)
    .then(handleUserInput)
    .catch((err) => {
      if (err) throw err;
    });
}

// View all departments
function viewAllDepartments() {
 const query = 'SELECT * FROM department';
 connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.table(res);
    runCLI();
 });
}

// View all roles
function viewAllRoles() {
 const query = 'SELECT * FROM role';
 connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.table(res);
    runCLI();
 });
}

// View all employees
function viewAllEmployees() {
 const query = 'SELECT * FROM employee';
 connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.table(res);
    runCLI();
 });
}

// Add a department
function addDepartment() {
 inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:',
    },
  ])
    .then((answers) => {
      const query = 'INSERT INTO department SET ?';
      connection.query(query, { name: answers.departmentName }, (err, res) => {
        if (err) throw err;
        console.log(`${answers.departmentName} added to the database.`);
        runCLI();
      });
    });
}

// Add a role
function addRole() {
 inquirer.prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'Enter the name of the role:',
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'Enter the salary of the role:',
    },
    {
      type: 'input',
      name: 'roleDepartment',
      message: 'Enter the department ID of the role:',
    },
  ])
    .then((answers) => {
      const query = 'INSERT INTO role SET ?';
      connection.query(query, { title: answers.roleName, salary: answers.roleSalary, department_id: answers.roleDepartment }, (err, res) => {
        if (err) throw err;
        console.log(`${answers.roleName} added to the database.`);
        runCLI();
      });
    });
}

// Add an employee
function addEmployee() {
 inquirer.prompt([
    {
      type: 'input',
      name: 'employeeFirstName',
      message: "Enter the employee's first name:",
    },
    {
      type: 'input',
      name: 'employeeLastName',
      message: "Enter the employee's last name:",
    },
    {
      type: 'input',
      name: 'employeeRole',
      message: "Enter the employee's role ID:",
    },
    {
      type: 'input',
      name: 'employeeManager',
      message: "Enter the employee's manager ID:",
    },
  ])
    .then((answers) => {
      const query = 'INSERT INTO employee SET ?';
      connection.query(query, { first_name: answers.employeeFirstName, last_name: answers.employeeLastName, role_id: answers.employeeRole, manager_id: answers.employeeManager }, (err, res) => {
        if (err) throw err;
        console.log(`${answers.employeeFirstName} ${answers.employeeLastName} added to the database.`);
        runCLI();
      });
    });
}

// Update an employee role
function updateEmployeeRole() {
 inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: "Enter the ID of the employee whose role you want to update:",
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: "Enter the ID of the employee's new role:",
    },
  ])
    .then((answers) => {
      const query = 'UPDATE employee SET ? WHERE ?';
      connection.query(query, [{ role_id: answers.newRoleId }, { id: answers.employeeId }], (err, res) => {
        if (err) throw err;
        console.log(`Employee role updated in the database.`);
        runCLI();
      });
    });
}