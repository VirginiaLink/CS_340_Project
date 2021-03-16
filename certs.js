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


    // -------------------------------------------------

      // Displays all certs in table
        router.get('/', function(req, res) {
          console.log("in the certs get")
          var callbackCount = 0;
          var context = {};
          var mysql = req.app.get('mysql');
          getCerts(res, mysql, context, complete);
          function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
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
              console.log("sql used " + sql.sql)
              res.redirect('/certs');
            }
          });
        });

        // Remove cert from employee


  return router;
}();
