module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, complete) {
        mysql.pool.query("SELECT customerID, firstName, lastName, phone, addressLine1, addressLine2, city, state, zip, currentBill FROM customers", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

    // -------------------------------------------------

    // Displays all customers in table
    router.get('/', function (req, res) {
        console.log("in the get")
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = [""]
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('customers', context);
            }
        }
    });


    router.post('/', function (req, res) {
        console.log("Adding a customer")
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO customers (firstName, lastName, phone, addressLine1, addressLine2, city, state, zip, currentBill) VALUES (?,?,?,?,?,?,?,?,?)";
        var inserts = [req.body.firstName, req.body.lastName, req.body.phone, req.body.addressLine1
            , req.body.addressLine2, req.body.city, req.body.state, req.body.zip, req.body.currentBill];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/customers');
            }
        });
    });






    return router;
}();
