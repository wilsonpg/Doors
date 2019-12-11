`use strict`;

var mysql = require(`mysql2`);

//local mysql db connection pool
const pool = mysql.createPool({
    host: `us-cdbr-iron-east-05.cleardb.net`,
    port: 3306,
    user: `b4d1a887c32dc7`,
    password: `f258bcbe`,
    database: `heroku_34a823f031d8525`,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });            
const promisePool = pool.promise();

module.exports = promisePool;