module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // get all assignments
    function getAssignments(res, mysql, context, complete) {
        mysql.pool.query("SELECT employeeID, customerID FROM assignments", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.assignments = results;
            complete();
        });
    }

    // -------------------------------------------------

    // Displays all assignments in table
    router.get('/', function (req, res) {
        console.log("in assignments get")
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = [""]
        var mysql = req.app.get('mysql');
        getAssignments(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('assignments', context);
            }
        }
    });

    // Add assignments
    router.post('/', function (req, res) {
        console.log("adding a assignments")
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO assignments (employeeID, customerID) VALUES (?,?)";
        var inserts = [req.body.employeeID, req.body.customerID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/assignments');
            }
        });
    });

    // delete from Assignments
    router.delete('/employeeID/:employeeID/customerID/:customerID', function (req, res) {
        console.log(req.params.employeeID)
        console.log(req.params.customerID)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM assignments WHERE employeeID = ? AND customerID = ?";
        var inserts = [req.params.employeeID, req.params.customerID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    })


    return router;
}();
