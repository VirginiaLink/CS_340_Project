module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Function to get all certs
    function getCerts(res, mysql, context, complete) {
      mysql.pool.query("SELECT certifiedEmployees, serviceType FROM certs", function(error, results, fields) {
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
          var sql = "INSERT INTO certs (certifiedEmployees, serviceType) VALUES (?,?)";
          var inserts = [req.body.certifiedEmployees, req.body.serviceType];
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


        //delete a Certification
        router.delete('/employeeID/:certifiedEmployees/cert/:serviceType', function(req, res){
            //console.log(req) //I used this to figure out where did pid and cid go in the request
            console.log(req.params.certifiedEmployees)
            console.log(req.params.serviceType)
            var mysql = req.app.get('mysql');
            var sql = "DELETE FROM certs WHERE certifiedEmployees = ? AND serviceType = ?";
            var inserts = [req.params.certifiedEmployees, req.params.serviceType];
            sql = mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
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
