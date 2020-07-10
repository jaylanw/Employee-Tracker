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
        "View Departments", //
        "View Roles", // 
        "Add Employee", //
        "Add Department", // 
        "Add Role", // 
        "Remove Employee", // 
        "Update Employee Role",
        "exit"
      ]
    })
    // Switch statement for functions
    .then(function (answer) {
      switch (answer.action) {
        case "View Employees":
          viewEmployee();
          break;

        case "View Departments":
          viewEmployeeDep();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

// View all employees
function viewEmployee() {
  connection.query("SELECT first_name AS FirstName ,last_name as LastName , role.title as Role, role.salary AS Salary, department.name AS Department FROM employee INNER JOIN department ON department.id = employee.role_id left JOIN role ON role.id = employee.role_id",
    function (err, answer) {
      console.table(answer);
      if (err) throw err;

    });
  manageTeam();
}

// View department
function viewEmployeeDep() {
  connection.query("SELECT * FROM department ", function (err, answer) {
    console.table(answer);
    if (err) throw err;

  });

  manageTeam();
}

// View Roles
function viewRoles() {
  connection.query("SELECT * FROM role ", function (err, answer) {
    console.table(answer);
    if (err) throw err;

  });

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
          "Manager",
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
      var roleNum = answer.role
      switch (answer.role) {
        case "Manager":
          roleNum = 1;
          break;

        case "Sales":
          roleNum = 2;
          break;

        case "Accountant":
          roleNum = 3;
          break;

        case "Director":
          roleNum = 4;
          break;
      }

      var managerNum = answer.manager
      switch (answer.manager) {
        case "Michael Scott":
          managerNum = 1;
          break;

        case "Leslie Knope":
          managerNum = 2;
          break;

        case "This employee doesn't have a manager.":
          managerNum = null;
          break;
      }
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: roleNum,
          manager_id: managerNum
        },
        function (err, answer) {
          if (err) {
            throw err;
          }
          console.log("\n Employee was added! \n");
        }
      );
    });

  manageTeam();
}
// Add department
async function addDepartment() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department would you like to add?"
      },
    ])
    .then(function (answer) {
      connection.query('INSERT INTO department (name) VALUES (?)', [answer.department], function (err, data) {
        if (err) throw err;
        console.table("\n Department added! \n");
      })
    })
  manageTeam();
};

// Add role 
async function addRole() {
  await inquirer
    .prompt([
      {
        message: "What is the new role title?",
        type: "input",
        name: "title"
      },
      {
        message: "What is this new role's salary?",
        type: "number",
        name: "salary"
      },
      {
        message: "What is the department id number?",
        type: "number",
        name: "department_id"
      }
    ])
    .then(function (answer) {
      connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [answer.title, answer.salary, answer.department_id], function (err, data) {
        console.table(data);
        console.log(`\n Role added! \n`);
      })
    })
  manageTeam();
};

// Deleting employee from db
function removeEmployee() {
  connection.query("SELECT * FROM employee", function (err, answer) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee do you wish to remove?",
          name: "deleteEmployee",
          choices: function () {
            let employeeArr = [];
            for (let i of answer) {
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
  inquirer.prompt([
    {
      type: "input",
      message: "What's the first name of the employee you'd like to update?",
      name: "employeeName"
    },
    {
      type: "list",
      message: "What is their new role?",
      name: "role",
      choices: [
        "Manager",
        "Sales",
        "Accountant",
        "Director"
      ]}
  ])
    .then(function (answer) {
      var roleNum = answer.role
      switch (answer.role) {
        case "Manager":
          roleNum = 1;
          break;

        case "Sales":
          roleNum = 2;
          break;

        case "Accountant":
          roleNum = 3;
          break;

        case "Director":
          roleNum = 4;
          break;
      }
      connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [roleNum, answer.name], 
          function (err, data) {
            if (err) throw err;
            console.log("\n Employee information updated! \n");
      })
      manageTeam();
    })
}

manageTeam();