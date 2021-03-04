module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // get all gear
    function getGear(res, mysql, context, complete) {
        mysql.pool.query("SELECT gearID, gearType, lastServiceDate, checkedOutID FROM gear", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.gear = results;
            complete();
        });
    }

    // function getGear(res, mysql, context, gearID, complete) {
    //     var sql = "SELECT gearID, gearType, lastServiceDate, checkedOutID FROM gear WHERE gearID = ?";
    //     var inserts = [gearID];
    //     mysql.pool.query(sql, inserts, function (error, results, fields) {
    //         if (error) {
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.gear = results[0];
    //         console.log("--getting single gear")
    //         complete();
    //     });
    // }


    // -------------------------------------------------

    // Displays all gear in table
    router.get('/', function (req, res) {
        console.log("in gear get")
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = [""]
        var mysql = req.app.get('mysql');
        getGear(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('gear', context);
            }
        }
    });

    // Add gear
    router.post('/', function (req, res) {
        console.log("adding gear")
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO gear (gearType, lastServiceDate, checkedOutID) VALUES (?,?,?)";
        var inserts = [req.body.gearType, req.body.lastServiceDate, req.body.checkedOutID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/gear');
            }
        });
    });


    // Display a single gear to update
    router.get('/:gearID', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update.js"];
        var mysql = req.app.get('mysql');
        console.log("The gearID is: " + req.params.gearID)
        getGear(res, mysql, context, req.params.gearID, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                console.log("Sending context to update-gear")
                res.render('update-gear', context);
            }
        }
    });

    // Actually update gear
    router.put('/:gearID', function (req, res) {
        var mysql = req.app.get('mysql');
        console.log("# " + req.body)
        console.log("## " + req.params.gearID)
        var sql = "UPDATE gear SET gearID = ?, gearType = ?, lastServiceDate = ?, checkedOutID = ? WHERE gearID = ?";
        var inserts = [req.body.gearID, req.body.gearType, req.body.lastServiceDate, req.body.checkedOutID];
        console.log("###### queried: " + sql)

        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            } else {
                console.log("Changing to " + req.body.gearID)
                res.status(200);
                res.end();
            }
        });
    });

    router.delete('/:gearID', function (req, res) {

        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM gear WHERE gearID = ?";
        var inserts = [req.gearID];
        console.log("IN DELETE: ")
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
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
