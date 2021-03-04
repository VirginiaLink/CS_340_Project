// test

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // get all services
    function getServices(res, mysql, context, complete) {
        mysql.pool.query("SELECT serviceType, gearNeeded, cost FROM services", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.services = results;
            complete();
        });
    }


    // -------------------------------------------------

    // Displays all services in table
    router.get('/', function (req, res) {
        console.log("in services get")
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = [""]
        var mysql = req.app.get('mysql');
        getServices(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('services', context);
            }
        }
    });

    // Add services
    router.post('/', function (req, res) {
        console.log("adding a service")
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO services (serviceType, gearNeeded, cost) VALUES (?,?,?)";
        var inserts = [req.body.serviceType, req.body.gearNeeded, req.body.cost];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/services');
            }
        });
    });

    return router;
}();