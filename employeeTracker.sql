DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
	FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)

);


INSERT INTO department (name)
VALUES ('Parks');

INSERT INTO department (name)
VALUES ('Sales');
   
INSERT INTO department (name)
VALUES ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', '100000', 2 );

INSERT INTO role (title, salary, department_id)
VALUES ('Sales', '80000', 2);

INSERT INTO role (title, salary, department_id)
VALUES('Accountant', '60000', 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Director', '60000', 1);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Michael', 'Scott', '1' );
   
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jim', 'Halpert', '2', '1' );

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Leslie', 'Knope', '4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Malone', '3', '1' );

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Ron', 'Swanson', '4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tom', 'Haverford', '2', '3' );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Dwight', 'Shcrute', '2', '1' );


    
