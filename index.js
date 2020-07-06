const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");

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

