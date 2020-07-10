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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

// Welcome to Employee Tracker
async function manageTeam() {
  console.log("Welcome to Employee Tracker");
  await inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Employees", //
        "View Employees by Department", //
        "View Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Manager Role",
        "exit"
      ]
    })
    // Switch statement for functions
    .then(function (answer) {
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

// View all employees
function viewEmployee() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log("\n Employees retrieved from Database \n");
    console.table(res);
  })
  manageTeam();
}

// View employees by department
async function viewEmployeeDep() {
  await inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "What department would you like to view?",
      choices: [
        "Parks",
        "Accounting",
        "Sales"
      ]
    })
    .then(function (answer) {
      connection.query("SELECT * FROM department", function (err, answer) {
        console.log("\n Departments Retrieved from Database \n");
        console.table(answer);
      });
      manageTeam();
    })
}

function viewEmployeeMan() {
// blehhh
  manageTeam();
}

// Adding an Employee to db
async function addEmployee() {
  await inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee's first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter employee's last name",
        name: "lastName"
      },
      {
        name: "role",
        type: "list",
        message: "What is their role?",
        choices: [
          "Manage",
          "Sales",
          "Accountant",
          "Director"
        ]
      },
      {
        name: "manager",
        type: "list",
        message: "Who is this employee's manager?",
        choices: [
          "Michael Scott",
          "Leslie Knope",
          "This employee doesn't have a manager."
        ]
      }
    ])
    .then(function (answer) {

    });

  manageTeam();
}

// Deleting employee from db
function removeEmployee() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee do you wish to remove?",
          name: "deleteEmployee",
          choices: function () {
            let employeeArr = [];
            for (let i of results) {
              employeeArr.push(`${i.first_name} ${i.last_name}`)
            }
            return employeeArr;
          },
        },
      ])
      .then(function (answers) {
        var res = answers.deleteEmployee.split(" ")
        var sql = `DELETE FROM employee WHERE first_name = "${res[0]}" AND last_name = "${res[1]}"`;

          connection.query(sql, function (err, result) {
            if (err) throw err;
              console.log(`\n Employee was removed! \n`);
        });
      })
  });

  manageTeam();
}

function updateEmployee() {

  manageTeam();
}

function updateManager() {

  manageTeam();
}

manageTeam();