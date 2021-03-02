module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getEmployees(res, mysql, context, complete) {
      mysql.pool.query("SELECT firstName, lastName FROM employees", function(error, results, fields) {
        if(error) {
          res.write(JSON.stringify(error));
          res.end();
        }
        context.employees = results;
        complete();
      });
    }

// -------------------------------------------------


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








    return router;
}();
