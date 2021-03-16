module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Function to get all certs
    function getCerts(res, mysql, context, complete) {
      mysql.pool.query("SELECT employees.lastName AS certifiedEmployees, service.serviceType AS serviceID FROM certs INNER JOIN employees ON certs.certifiedEmployees = employees.employeeID INNER JOIN service ON certs.serviceID = service.serviceID", function(error, results, fields) {
        if(error) {
          res.write(JSON.stringify(error));
          res.end();
        }
        context.certs = results;
        complete();
      });
    }

    // Function to get Employees
    function getCurrentEmployees(res, mysql, context, complete) {
      mysql.pool.query("SELECT employeeID, lastName FROM employees", function(error, results, fields) {
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.employees = results;
        complete();
      });
    }
    // Function to get services
    function getCurrentServices(res, mysql, context, complete) {
      mysql.pool.query("SELECT serviceID, serviceType FROM service", function(error, results, fields) {
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        console.log("asdfasdfasdfasdfasdffsdfd")
        context.services = results;
        complete();
      });
    }


    // -------------------------------------------------

      // Displays all certs in table
        router.get('/', function(req, res) {
          console.log("in the certs get")
          var callbackCount = 0;
          var context = {};
          var mysql = req.app.get('mysql');
          getCerts(res, mysql, context, complete);
          getCurrentEmployees(res, mysql, context, complete);
          getCurrentServices(res, mysql, context, complete);
          function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
              res.render('certs', context);
            }
          }
        });

        // Add cert
        router.post('/', function(req, res){
          console.log("adding a cert")
          var mysql = req.app.get('mysql');
          var sql = "INSERT INTO certs (certifiedEmployees, serviceID) VALUES (?,?)";
          var inserts = [req.body.certifiedEmployees, req.body.serviceID];
          sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error) {
              console.log(JSON.stringify(error))
              res.write(JSON.stringify(error));
              res.end();
            } else {
              res.redirect('/certs');
            }
          });
        });

        // Remove cert from employee


  return router;
}();
