/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.use('/employees', require('./employees.js'))
app.use('/customers', require('./customers.js'))
app.use('/payments', require('./payments.js'))
// app.use('/services', require('./services.js'))
// app.use('/gear', require('./gear.js'))
app.use('/certs', require('./certs.js'))
// app.use('/assignments', require('./assignments.js'))

app.use('/', express.static('public'));
//-----------------------------------------------------------
//ROUT COLLECTION
//HOME
app.get("/", function (req, res) {
    res.render('home');
});

// HOME
app.get("/home", function (req, res) {
    res.render('home');
});

// EMPLOYEES
app.get("/employees", function (req, res) {
    res.render('employees');
});

// CUSTOMERS
app.get("/customers", function (req, res) {
    res.render('customers');
});

// PAYMENTS
app.get("/payments", function (req, res) {
    res.render('payments');
});

// SERVICES
app.get("/services", function (req, res) {
    res.render('services');
});

// GEAR
app.get("/gear", function (req, res) {
    res.render('gear');
});

// CERTS
app.get("/certs", function (req, res) {
    res.render('certs');
});

// ASSIGNMENTS
app.get("/assignments", function (req, res) {
    res.render('assignments');
});


//-----------------------------------------------------------
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
