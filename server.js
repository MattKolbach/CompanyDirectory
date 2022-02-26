const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "guessthispass",
    database: "companydirectory",
  },
  console.log(`Connected to the companydirectory database.`)
);

/////  initilization  /////
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "startOptions",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee's role",
          "Done",
        ],
      },
    ])
    .then((promptData) => {
      switch (promptData.startOptions) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addADepartment();
          break;
        case "Add a role":
          addARole();
          break;
        case "Add an employee":
          addAnEmployee();
          break;
        case "Update an employee's role":
          updateEmpRole();
          break;
        case "Done":
          return process.exit(0);
      }
    });
}

//////////  switch functions to move later  //////////
function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(
      `+-------------------+
|  ALL DEPARTMENTS  |
+-------------------+`
    );
    console.table(results);
    init();
  });
}

//////////  view all roles  //////////
function viewAllRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(
      `+------------------------------------------------+
|                  ALL ROLES                     |
+------------------------------------------------+`
    );
    console.table(results);
    init();
  });
}

//////////  view all employees  //////////
function viewAllEmployees() {
  db.query(
    "SELECT employee.emp_id, employee.first_name, employee.last_name, manager.last_name AS manager, role.title, role.salary, department.deptName FROM employee LEFT JOIN role ON role.role_id = employee.empRole_id LEFT JOIN department ON department.dept_id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.emp_id",
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(
        `+------------------------------------------------------------------------------+
|                                ALL EMPLOYEES                                 |
+------------------------------------------------------------------------------+`
      );
      console.table(results);
      init();
    }
  );
}

//////////  add a department  //////////
function addADepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What department would you like to add?",
        validate: (deptName) => {
          if (deptName) {
            console.log(deptName);
            return true;
          } else {
            console.log("Please enter the name of the new department.");
            return false;
          }
        },
      },
    ])
    .then((newDepartment) => {
      db.query(`INSERT INTO department SET ?`, newDepartment, (err, result) => {
        if (err) {
          console.log(err);
        }
        //console.log(result);
        viewAllDepartments();
      });
    });
}

//////////  create new role  //////////
async function addARole() {
  console.log(
`+-----------------------------------------------------------+
|                      CREATE NEW ROLE                      |
+-----------------------------------------------------------+`
  );
  const viewAllDepartments = await db
    .promise()
    .query(`SELECT dept_id AS value, deptName AS name FROM department`);
    
  const createNewRole = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What ROLE would you like to add?",
        validate: (title) => {
          if (title) {
            return true;
          } else {
            console.log("Please enter the name of the new role.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is the base yearly salary for this position?",
        validate: (salary) => {
          if (salary) {
            return true;
          } else {
            console.log("Please enter a valid salary number.");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "dept_id",
        message: "What department does this new role belong to?",
        choices: viewAllDepartments[0],
      },
  ]);
  const createNewRoleInSQL = await db
    .promise()
    .query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [
      createNewRole.title,
      +createNewRole.salary,
      createNewRole.dept_id
    ]);
    
  viewAllRoles();
}

//////////  update employee role  //////////
async function updateEmpRole() {
  console.log(
`+-----------------------------------------------------------+
|                  UPDATE EMPLOYEE ROLE                     |
+-----------------------------------------------------------+`
  );
  const allEmployees = await db
    .promise()
    .query(`SELECT emp_id AS value, last_name AS name FROM employee`);

  const allRoles = await db
    .promise()
    .query(`SELECT role_id AS value, title AS name FROM role`);

  const empRoleUpdate = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What employee is getting a new role?",
      choices: allEmployees[0],
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the employee's new role?",
      choices: allRoles[0],
    },
  ]);
  const updateRoleInSQL = await db
    .promise()
    .query(`UPDATE employee SET empRole_id = ? WHERE emp_id = ?`, [
      empRoleUpdate.role_id,
      empRoleUpdate.emp_id,
    ]);
  console.log("employee role updated");
  init();
}

init();
