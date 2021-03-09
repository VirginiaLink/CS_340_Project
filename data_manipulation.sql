-- MySQL data manipulation queries for Prject Step 4
-- CS 340
-- Hayden Cole and Virginia Link
-- -------------------------------------------------------------------


-- CUSTOMER FUNCTIONS ------------------------------------------------
-- Insert a customer
INSERT INTO `customers` (firstName, lastName, phone, address1, address2, city, state, zip, currentBill)
VALUES (:firstNameInput, :lastNameInput, :phoneInput, :address1Input, :address2Input, :cityInput, :stateInput, :zipInput, :currentBillInput);

-- Select a customer by id
SELECT * FROM `customers` WHERE customerID = :customerIDInput;


-- EMPLOYEE FUNCTIONS ------------------------------------------------
-- Insert an employee
INSERT INTO `employees` (firstName, lastName, phone, paymentInfo, hoursWorked)
VALUES (:firstNameInput, :lastNameInput, :phoneInput, :paymentInfoInput_from_dropdown, :hoursWorkedInput);

-- Delete an employee
DELETE FROM `employees` WHERE employeeID = :employeeIDInput;

-- Select an employee by id, first name, and last name
SELECT * FROM `employees` WHERE employeeID = :employeeIDInput
AND firstName = :firstNameInput
AND lastName = :lastNameInput;


-- PAYMENT FUNCTIONS -------------------------------------------------
-- Insert a payment
INSERT INTO `payments` (customerID, paymentDate, amount)
VALUES (:customerIDInput, :paymentDateInput, :amountInput);

-- Select a payment by id
SELECT * FROM `payents` WHERE customerID = :customerIDInput;


-- SERVICE FUNCTIONS -------------------------------------------------
-- Insert a service
INSERT INTO `services` (serviceType, gearNeeded, cost)
VALUES (:serviceTypeInput, :gearNeededInput, :costInput);

-- Select a payment by id
SELECT * FROM `services` WHERE serviceType = :serviceTypeInput;


-- GEAR FUNCTIONS -------------------------------------------------
-- Insert a type of gearID
INSERT INTO `gear` (gearType, lastServiceDate, checkedOutID)
VALUES (:gearTypeInput, :lastServiceDateInput, :checkedOutIDInput);

-- Update a type of gear
UPDATE `gear` SET lastServiceDate = :lastServiceDateInput WHERE gearType = :gearTypeInput;
UPDATE `gear` SET checkedOutID = :checkedOutIDInput WHERE gearType = :gearTypeInput;

-- Select a gear by gear type
SELECT * FROM `gear` WHERE gearType = :gearTypeInput;


-- CERTIFICATION FUNCTIONS -------------------------------------------------
-- Insert Certification
INSERT INTO `employees_services` (certifiedEmployees, serviceType)
VALUES (:certifiedEmployeesInput, :serviceTypeInput);

-- Delete Certification
DELETE FROM `employees_services` WHERE serviceType = :serviceTypeInput
AND certifiedEmployees = :certifiedEmployeesInput;

-- Select a certification by id
SELECT * FROM `employees_services` WHERE certifiedEmployees = :certifiedEmployeesInput;
SELECT * FROM `employees_services` WHERE serviceType = :serviceTypeInput;


-- ASSIGNMENT FUNCTIONS ----------------------------------------
-- Insert an assignment
INSERT INTO `customers_employees` (customerID, employeeID)
VALUES (:customerIDInput, :employeeIDInput);

-- Delete Assignment by employee id
DELETE FROM `customers_employees` WHERE employeeID = :employeeIDInput;

SELECT * FROM `customers_employees` WHERE customerID = :customerIDInput;
SELECT * FROM `customers_employees` WHERE employeeID = :employeeIDInput;
