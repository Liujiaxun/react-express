var mysql = require('mysql');
var config = require('./dbConfig');
var pool = mysql.createPool(config);

module.exports.pool = pool
