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


// const viewAllDepartments = db.query(
//   "SELECT * FROM department",
//   function (err, results) {
//     console.table([results]);
//   }
// );

const viewAllDepartments = db.query(
    "SELECT * FROM department",
    (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
    }    
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
          "Done"
        ],
      },
    ])
    .then((promptData) => {
      switch (promptData.position) {
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
          donePlanning();
          break;
      }
    });
}

init();
