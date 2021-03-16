SET FOREIGN_KEY_CHECKS = 0;


-- -- Table structure for `employees`
-- DROP TABLE IF EXISTS `employees`;
-- CREATE TABLE `employees` (
--   `employeeID` int(11) NOT NULL AUTO_INCREMENT,
--   `firstName` varchar(255) NOT NULL,
--   `lastName` varchar(255) NOT NULL,
--   `phone` varchar(255) DEFAULT NULL,
--   `paymentInfo` varchar(255) DEFAULT NULL,
--   `hoursWorked` int(10),
--   PRIMARY KEY (`employeeID`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- -- Dumping data for table 'employees'
-- LOCK TABLES `employees` WRITE;
--
-- INSERT INTO `employees` (firstName, lastName, phone, paymentInfo, hoursWorked)
-- VALUES ('Jack', 'Workman', '777-777-7777', NULL, 43),
-- ('Jill', 'Exterminator', '123-123-1234', "DD", 45),
-- ('Bethany', 'Manegerson', '999-999-9999', "DD", 57);
--
-- UNLOCK TABLE;

-- Table structure for 'services'
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service` (
  `serviceID` int(11) NOT NULL AUTO_INCREMENT,
  `serviceType` varchar(255) NOT NULL,
  `gearNeeded` varchar(255) DEFAULT NULL,
  `cost` int(10),
  PRIMARY KEY (`serviceID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- -- Dumping data for table 'services'
-- LOCK TABLES `services` WRITE;
--
-- INSERT INTO `services` (serviceType, gearNeeded, cost)
-- VALUES ('Inspection', NULL, 50),
-- ('Outdoor Chemical Treatment', 'Sprayer', 150),
-- ('Indoor Mouse Traps', 'Mouse Traps', 100);
--
-- UNLOCK TABLE;


-- -- Table structure for 'certs''
-- DROP TABLE IF EXISTS `certs`;
-- CREATE TABLE `certs` (
--   `certifiedEmployees` int(11),
--   `serviceID` int(11),
--   FOREIGN KEY (`certifiedEmployees`) REFERENCES `employees` (`employeeID`),
--   FOREIGN KEY (`serviceID`) REFERENCES `services` (`serviceID`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- -- Dumping data for table 'certs'
-- LOCK TABLES `certs` WRITE;
--
-- INSERT INTO `certs` (certifiedEmployees, serviceID)
-- VALUES (1, 2),
-- (2, 2),
-- (1, 1),
-- (2, 1),
-- (3, 1);
--
--
-- UNLOCK TABLE;


SET FOREIGN_KEY_CHECKS = 1;
