`use strict`;

var mysql = require(`mysql2`);

//local mysql db connection
let connection = mysql.createConnection({
    host: `us-cdbr-iron-east-05.cleardb.net`,
    port: 3306,
    user: `b4d1a887c32dc7`,
    password: `f258bcbe`,
    database: `heroku_34a823f031d8525`
});

connection.connect();

module.exports = connection;