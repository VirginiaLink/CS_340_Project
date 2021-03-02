var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_linkv',
  password        : 'Viola_1479.JKL',
  database        : 'cs340_linkv'
});
module.exports.pool = pool;
