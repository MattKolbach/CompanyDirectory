DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    dept_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    deptName VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(dept_id) ON DELETE SET NULL
);

CREATE TABLE employee (
    emp_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    empRole_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_employeeRole FOREIGN KEY (empRole_id) REFERENCES role(role_id) ON DELETE SET NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(emp_id) ON DELETE SET NULL
);
