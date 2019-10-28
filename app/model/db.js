`use strict`;

var mysql = require(`mysql2`);

//local mysql db connection
let connection = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: `wilson`,
    database: `sys`
});

connection.connect();

module.exports = connection;