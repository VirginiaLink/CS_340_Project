module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getEmployees(res, mysql, context, complete) {
      mysql.pool.query("SELECT employeeID, firstName, lastName, phone, paymentInfo, hoursWorked FROM employees", function(error, results, fields) {
        if(error) {
          res.write(JSON.stringify(error));
          res.end();
        }
        context.employees = results;
        complete();
      });
    }

// -------------------------------------------------

// Displays all employees in table
    router.get('/', function(req, res) {
      console.log("in the get")
      var callbackCount = 0;
      var context = {};
      //context.jsscripts = [""]
      var mysql = req.app.get('mysql');
      getEmployees(res, mysql, context, complete);
      function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
          res.render('employees', context);
        }
      }
    });


    router.post('/', function(req, res){
      console.log("adding an employee")
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO employees (firstName, lastName, phone, paymentInfo, hoursWorked) VALUES (?,?,?,?,?)";
      var inserts = [req.body.firstName, req.body.lastName, req.body.phone, req.body.paymentInfo, req.body.hoursWorked];
      sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error) {
          console.log(JSON.stringify(error))
          res.write(JSON.stringify(error));
          res.end();
        } else {
          res.redirect('/employees');
        }
      });
    });






    return router;
}();
