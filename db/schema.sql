DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    dept_id INTEGER PRIMARY KEY NOT NULL,
    deptName VARCHAR(30) NOT NULL
);

CREATE TABLE empRole (
    empRole_id INTEGER PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(dept_id) ON DELETE SET NULL
);

CREATE TABLE employee (
    emp_id INTEGER PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER DEFAULT NULL,
    CONSTRAINT fk_empRole FOREIGN KEY (role_id) REFERENCES empRole(empRole_id) ON DELETE SET NULL
);
