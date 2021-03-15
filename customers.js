module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, complete) {
        mysql.pool.query("SELECT customerID, firstName, lastName, phone, address1, address2, city, state, zip, currentBill FROM customers", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

    // Function to get a single customer
    function getCustomer(res, mysql, context, customerID, complete) {
        var sql = "SELECT customerID, firstName, lastName, phone, address1, address2, city, state, zip, currentBill FROM customers WHERE customerID = ?";
        var inserts = [customerID];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer = results[0];
            console.log("--getting single customer")
            complete();
        });
    }


    // Funciton to get all customers with a bill larger than a specified number
    function getCustomersByBill(req, res, mysql, context, complete) {
      var query = "SELECT customerID, firstName, lastName, phone, address1, address2, city, state, zip, currentBill FROM customers WHERE currentBill > ?"
      var inserts = [req.params.search_amount]
      console.log("bill from getCustomersByBill: " + req.params.search_amount)

      mysql.pool.query(query, inserts, function(error, results, fields) {
        if(error){
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
        context.jsscripts = ["delete.js"]
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('customers', context);
            }
        }
    });

    // Displays all customers with a bill greater than specified amount
    router.get('/search/:search_amount', function(req, res) {
      console.log("in the search_amount get")
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["delete.js", "search.js", "update.js"];
      var mysql = req.app.get('mysql');
      getCustomersByBill(req, res, mysql, context, complete);
      function complete() {
        callbackCount++;
        if(callbackCount >= 1){
          res.render('customers',context);
        }
      }
    });


    // Add customers
    router.post('/', function (req, res) {
        console.log("Adding a customer")
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO customers (firstName, lastName, phone, address1, address2, city, state, zip, currentBill) VALUES (?,?,?,?,?,?,?,?,?)";
        var inserts = [req.body.firstName, req.body.lastName, req.body.phone, req.body.address1
            , req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.currentBill];
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


    // Display a single person to update
    router.get('/:customerID', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update.js"];
        var mysql = req.app.get('mysql');
        console.log("The customerID is: " + req.params.customerID)
        getCustomer(res, mysql, context, req.params.customerID, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                console.log("Sending context to update-customer")
                res.render('update-customer', context);
            }
        }
    });

    //firstName, lastName, phone, address1, address2, city, state, zip, currentBill


    // Actually update customers
    router.put('/:customerID', function (req, res) {
        var mysql = req.app.get('mysql');
        console.log("# " + req.body)
        console.log("## " + req.params.customerID)
        var sql = "UPDATE customers SET firstName = ?, lastName = ?, phone = ?, address1 = ?, address2 = ?, city = ?, state = ?, zip = ?, currentBill = ? WHERE customerID = ?";
        var inserts = [req.body.firstName, req.body.lastName, req.body.phone, req.body.address1
            , req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.currentBill, req.params.customerID];
        console.log("###### queried: " + sql)

        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            } else {
                console.log("sql used " + sql.sql)
                res.status(200);
                res.end();
            }
        });
    });

    router.delete('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        // removing from assignments first
        var sql = "DELETE FROM assignments WHERE customerID = ?";
        var inserts = [req.params.id];
        console.log("IN DELETE: ")
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
            console.log(error)
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
          }else{
          }
        })

        var sql = "DELETE FROM customers WHERE customerID = ?";
        var inserts = [req.params.id];
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
