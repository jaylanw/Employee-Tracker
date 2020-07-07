const mysql = require("mysql");
const inquirer = require("inquirer");

// Connecting to MySQL
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "004691Jw",
  database: "employeeTracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});


function manageTeam() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Employees",
        "View Employees by Department",
        "View Employees by Manager",
        "Add Emolyee",
        "Remove Emplyee",
        "Update Employee Role",
        "Update Manager Role",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Employees":
        viewEmployee();
        break;

      case "View Employees by Department":
        viewEmployeeDep();
        break;

      case "View Employees by Manager":
        viewEmployeeMan();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Remove Employee":
        removeEmployee();
        break;
      
      case "Update Employee Role":
        updateEmployee();
        break;

      case "Update Manager Role":
        updateManager();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}

function viewEmployee() {

        manageTeam();
}

function viewEmployeeDep() {

        manageTeam();
}

function viewEmployeeMan() {

        manageTeam();
}

function addEmployee() {

        manageTeam();
}

function removeEmployee () {

        manageTeam();
}

function updateEmployee() {

        manageTeam();
}

function updateManager() {

        manageTeam();
}