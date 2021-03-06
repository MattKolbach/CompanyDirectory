
INSERT INTO department (dept_id, deptName)
VALUES
  (1, 'Sales'),
  (2, 'Legal'),
  (3, 'Finance'),
  (4, 'Engineering');

INSERT INTO role (role_id, title, salary, department_id)
VALUES
  (1, 'Sales Lead', 100000, 1),
  (2, 'Salesperson', 80000, 1),
  (3, 'Lead Engineer', 150000, 4),
  (4, 'Software Engineer', 120000, 4),
  (5, 'Account Manager', 160000, 3),
  (6, 'Accountant', 125000, 3),
  (7, 'Leagal Team Lead', 250000, 2),
  (8, 'Lawyer', 190000, 2);
  
INSERT INTO employee (emp_id, first_name, last_name, empRole_id, manager_id)
VALUES
  (1, 'James', 'Fraser', 1, NULL),
  (2, 'Jack', 'London', 1, NULL),
  (9, 'Emil', 'Zola', 3, NULL),
  (10, 'Sissy', 'Coalpits', 3, NULL),
  (22, 'William', 'Morris', 6, NULL),
  (3, 'Robert', 'Bruce', 2, 1),
  (4, 'Peter', 'Greenaway', 2, 1),
  (5, 'Derek', 'Jarman', 2, 1),
  (6, 'Paolo', 'Pasolini', 2, 2),
  (7, 'Heathcote', 'Williams', 2, 2),
  (8, 'Sandy', 'Powell', 2, 2),
  (11, 'Antoinette', 'Capet', 4, 9),
  (12, 'Samuel', 'Delany', 4, 9),
  (13, 'Tony', 'Duvert', 4, 9),
  (14, 'Dennis', 'Cooper', 4, 9),
  (15, 'Monica', 'Bellucci', 4, 10),
  (16, 'Samuel', 'Johnson', 4, 10),
  (17, 'John', 'Dryden', 4, 10),
  (18, 'Alexander', 'Pope', 4, 10),
  (19, 'Lionel', 'Johnson', 5, 22),
  (20, 'Aubrey', 'Beardsley', 5, 22),
  (21, 'Tulse', 'Luper', 5, 22),
  (23, 'George', 'Shaw', 7, 5),
  (24, 'Arnold', 'Bennett', 8, 23),
  (25, 'Algernon', 'Blackwood', 8, 23);

