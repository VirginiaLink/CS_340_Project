module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // get all payments
    function getPayments(res, mysql, context, complete) {
        mysql.pool.query("SELECT customerID, paymentNum, paymentDate, amount FROM payments", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.payments = results;
            complete();
        });
    }

    function getPayment(res, mysql, context, paymentID, complete) {
        var sql = "SELECT customerID, paymentNum, paymentDate, amount FROM payments WHERE paymentNum = ?";
        var inserts = [paymentNum];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.payment = results[0];
            console.log("--getting single payment")
            complete();
        });
    }


    // -------------------------------------------------

    // Displays all payments in table
    router.get('/', function (req, res) {
        console.log("in the get")
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = [""]
        var mysql = req.app.get('mysql');
        getPayments(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('payments', context);
            }
        }
    });

    // Add payments
    router.post('/', function (req, res) {
        console.log("adding a payment")
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO payments (customerID, paymentNum, paymentDate, amount) VALUES (?,?,?,?)";
        var inserts = [req.body.customerID, req.body.paymentNum, req.body.paymentDate, req.body.amount];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/payments');
            }
        });
    });


    // Display a single payment to update
    router.get('/:paymentNum', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update.js"];
        var mysql = req.app.get('mysql');
        console.log("The paymentNum is: " + req.params.paymentNum)
        getPayment(res, mysql, context, req.params.paymentNum, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                console.log("Sending context to update-payment")
                res.render('update-payment', context);
            }
        }
    });

    // Actually update payments
    router.put('/:paymentNum', function (req, res) {
        var mysql = req.app.get('mysql');
        console.log("# " + req.body)
        console.log("## " + req.params.paymentNum)
        var sql = "UPDATE payments SET customerID = ?, paymentNum = ?, paymentDate = ?, amount = ? WHERE paymentNum = ?";
        var inserts = [req.body.customerID, req.params.paymentNum, req.body.paymentDate, req.body.amount];
        console.log("###### queried: " + sql)

        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            } else {
                console.log("Changing to " + req.body.paymentNum)
                res.status(200);
                res.end();
            }
        });
    });

    router.delete('/:paymentNum', function (req, res) {

        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM payments WHERE paymentNum = ?";
        var inserts = [req.params.paymentNum];
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
