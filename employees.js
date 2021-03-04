module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Function to get all employees
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

    // Function to get a single employee
    function getEmployee(res, mysql, context, employeeID, complete){
      var sql = "SELECT employeeID, firstName, lastName, phone, paymentInfo, hoursWorked FROM employees WHERE employeeID = ?";
      var inserts = [employeeID];
      mysql.pool.query(sql, inserts, function(error, results, fields) {
        if(error) {
          res.write(JSON.stringify(error));
          res.end();
        }
        context.employee = results[0];
        console.log("--getting single employee")
        complete();
      });
    }


// -------------------------------------------------

  // Displays all employees in table
    router.get('/', function(req, res) {
      console.log("in the get")
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["delete.js"]
      var mysql = req.app.get('mysql');
      getEmployees(res, mysql, context, complete);
      function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
          res.render('employees', context);
        }
      }
    });

    // Add employees
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

    // Display a single person to update
    router.get('/:employeeID', function(req, res) {
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["update.js"];
      var mysql = req.app.get('mysql');
      console.log("The employeeID is: " + req.params.employeeID)
      getEmployee(res, mysql, context, req.params.employeeID, complete);
      function complete() {
        callbackCount++;
        if (callbackCount >= 1){
          console.log("Sending context to update-employee")
          res.render('update-employee', context);
        }
      }
    });

    // Actually update employees
    router.put('/:employeeID', function(req,res){
      var mysql = req.app.get('mysql');
      console.log("# " + req.body)
      console.log("## " + req.params.employeeID)
      var sql = "UPDATE employees SET firstName = ?, lastName = ?, phone = ?, paymentInfo = ?, hoursWorked = ? WHERE employeeID = ?";
      var inserts = [req.body.firstName, req.body.lastName, req.body.phone, req.body.paymentInfo, req.body.hoursWorked, req.body.employeeID];
      console.log("###### queried: " + sql)

      sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
        if(error) {
          console.log(error)
          res.write(JSON.stringify(error));
          res.end();
        } else {
          console.log("Changing to " + req.body.firstName)
          res.status(200);
          res.end();
        }
      });
    });

    router.delete('/:id', function(req,res) {

      var mysql = req.app.get('mysql');
      var sql = "DELETE FROM employees WHERE employeeID = ?";
      var inserts = [req.params.id];
      console.log("IN DELETE: ")
      sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
        }else{
          res.status(202).end();
        }
      })
    })

    return router;
}();
