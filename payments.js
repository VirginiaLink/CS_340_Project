module.exports = function () {
    var express = require('express');
    var router = express.Router();

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

    return router;
}();
