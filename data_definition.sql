-- MySQL data dump for Prject Step 4
-- CS 340
-- Hayden Cole and Virginia Link
-- -------------------------------------------------------------------


SET FOREIGN_KEY_CHECKS = 0;



-- Table structure for `customers`
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `currentBill` int(11) DEFAULT NULL,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table 'customers'
LOCK TABLES customers WRITE;

INSERT INTO `customers` (firstName, lastName, phone, address1, address2, city, state, zip, currentBill)
VALUES ('John', 'Doe', '555-555-5555','123 Oak St.', NULL, 'Corvallis', 'Oregon', '97333', 100),
('Amy', 'Johnson', '444-444-4444','4003 Redwood St.', 'Apt 15', 'Albany', 'Oregon', '10000', 250),
('Ben', 'Smith', '111-111-1111','15 Aspen Ave.', NULL, 'Canby', 'Oregon', '97013', 300);

UNLOCK TABLE;


-- Table structure for `employees`
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `paymentInfo` varchar(255) DEFAULT NULL,
  `hoursWorked` int(10),
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table 'employees'
LOCK TABLES `employees` WRITE;

INSERT INTO `employees` (firstName, lastName, phone, paymentInfo, hoursWorked)
VALUES ('Jack', 'Workman', '777-777-7777', NULL, 43),
('Jill', 'Exterminator', '123-123-1234', "DD", 45),
('Bethany', 'Manegerson', '999-999-9999', "DD", 57);

UNLOCK TABLE;

-- Table structure for 'services'
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `serviceType` varchar(255) NOT NULL,
  `gearNeeded` varchar(255) DEFAULT NULL,
  `cost` int(10),
  PRIMARY KEY (`serviceType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table 'services'
LOCK TABLES `services` WRITE;

INSERT INTO `services` (serviceType, gearNeeded, cost)
VALUES ('Inspection', NULL, 50),
('Outdoor Chemical Treatment', 'Sprayer', 150),
('Indoor Mouse Traps', 'Mouse Traps', 100);

UNLOCK TABLE;

-- Table structure for 'gear'
DROP TABLE IF EXISTS `gear`;
CREATE TABLE `gear` (
  `gearID` int(11) NOT NULL AUTO_INCREMENT,
  `gearType` varchar(255) NOT NULL,
  `lastServiceDate` varchar(255) DEFAULT NULL,
  `checkedOutID` int(11) DEFAULT NULL,
  PRIMARY KEY (`gearID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table 'gear'
LOCK TABLES `gear` WRITE;

INSERT INTO `gear` (gearType, lastServiceDate, checkedOutID)
VALUES ('Sprayer', '02/10/21', 1),
('Mouse Trap', NULL, NULL),
('Bug Repellent', NULL, NULL);

UNLOCK TABLE;

-- Table structure for 'payments'
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `customerID` int(11) NOT NULL,
  `paymentNum` int(11) NOT NULL AUTO_INCREMENT,
  `paymentDate` varchar(255),
  `amount` int(11),
  PRIMARY KEY (`paymentNum`),
  KEY `customerID` (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table 'payments'
LOCK TABLES `payments` WRITE;

INSERT INTO `payments` (customerID, paymentDate, amount)
VALUES (1, '02/13/21', 50),
(2, '02/06/21', 100),
(2, '02/07/21', 75);

UNLOCK TABLE;

-- Table structure for 'assignments'
DROP TABLE IF EXISTS `assignments`;
CREATE TABLE `assignments` (
  `customerID` int(11),
  `employeeID` int(11),
  PRIMARY KEY (`customerID`, `employeeID`),
  FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`),
  FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Dumping data for table 'assignments'
LOCK TABLES `assignments` WRITE;

INSERT INTO `assignments` (customerID, employeeID)
VALUES (1, 1),
(2, 2),
(3, 3);

UNLOCK TABLE;

-- Table structure for 'certs''
DROP TABLE IF EXISTS `certs`;
CREATE TABLE `certs` (
  `certifiedEmployees` int(11),
  `serviceType` varchar(255),
  FOREIGN KEY (`certifiedEmployees`) REFERENCES `employees` (`employeeID`),
  FOREIGN KEY (`serviceType`) REFERENCES `services` (`serviceType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table 'certs'
LOCK TABLES `certs` WRITE;

INSERT INTO `certs` (certifiedEmployees, serviceType)
VALUES (1, 'Outdoor Chemical Treatment'),
(2, 'Indoor Mouse Traps'),
(1, 'Inspection'),
(2, 'Inspection'),
(3, 'Inspection');


UNLOCK TABLE;



SET FOREIGN_KEY_CHECKS = 1;
