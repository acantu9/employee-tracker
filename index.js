const inquirer = require('inquirer');
const connection = require('./database');

// Function to display the main menu options
async function displayMainMenu() {
  while (true) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ]);

    // Call the appropriate function based on the selected option
    switch (answers.option) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit(0);
    }
  }
}

// View all departments
function viewAllDepartments() {
 const query = 'SELECT * FROM departments';
 connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.table(res);
    displayMainMenu();
 });
}

// View all roles
function viewAllRoles() {
 const query = 'SELECT * FROM roles';
 connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.table(res);
    displayMainMenu();
 });
}

// View all employees
function viewAllEmployees() {
 const query = 'SELECT * FROM employees';
 connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.table(res);
    displayMainMenu();
 });
}

// Add a department
async function addDepartment() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:',
    },
  ]);

  const query = 'INSERT INTO departments SET ?';
  connection.query(
    query,
    { name: answers.departmentName },
    (err, res) => {
      if (err) throw err;
      console.log(`${answers.departmentName} added to the database.`);
      displayMainMenu();
    }
  );
}

// Add a role
async function addRole() {
  const answers = await inquirer.prompt([
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
  ]);

  const query = 'INSERT INTO roles SET ?';
  connection.query(
    query,
    {
      title: answers.roleName,
      salary: answers.roleSalary,
      department_id: answers.roleDepartment,
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${answers.roleName} added to the database.`);
      displayMainMenu();
    }
  );
}

// Add an employee
async function addEmployee() {
  const answers = await inquirer.prompt([
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
  ]);

  const query = 'INSERT INTO employees SET ?';
  connection.query(
    query,
    {
      first_name: answers.employeeFirstName,
      last_name: answers.employeeLastName,
      role_id: answers.employeeRole,
      manager_id: answers.employeeManager,
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${answers.employeeFirstName} ${answers.employeeLastName} added to the database.`);
      displayMainMenu();
    }
  );
}

// Update an employee role
async function updateEmployeeRole() {
  const answers = await inquirer.prompt([
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
  ]);

  const query = 'UPDATE employees SET ? WHERE ?';
  connection.query(
    query,
    [{ role_id: answers.newRoleId }, { id: answers.employeeId }],
    (err, res) => {
      if (err) throw err;
      console.log(`Employee role updated in the database.`);
      displayMainMenu();
    }
  );
}

// Start the application
displayMainMenu();